import axios from 'axios';

const API_URL = 'http://localhost:8088/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      token : user.token,
      username: user.username,
      password: user.password,
      chosenRole: user.chosenRole,
      realName: user.realName,
      mobilePhone: user.mobilePhone
    });
  }
 //
 // addRoute(route) {
 //    return axios.post(API_URL + 'routeup', {
 //      dateStart: route.dateStart,
 //      dateFinish: route.dateFinish,
 //      start: route.start,
 //      finish: route.finish,
 //      weight:route.weight,
 //      height:route.height,
 //      length:route.length,
 //      width:route.width,
 //      plusTime:route.plusTime,
 //      comment: route.comment
 //    });
 //  }
 //  editRoute(route) {
 //    return axios.post(API_URL + 'routedit', {
 //      id: route.id,
 //      dateStart: route.dateStart,
 //      dateFinish: route.dateFinish,
 //      start: route.start,
 //      finish: route.finish,
 //      weight:route.weight,
 //      height:route.height,
 //      length:route.length,
 //      width:route.width,
 //      plusTime:route.plusTime,
 //      comment: route.comment
 //    });
 //  }
 //
 //  refuseShip(id){
 //      return axios.post(API_URL + 'refuseShip', {
 //            id:id
 //        });
 //  }
}

export default new AuthService();
