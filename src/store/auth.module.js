import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

//import User from '../models/user';

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },

    updateUser({ commit }, [newRealName, newMobilePhone]) {
      return UserService.updateUserInfo(this.state.auth.user.username, newRealName, newMobilePhone).then(
          response => {
            commit('editInfoSuccess', [newRealName, newMobilePhone]);
            return Promise.resolve(response);
          },
          error => {
            return Promise.reject(error);
          }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    editInfoSuccess(state, [newRealName, newMobilePhone]) {
      newRealName = newRealName ? newRealName : state.user.realName;
      newMobilePhone = newMobilePhone ? newMobilePhone : state.user.mobilePhone;
      localStorage.setItem('user',  JSON.stringify({
        token: state.user.token,
        type: state.user.type,
        id : state.user.id,
        username: state.user.username,
        roles: state.user.roles,
        realName: newRealName,
        mobilePhone: newMobilePhone,
        rate: state.user.rate,
        status: state.user.status
      }));
      state.user.realName = newRealName;
      state.user.mobilePhone = newMobilePhone;
    }



  }
};
