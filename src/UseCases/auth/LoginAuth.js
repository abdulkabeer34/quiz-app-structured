import { openNotification } from "../Utils";
import { notifications } from "../Constants";
import { getLogins } from "../Apis";


export const LoginAuth = async (info, api) => {
    let LoggedIn = false;
    try {
      const data = await getLogins();

      data.map(({ username, password, id }) => {
        if (username == info.username && password == info.password) {
          LoggedIn = true;
          localStorage.setItem("token", id);
        }
      });

      if (LoggedIn) {
        openNotification({ ...notifications.loginSuccesful, api });

        window.location.reload();
      } else {
        openNotification({ ...notifications.wrongCredentials, api });
      }
    } catch (error) {
      console.log(error)
      openNotification({ ...notifications.error, api });
    }

  };
