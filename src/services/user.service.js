import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getClientBoard() {
    return axios.get(API_URL + 'client', { headers: authHeader() });
  }

  getDriverBoard() {
    return axios.get(API_URL + 'driver', { headers: authHeader() });
  }

  getDriverRequestBoard() {
        return axios.get(API_URL + 'driverRequest', { headers: authHeader() });
  }




}

export default new UserService();
