import axios from 'axios';
import authHeader from './auth-header';

const API_URL_TEST = 'http://localhost:8088/api/test/';

//const API_UPL = 'http://localhost:8088/users/';

const API_UPL = 'https://easy-shippings.herokuapp.com/users/';


class UserService {

  updateUserInfo(username, realName, mobilePhone) {

    return axios.patch(API_UPL + 'editprofile/' + username,
        {
            realName : realName,
            mobilePhone : mobilePhone
        },
        { headers: authHeader() })
        .then(response => {
            return response;
        });
  }

  getPublicContent() {
    return axios.get(API_URL_TEST + 'all');
  }

  getClientBoard() {
    return axios.get(API_URL_TEST + 'client', { headers: authHeader() });
  }

}

export default new UserService();
