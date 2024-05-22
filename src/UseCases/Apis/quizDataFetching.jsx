import axios from "axios";
import { setPastQuizHistory } from "./QuizHistory";
import { Buffer } from "buffer";
import { createNewDataSet, flattenObjectValues } from "../Utils";

const url = "https://opentdb.com/api.php";


const apiRequest = async (params) => {
  try {
    const { data } = await axios.get(url, { params });
    if (data.results) return data;
    else throw new Error("Sorry You Cannot take the quiz right now");
  } catch (error) {
    throw new Error("You Cannot take the quiz right now");
  }
};

export const HandleSubmit = async ({formData, userId}) => {
  const keys = Object.keys(formData);
  let params = new Object();

  keys.map((key) => {
    const value = formData[key];
    if (Array.isArray(value)) {
      const [subitem] = value;
      if (subitem !== "any" && subitem) {
        params[key] = subitem;
      }
    } else if (value !== "any" && value) {
      params[key] = value;
    }
  });

  try {
    const { results } = await apiRequest( params);
    const date = new Date();
    const dataId = Buffer.from(`${date}`, "utf-8").toString("base64");
    const newDataSet = createNewDataSet(results);

    const flattenFormData = flattenObjectValues(formData);

    const data = {
      quiz: newDataSet,
      basicInfo: {
        ...flattenFormData,
        submited: "not started",
        expirationTime: 5,
        startingDate: "null",
        submittedTime: "null",
        websiteLeaved: "null",
      },
      dataId,
    };

    if (results.length == 0) return false;


    await setPastQuizHistory({ data, userId });
    return { quizData: data, dataId };
  } catch (error) {
    return  false;
  }
  
};
