import { openNotification } from '../Utils';
import { NOTIFICATIONS } from '../Constants';
import { getLogins } from '../Apis';


export const LoginAuth = async (info, api) => {
    let LoggedIn = false;
    try {
      const data = await getLogins();

      data.map(({ username, password, id }) => {
        if (username === info.username && password === info.password) {
          LoggedIn = true;
          localStorage.setItem('token', id);
        }
      });

      if (LoggedIn) {
        openNotification({ ...NOTIFICATIONS.LOGIN_SUCCESSFUL, api });

        window.location.reload();
      } else {
        openNotification({ ...NOTIFICATIONS.WRONG_CREDENTIALS, api });
      }
    } catch (error) {
      console.log(error)
      openNotification({ ...NOTIFICATIONS.ERROR, api });
    }

  };
