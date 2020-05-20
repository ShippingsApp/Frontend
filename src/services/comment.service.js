import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8088/api/comm/';

const API_URL = 'https://easy-shippings.herokuapp.com/api/comm/'

class CommService {
  addComment(comment){
    return axios.post(API_URL + 'commentup', {
      id: comment.id,
      rate: comment.rate,
      comment: comment.comment
    },{ headers: authHeader() });
  }

  getDriverComments(driverName){
    return axios.get(API_URL + 'getComments?driverName='+driverName, { headers: authHeader() });
  }

  getDriverRate(driverName){
    return axios.get(API_URL + 'getRate?driverName='+driverName, { headers: authHeader() });
  }
}

export default new CommService();
