import { useEffect } from 'react';
import { setWarningNumber } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../Store';
import { useHandleQuizSubmit } from './useQuizSubmit';
import { useQuizHistory } from './Query';

const createModalMessage = (num, warn) => {
  const open = true;
  if (warn) {
    const message = `website leaved: ${num} times , maxlimit 3 times`;
    return { message, open };
  }
  const message = 'Max Number of quiz  Leave Reached';
  return { message, open };
};


export const useWarningModal = ({ dataId, token }) => {
  const dispatch = useDispatch();
  const handleSubmit = useHandleQuizSubmit();
  const data = useSelector(e=>e.quizStore.data)
  const warningNumber = useSelector((e) => e.quizStore.warningNumber);


 const {mutation}  = useQuizHistory(false)

  const checkWebsiteReloaded = async (data) => {
    if (!data || !data.basicInfo) return;

    let currentQuiz = data;
    const websiteLeaved = currentQuiz.basicInfo.websiteLeaved;
    if (
      currentQuiz.basicInfo &&
      currentQuiz.basicInfo.submited === 'not submitted'
    ) {
      if (websiteLeaved === 2) {
        const { message, open } = createModalMessage(null, false);
        dispatch(setWarningNumber(3));
        dispatch(toggleModal({ message, open, footerMessage: 'ok' }));
      } else if (websiteLeaved === 'null') {
        const { message, open } = createModalMessage(1, true);
        dispatch(toggleModal({ message, open, footerMessage: 'ok' }));
        dispatch(setWarningNumber(1));

        await mutation.mutateAsync({ websiteLeaved: 1, dataId, token });
      } else if (websiteLeaved === 1) {
        let newNumber = parseInt(websiteLeaved) + 1;

        const { message, open } = createModalMessage(newNumber, true);
        dispatch(setWarningNumber(newNumber));

        dispatch(toggleModal({ message, open, footerMessage: 'ok' }));
        await mutation.mutateAsync({
          websiteLeaved: newNumber,
          dataId,
          token,
        });
      } 
    }
  };

  useEffect(() => {
    if (warningNumber === 3 && data.basicInfo.submited != 'submitted') {
      handleSubmit.handleSubmit({ dataId, token });

    
    }
  }, [warningNumber]);

  return { checkWebsiteReloaded };
};
