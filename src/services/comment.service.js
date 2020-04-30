import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api/comm/';

class CommService {
  addComment(comment){
    return axios.post(API_URL + 'commentup', {
      id: comment.id,
      rate: comment.rate,
      comment: comment.comment
    },{ headers: authHeader() });
  }
}

export default new CommService();
