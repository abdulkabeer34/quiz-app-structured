export const colorCodeGenerator = (
    index,
    selectedAnswer,
    setSelectedAnswer,
    corectAnswerIndex
  ) => {
    if (setSelectedAnswer) {
      if (index === selectedAnswer) {
        return { color: '#15803d', backgroundColor: '#dcfce7' };
      }
  
      return { color: 'black', backgroundColor: 'white' };
    } else {
      if (selectedAnswer === 'undefined' && index === corectAnswerIndex) {
        return { color: '#a16207', backgroundColor: '#fef9c3' };
      }
      if (index === corectAnswerIndex) {
        return { color: '#15803d', backgroundColor: '#dcfce7' };
      } else if (index === selectedAnswer) {
        return { color: '#b91c1c', backgroundColor: '#fee2e2' };
      }
      return { color: 'black', backgroundColor: 'white' };
    }
  };
  