<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Удалить запрос</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="delThisRequest">
      <div v-if="!successful">
        <div class="form-group">

            <div class="card">
              <div class="row">
                <div class="col-sm-12">
                  <div class="top-buffer font-weight-bold text-center"><h4 class="text-center">Маршрут</h4></div>
                  <div class="row top-buffer">
                    <div class="col-sm-3 light-color">Точка отправления: </div>
                    <div class="col-sm-3">{{oldRequest.start}}</div>
                    <div class="col-sm-3 light-color">Точка прибытия: </div>
                    <div class="col-sm-3">{{oldRequest.finish}}</div>
                  </div>
                  <div class="row top-buffer">
                    <div class="col-sm-3 light-color">Комментарий: </div>
                    <div class="col-sm-5">{{oldRequest.comment}}</div>
                    <div class="col-sm-2 light-color">Цена: </div>
                    <div class="col-sm-2">{{oldRequest.price}}</div>

                  </div>
                </div>
              </div>

              <div class="top-buffer font-weight-bold"><h4 class="text-center">Параметры груза</h4></div>
              <div class="row top-buffer">
                <div class="col-sm-4 light-color">Максимальный вес: </div>
                <div class="col-sm-2">{{oldRequest.weight}}кг</div>
                <div class="col-sm-4 light-color">Макс. длина: </div>
                <div class="col-sm-2">{{oldRequest.length}}см</div>
              </div>
              <div class="row top-buffer">
                <div class="col-sm-4 light-color">Максимальная ширина: </div>
                <div class="col-sm-2">{{oldRequest.width}}см</div>
                <div class="col-sm-4 light-color">Максимальная высота: </div>
                <div class="col-sm-2">{{oldRequest.height}}см</div>
              </div>
              <br>
              <button class="btn btn-primary btn-block btn-dark">Удалить</button>
              <router-link :to="'/clientRequest'" class="btn btn-secondary btn-block">Вернуться к запросам</router-link>
            </div>

        </div>
      </div>
    </form>

    </body>
  </div>
</template>

<script>
  import Request from '../../../models/request.js';
  import RequestService from '../../../services/rqst.service';

  export default {
    name: 'Request',
    data() {
      return {
        oldRequest: new Request('','', '', '', '', '','', '', '', '', '',''),
        submitted: false,
        successful: false,
        message: ''
      };
    },
    mounted() {
      RequestService.getRequest(this.$route.params.id).then(
              response => {
                this.oldRequest = response.data;
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
      delThisRequest() {
        this.message = '';
        this.submitted = true;
            RequestService.deleteRequest(this.$route.params.id).then(
                    response => {
                      this.$router.push('/clientRequest');
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
  .top-buffer { margin-top:15px; }

  .card {
    max-width: 70%;
    max-height: 50% !important;
    background-color: #f9f9f9;
    padding: 20px 25px 20px;
    margin: 0 auto 25px;
    margin-top: 50px;
  }

  .light-color {color: lightslategray}

</style>
