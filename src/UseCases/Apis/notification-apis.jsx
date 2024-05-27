
import { Buffer } from 'buffer';
import axios from 'axios';
import { setPastQuizHistory } from './quiz-history';

export const sendNotifications = async ({token,data}) => {


  const date = new Date();
  const dataId = Buffer.from(`${date}`, 'utf-8').toString('base64');


  data = {...data,  dataId}
  
  const api = `http://127.0.0.3:3003/notifications/${token}`
  
  let {data: { data : oldData } } = await axios.get(api)
  
  
  if(!oldData) return;
  
  const notificationsData = {message:'You Have A Quiz To do ',read:false,type:'quiz',dataId:data.dataId}
  let newData = [...oldData,notificationsData]
  
  const response =await  axios.put(api,{data:newData});

  const response2 = await setPastQuizHistory({data,userId:token});


 console.log('hello wrold')
};

export const RemoveNotification = async (token,dataId)=>{
  const api = `http://127.0.0.3:3003/notifications/${token}`
  const {data} =await axios.get(api);
  const newData =  data.data.filter(item=>item.dataId != dataId)
  const resposne = await axios.put(api,{data:newData})
}


export const UpdateNotification = async (token,data)=>{
  const api = `http://127.0.0.3:3003/notifications/${token}`

  const resposne = await axios.put(api,{data:data})
}


export const sendNotificationsAll  = async ({contactList,data,token})=>{
   const request =   contactList.map((item) => item.id != token && sendNotifications({ token: item.id, data }))
   await Promise.all(request);
   return;
}




export const getNotifications = async (token) => {
  console.log(token)
  const api = `http://127.0.0.3:3003/notifications/${token}`;
  const { data } = await axios.get(api);

  return  data;
};