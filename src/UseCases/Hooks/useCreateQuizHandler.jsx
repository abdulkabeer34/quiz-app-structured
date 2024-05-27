export const useCreateQuizHandler = ({
  questions,
  setQuestion,
  messageApi,
}) => {

  const addQuiz = () => {
    const data = { ...questions };
    
    let newQuestion = {
      type: 'multiple',
      shuffledAnswers: [],
      question: null,
      correctAnswer: null,
      correctAnswerIndex: null,
      selectedAnswer: 'undefined',
    };

    data.quiz.push(newQuestion);

    setQuestion({ ...data });

  };

  const updateQuiz = (value, index) => {
    let data = questions;
    data.quiz[index].question = value;
    setQuestion({ ...data });

  };

  const warning = (content) => {
    messageApi.open({
      type: 'warning',
      content,
    });
  };

  const deleteData = (index) => {
    let data = { ...questions };
    const filteredData = data.quiz.filter((item, indexe) => indexe != index);
    data.quiz = filteredData;
    setQuestion(data);
  };

  const addOpt = (index) => {
    let data = questions;
    if (data.quiz[index].shuffledAnswers.length >= 4) {
      warning('Cannot Add More than 4 Options');
      return;
    }
    data.quiz[index].shuffledAnswers = [
      ...data.quiz[index].shuffledAnswers,
      '',
    ];
    setQuestion({ ...data });
  };

  const updateOpt = (index, subIndex, value) => {
    let data = questions;
    data.quiz[index].shuffledAnswers[subIndex] = value;
    setQuestion({ ...data });
  };

  const deleteOpt = (index, subIndex) => {
    
    let data = questions;
    const shuffledAnswers = data.quiz[index].shuffledAnswers;
    data.quiz[index].shuffledAnswers = shuffledAnswers.filter(
      (i, index) => index != subIndex
    );
    setQuestion({ ...data });
  };

  return { addOpt, addQuiz, deleteData, deleteOpt, updateOpt, updateQuiz };
};
