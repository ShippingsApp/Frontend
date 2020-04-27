import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api/ship/';

class ShipService {
  getDriverBoard(time_per) {
    return axios.get(API_URL + 'driver?time_per='+time_per, { headers: authHeader() });
  }

  getDriverRequestBoard() {
        return axios.get(API_URL + 'driverRequest', { headers: authHeader() });
  }

  getRoute(id) {
    return axios.get(API_URL + 'getRoute?ID='+id, { headers: authHeader() });
  }


  addRoute(route) {
    return axios.post(API_URL + 'routeup', {
      dateStart: route.dateStart,
      dateFinish: route.dateFinish,
      start: route.start,
      finish: route.finish,
      weight:route.weight,
      height:route.height,
      length:route.length,
      width:route.width,
      plusTime:route.plusTime,
      comment: route.comment
    },{ headers: authHeader() });
  }

  editRoute(route) {
    return axios.post(API_URL + 'routedit', {
      id: route.id,
      dateStart: route.dateStart,
      dateFinish: route.dateFinish,
      start: route.start,
      finish: route.finish,
      weight:route.weight,
      height:route.height,
      length:route.length,
      width:route.width,
      plusTime:route.plusTime,
      comment: route.comment
    },{ headers: authHeader() });
  }

  refuseShip(id){
    return axios.post(API_URL + 'refuseShip', {
      id:id
    },{ headers: authHeader() });
  }

  deleteRoute(id){
        return axios.post(API_URL + 'deleteShip', {
            id:id
        },{ headers: authHeader() });
    }


}

export default new ShipService();
