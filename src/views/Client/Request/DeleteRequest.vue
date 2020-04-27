<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Удалить запрос</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="delThisRequest">
      <div v-if="!successful">
        <div class="form-group">
          <div class="form-group">
            <p>Вы действительно хотите удалить запрос
              {{oldRequest.start}} - {{oldRequest.finish}} ? </p>
            <button class="btn btn-primary btn-block btn-dark">Удалить</button>
          </div>
        </div>
      </div>
    </form>
    <router-link :to="'/clientRequest'" class="btn btn-primary btn-block">Вернуться к запросам</router-link>
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
