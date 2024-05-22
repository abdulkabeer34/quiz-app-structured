import axios from "axios";



export const setPastQuizHistory = async ({ data, userId }) => {
  try {
    const  pastData  = await getPastQuizHistory(userId);
    const respnose = await axios.patch(
      `http://127.0.0.3:3003/quizPastHistory/${userId}`,
      { data: [...pastData, data] }
    );
    return data;
  } catch (error) {
    return false;
  }
};

export const getPastQuizHistory = async (token) => {
  try {
    const id = token ?token : localStorage.getItem("token");
    const {
      data: { data },
    } = await axios.get(` http://127.0.0.3:3003/quizPastHistory/${id}`);
    return data ;
  } catch (error) {
    return false;
  }
};

export const updatePastQuizHistory = async ({
  token,
  dataId,
  quiz,
  submited,
  startingDate,
  expirationTime,
  submittedTime,
  websiteLeaved,
}) => {
  const  data  = await getPastQuizHistory();
  const newData = data.map((item) => {
    if (item.dataId !== dataId) return item;

    return {
      ...item,
      quiz: quiz ?? item.quiz,
      basicInfo: {
        ...item.basicInfo,
        submited: submited ?? item.basicInfo.submited,
        startingDate: startingDate ?? item.basicInfo.startingDate,
        expirationTime: expirationTime ?? item.basicInfo.expirationTime,
        submittedTime: submittedTime ?? item.basicInfo.submittedTime,
        websiteLeaved: websiteLeaved ?? item.basicInfo.websiteLeaved,
      },
    };
  });

  await axios.patch(`http://127.0.0.3:3003/quizPastHistory/${token}`, {
    data: newData,
  });
};
