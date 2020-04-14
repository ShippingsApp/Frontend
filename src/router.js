import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/driver',
      name: 'driver',
      component: () => import('./views/BoardDriver.vue')
    },
    {
      path: '/client',
      name: 'client',
      component: () => import('./views/BoardClient.vue')
    },
    {
      path: '/edit profile',
      name: 'editProfile',
      component: () => import('./views/EditProfile.vue')
    }
  ]
});


