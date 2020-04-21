import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import AddRoute from './views/Driver/Route/AddRoute.vue';
import EditRoute from './views/Driver/Route/EditRoute.vue';
import DeleteRoute from './views/Driver/Route/DeleteRoute.vue';
import BoardRefuse from './views/Driver/BoardRefuse.vue';
import BoardPresentDriver from './views/Driver/BoardDrive/BoardPresentDriver.vue';
import BoardPastDriver from './views/Driver/BoardDrive/BoardPastDriver.vue';
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
      path: '/deleteRoute/:id',
      component: DeleteRoute
    },
    {
       path: '/refuseShip/:id',
       component: BoardRefuse
    },
    {
      path: '/presentDriver',
      component: BoardPresentDriver
    },
    {
      path: '/pastDriver',
      component: BoardPastDriver
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
      component: () => import('./views/Driver/BoardDrive/BoardDriver.vue')
    },
    {
      path: '/driverRequest',
          name: 'driverRequest',
        // lazy-loaded
        component: () => import('./views/Driver/BoardDrive/BoardDriverRequest.vue')
    },
    {
      path: '/client',
      name: 'client',
      // lazy-loaded
      component: () => import('./views/Client/BoardClient.vue')
    }
  ]
});


