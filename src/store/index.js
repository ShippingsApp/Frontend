import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
//import { editProfile } from './editProfile.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    //editProfile,
    auth

  }
});
