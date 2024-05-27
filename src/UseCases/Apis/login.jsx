import axios from 'axios';

export const SetUpUserQuizPastHistory = async (token) => {
  try {
    await axios.post('http://127.0.0.3:3003/quizPastHistory/', {
      id: token,
      data: [],
    });
    return true;
  } catch (error) {
    return false;
  }
};


export const setUpNotifications  = async (token)=>{
  try {
    await axios.post('http://127.0.0.3:3003/notifications/', {
      id: token,
      data: [],
    });
    return true;
  } catch (error) {
    return false;
  }
}

export const getLogins = async () => {
  try {
    const { data } = await axios.get('http://127.0.0.3:3003/users');
    return data;
  } catch (error) {
    return false;
  }
};


