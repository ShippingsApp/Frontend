import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8088/api/rqst/';

const API_URL = 'https://easy-shippings.herokuapp.com/api/rqst/';

class RequestService {
  getClientBoard() {
    return axios.get(API_URL + 'client', { headers: authHeader() });
  }

  getClientRequestBoard(status) {
    return axios.get(API_URL + 'clientRequest?status='+status, { headers: authHeader() });
  }

  addRequest(request) {
    return axios.post(API_URL + 'requestup', {
      shipId: request.shipId,
      start: request.start,
      finish: request.finish,
      weight:request.weight,
      height:request.height,
      length:request.length,
      width:request.width,
      comment: request.comment,
      price:request.price
    },{ headers: authHeader() });
  }

  getRequest(id) {
    return axios.get(API_URL + 'getRequest?ID='+id, { headers: authHeader() });
  }

  editRequest(request) {
        return axios.post(API_URL + 'rqstedit', {
            id: request.id,
            comment: request.comment,
            price:request.price
        },{ headers: authHeader() });
  }


    deleteRequest(id){
    return axios.post(API_URL + 'deleteRqst', {
      id:id
    },{ headers: authHeader() });
  }

}

export default new RequestService();
