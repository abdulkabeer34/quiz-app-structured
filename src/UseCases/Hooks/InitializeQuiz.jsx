import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useUpdateTime } from "./CalculateTime";
import { calculateCompletionTime } from "../Utils";
import { setData, setTimer } from "../Store/Redux/QuizStore";
import { QuizAreaContext } from "../Store/ContextApi/MediaRecorderStore";

export const useInitializeQuiz = (props) => {



  const dispatch = useDispatch();

  const UpdateTime = useUpdateTime();
  const { StartInterval } = useContext(QuizAreaContext);
  const {  setCurrentQuestionIndex, question } = props;
  

  
  const initializeQuiz = async (data) => {
    
    if( !data ||  !data.basicInfo) return;
  
    let currentQuiz = data;

    
    dispatch(setData(currentQuiz));
    
    const { submittedTime, expirationTime, startingDate } =
      currentQuiz.basicInfo;

    const submited = currentQuiz.basicInfo.submited;
    
    
  
    if (submited == "submitted") {
      const difference = calculateCompletionTime(submittedTime, expirationTime);
      dispatch(setTimer(difference));
    } else if (submited == "not submitted") {

      StartInterval({
        callback: UpdateTime.updateTime,
        delay: 100,
        props: { startingDate, expirationTime, ...props },
      });

      return true

      
    }

    setCurrentQuestionIndex(parseInt(question));
  };

  return { initializeQuiz };
};