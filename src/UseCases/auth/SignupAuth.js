
import { openNotification } from "../Utils";
import { notifications } from "../Constants";
import { SetUpUserQuizPastHistory, setUpNotifications } from "../Apis/login";
import {Buffer} from "buffer"
import axios from "axios";

export const SignupAuth = async (info, api) => {
    try {
      const token = Buffer.from(info.username, "utf-8").toString("base64");
      const userData = { id: token, ...info };

      const response = await axios.post(
        "http://127.0.0.3:3003/users",
        userData
      );

      openNotification({ ...notifications.signupSuccesful, api });
      localStorage.setItem("token", token);
      await SetUpUserQuizPastHistory(token);
      await setUpNotifications(token);
      window.location.reload();
    } catch (error) {
      console.log(error)
      openNotification({ ...notifications.error, api });
    }
  };