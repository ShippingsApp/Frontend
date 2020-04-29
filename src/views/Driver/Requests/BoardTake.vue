<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Принять</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="takeShip">
      <div v-if="!successful">
        <div class="form-group">
          <div class="form-group">
            <p>Вы действительно хотите принять реквест
            {{oldRoute.start}} - {{oldRoute.finish}} ? </p>
            <button class="btn btn-primary btn-block">Принять</button>
          </div>
        </div>
      </div>
    </form>
    <router-link :to="'/driverRequest'" class="btn btn-primary btn-block btn-dark">Вернуться к реквестам</router-link>
    </body>
  </div>
</template>

<script>
  import ShipService from '../../../services/ship.service';
  import Route from '../../../models/route';

  export default {
    name: 'Route',
    data() {
      return {
        oldRoute: new Route('','', '', '', '', '','', '', '', '', '',''),
          submitted: false,
          successful: false,
          message: ''
    };
    },
    mounted() {
      ShipService.getRoute(this.$route.params.id).then(
              response => {
                this.oldRoute = response.data;
              },
              error => {
                this.routes =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
              }
      );
    },

    methods: {
      takeShip() {
        this.message = '';
        this.submitted = true;
        ShipService.takeShip(this.$route.params.id).then(
                        response => {
                          this.$router.push('/driverRequest');
                          return Promise.resolve(response.data);
                        },
                        error => {
                          return Promise.reject(error);
                        }
                );

      }
    }
  };

</script>
<style>
  table{
    width: 100%;
  }
  td{/*
    vertical-align: bottom;
  */}
</style>
