import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import AddRoute from './views/AddRoute.vue';
import EditRoute from './views/EditRoute.vue';

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
      path: '/addRoute',
      component: AddRoute
    },
    {
      path: '/editRoute/:id',
      component: EditRoute
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
      path: '/driverRequest',
          name: 'driverRequest',
        // lazy-loaded
        component: () => import('./views/BoardDriverRequest.vue')
    },
    {
      path: '/client',
      name: 'client',
      // lazy-loaded
      component: () => import('./views/BoardClient.vue')
    }
  ]
});


