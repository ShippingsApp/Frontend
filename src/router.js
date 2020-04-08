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
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/driver',
      name: 'driver',
      // lazy-loaded
      component: () => import('./views/BoardDriver.vue')
    },
    {
      path: '/client',
      name: 'client',
      // lazy-loaded
      component: () => import('./views/BoardClient.vue')
    },
    {
      path: '/edit profile',
      name: 'editProfile',
      // lazy-loaded
      component: () => import('./views/EditProfile.vue')
    }
  ]
});


