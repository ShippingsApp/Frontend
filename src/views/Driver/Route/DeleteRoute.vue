<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Удалить маршрут</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="delThisRoute">
      <div v-if="!successful">
        <div class="form-group">

            <div class="card">
              <div class="row">
                <div class="col-sm-12">
                  <div class="top-buffer font-weight-bold text-center"><h4 class="text-center">Маршрут</h4></div>
                  <div class="row top-buffer">
                    <div class="col-sm-3 light-color">Точка отправления: </div>
                    <div class="col-sm-3">{{oldRoute.start}}</div>
                    <div class="col-sm-3 light-color">Точка прибытия: </div>
                    <div class="col-sm-3">{{oldRoute.finish}}</div>
                  </div>
                  <div class="row top-buffer">
                    <div class="col-sm-3 light-color">Дата отправления:: </div>
                    <div class="col-sm-3">{{oldRoute.dateStart}}</div>
                    <div class="col-sm-3 light-color">Дата прибытия: </div>
                    <div class="col-sm-3">{{oldRoute.dateFinish}}</div>

                  </div>
                </div>
              </div>

              <div class="top-buffer font-weight-bold"><h4 class="text-center">Параметры груза</h4></div>
              <div class="row top-buffer">
                <div class="col-sm-4 light-color">Вес: </div>
                <div class="col-sm-2">{{oldRoute.weight}}кг</div>
                <div class="col-sm-4 light-color">Длина: </div>
                <div class="col-sm-2">{{oldRoute.length}}см</div>
              </div>
              <div class="row top-buffer">
                <div class="col-sm-4 light-color">Ширина: </div>
                <div class="col-sm-2">{{oldRoute.width}}см</div>
                <div class="col-sm-4 light-color">Высота: </div>
                <div class="col-sm-2">{{oldRoute.height}}см</div>
              </div>
              <br>
              <button class="btn btn-primary btn-block btn-dark">Удалить</button>
              <router-link :to="'/driver'" class="btn btn-secondary btn-block">Вернуться к маршрутам</router-link>
            </div>

        </div>
      </div>
    </form>

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

  td{
    padding: 5px 5px 5px 5px;
  }

</style>
