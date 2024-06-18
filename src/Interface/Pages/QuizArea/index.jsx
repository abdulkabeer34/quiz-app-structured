import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "./style.scss";
import { AntdButton, QuizAreaProgressBar } from "./styled-components";
import { Boolean, MultipleChoice } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {Skeleton} from "antd";
import {
  CreateQuizConfigProvider,
  setData,
  setTimer,
  setWarningNumber,
} from "../../../UseCases";
import { useNavigate } from "react-router-dom";
import {
  toggleModal,
  AntdModal,
  useStartAssignmentData,
  useHandleQuizSubmit,
  useSetSelectedAnswer,
  QuizAreaContext,
  useInitializeQuiz,
  useWarningModal,
  useQuizHistory,
} from "../../../UseCases";

export const QuizArea = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(1);

  const Timer = useSelector((e) => e.quizStore.timer);
  const quizOptionLoading = useSelector((e) => e.quizStore.quizOptionLoading);
  const quizAreaButtonLoading = useSelector(
    (e) => e.quizStore.quizAreaButtonLoading
  );
  const token = localStorage.getItem("token");

  const data = useSelector((e) => e.quizStore.data);
  let { queryData } = useQuizHistory();
  let { data: info, isLoading } = queryData;

  const Assignment = useStartAssignmentData();
  const HandleSubmit = useHandleQuizSubmit();
  const SetSelectedAnswer = useSetSelectedAnswer();
  const { stopInterval } = useContext(QuizAreaContext);
  const quizAreaModal = useSelector((e) => e.quizAreaStore.ModalInfo);
  const dispatch = useDispatch();
  const { id: dataId, question } = useParams();
  const navigate = useNavigate();

  const props = { dataId, token, setCurrentQuestionIndex, question };
  const initializeQuiz = useInitializeQuiz({ ...props });
  const warningModalLogic = useWarningModal({ ...props });

  useEffect(() => {
    if (isLoading) return;
    const currentQuiz = info.find((item) => item.dataId === dataId);
    dispatch(setData(currentQuiz));

    const setUp = async () => {
      await initializeQuiz.initializeQuiz(currentQuiz);
    };

    const checkWebsiteReloaded = async () => {
      await warningModalLogic.checkWebsiteReloaded(currentQuiz);
    };

    setUp();
    checkWebsiteReloaded();
    setCurrentQuestionIndex(parseInt(question));

    return () => {
      stopInterval();
      dispatch(setData({}));
      dispatch(setWarningNumber(0));
      dispatch(setTimer(["_", "__"]));
    };
  }, [info, dataId]);

  const changeQuestion = (value) => {
    if (!data || !data.quiz) return;

    if (
      quizOptionLoading >= 0 ||
      (currentQuestionIndex === data.quiz.length - 1 && value === 1) ||
      (currentQuestionIndex === 0 && value === -1)
    )
      return;
    setCurrentQuestionIndex(currentQuestionIndex + value);
    navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
      replace: true,
    });
  };

  const triggerEvent = (event) => {
    const changeQuestion = (value) => {
      if (
        quizOptionLoading >= 0 ||
        (currentQuestionIndex === data.quiz.length - 1 && value === 1) ||
        (currentQuestionIndex === 0 && value === -1)
      )
        return;
      setCurrentQuestionIndex(currentQuestionIndex + value);
      navigate(`/quiz-area/${dataId}/${currentQuestionIndex + value}`, {
        replace: true,
      });
    };

    if (event.key === "ArrowLeft") {
      changeQuestion(-1);
    } else if (event.key === "ArrowRight") {
      changeQuestion(1);
    }
  };

  const setSelectedAnswer = async (index) => {;

    await SetSelectedAnswer.setSelectedAnswer({
      index,
      currentQuestionIndex,
      token,
      dataId,
    });

  };

  useEffect(() => {
    document.addEventListener("keydown", triggerEvent);

    return () => document.removeEventListener("keydown", triggerEvent);
  }, [currentQuestionIndex, data]);

  useEffect(() => {
    document.title = "Quiz Area";
  }, []);



  if (!data || !data.quiz || !data.quiz[currentQuestionIndex])   return (
    <div className="quiz-area-main" style={{ backgroundColor: 'white',marginTop:"100px" }}>
      <Skeleton active />
      <Skeleton active  style={{marginTop:"30px"}} />
    </div>
  );

  return (
    <div className="quiz-area-main"  style={{backgroundColor:"white"}}>
      <CreateQuizConfigProvider theme={{ token: { colorPrimary: "black" } }}>
        <QuizAreaProgressBar
          $current={currentQuestionIndex}
          $total={data.quiz.length}
          className="quiz-progress-bar"
        ></QuizAreaProgressBar>

        {data.basicInfo.submited === "not started" && (
          <div className="area"></div>
        )}
        <div className="upper-area flex align-center justify-between ">
          <div className="Timer flex align-center ">
            <div className="left flex align-center justify-center flex-column">
              <FaRegClock />
            </div>
            <div className="right">
              <p>
                {data.basicInfo.submited === "submitted"
                  ? "Quiz Completed In"
                  : "Time Remaining"}
              </p>
              <h2>
                {Timer.map((item, index) => (
                  <span key={index}>
                    {index != 2 && item}
                    {index === 0 ? ":" : null}
                  </span>
                ))}
              </h2>
            </div>
          </div>
          <div className="button flex align-center ">
            {data.basicInfo.submited == "not submitted" ? (
              <AntdButton
                loading={quizAreaButtonLoading}
                onClick={() => HandleSubmit.handleSubmit(props)}
                className="btn"
              >
                Submit
              </AntdButton>
            ) : data.basicInfo.submited == "not started" ? (
              <AntdButton
                loading={quizAreaButtonLoading}
                onClick={() => Assignment.startAssignment(props)}
                className="btn"
              >
                Start the Assignment
              </AntdButton>
            ) : (
              <Link to={`/quiz-result/${dataId}`}>
                <AntdButton className="btn">See Results</AntdButton>
              </Link>
            )}
          </div>
        </div>
        <div className="mid-area">
          <p>
            Question {currentQuestionIndex + 1} out of {data.quiz.length}
          </p>
          {data.quiz[currentQuestionIndex].type !== "boolean" ? (
            <MultipleChoice
              data={data.quiz[currentQuestionIndex]}
              setSelectedAnswer={(index) => setSelectedAnswer(index)}
              setLoading={setLoading}
              loading={loading}
            />
          ) : (
            <Boolean
              data={data.quiz[currentQuestionIndex]}
              setSelectedAnswer={(index) => setSelectedAnswer(index)}
            />
          )}
        </div>
        <div className="bottom-area flex align-center justify-between">
          <div className="nav-btn">
            <AntdButton
              display={currentQuestionIndex == 0 ? "none" : "initial"}
              width="auto"
              onClick={() => changeQuestion(-1)}
              className="antd-btn text-black"
            >
              Previous Question
            </AntdButton>
          </div>
          <div className="nav-btn">
            <AntdButton
              width="auto"
              display={
                currentQuestionIndex + 1 == data.quiz.length
                  ? "none"
                  : "initial"
              }
              onClick={() => changeQuestion(1)}
              className="antd-btn text-black"
            >
              Next Question
            </AntdButton>
          </div>
        </div>
        <AntdModal
          closeModal={() => dispatch(toggleModal({ open: false }))}
          onOk={() => dispatch(toggleModal({ open: false }))}
          {...quizAreaModal}
          centered
        />
      </CreateQuizConfigProvider>
    </div>
  );
};
