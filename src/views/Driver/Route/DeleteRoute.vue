<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Удалить маршрут</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="delThisRoute">
      <div v-if="!successful">
        <div class="form-group">
          <div class="form-group">
            <p>Вы действительно хотите удалить маршрут
              {{oldRoute.start}} - {{oldRoute.finish}} ? </p>
            <button class="btn btn-primary btn-block btn-dark">Удалить</button>
          </div>
        </div>
      </div>
    </form>
    <router-link :to="'/driver'" class="btn btn-primary btn-block">Вернуться к маршрутам</router-link>
    </body>
  </div>
</template>

<script>
  import Route from '../../../models/route';
  import ShipService from '../../../services/ship.service';

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
      delThisRoute() {
        this.message = '';
        this.submitted = true;
            ShipService.deleteRoute(this.$route.params.id).then(
                    response => {
                      this.$router.push('/driver');
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
  .btn-down{
    margin-top: 30px;
  }
  .tr-blue{
    background-color: rgba(38, 143, 255, 0.95);
    color: white;
  }
  td{
    padding: 5px 5px 5px 5px;
  }
  .haract{
    font-size: 1.4rem;
  }
</style>
