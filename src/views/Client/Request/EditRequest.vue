<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Изменить запрос</h3>
    </header>
    <body>

    <form name="form" @submit.prevent="editThisRequest">
      <div v-if="!successful">
        <table>
          {{oldRequest.start}} - {{oldRequest.finish}}
          <tr class="table-active">
            <td><div class="form-group">
              <label for="price">Цена (руб)</label>
              <input
                      v-model="request.price"
                      v-validate="'max:10'"
                      type="text"
                      class="form-control"
                      name="price"
                      :placeholder="oldRequest.price"
              />
              <div
                      v-if="submitted && errors.has('comment')"
                      class="alert-danger"
              >{{errors.first('comment')}}</div>
            </div>
            </td>
            <td colspan="3">
              <div class="form-group">
                <label for="comment">Комментарий</label>
                <input
                        v-model="request.comment"
                        v-validate="'max:50'"
                        type="text"
                        class="form-control"
                        name="comment"
                        :placeholder="oldRequest.comment"
                />
                <div
                        v-if="submitted && errors.has('comment')"
                        class="alert-danger"
                >{{errors.first('comment')}}</div>
              </div>
            </td>

          </tr>
          <tr class="table-active">
            <td colspan="2"><div class="form-group">
              <router-link to="/clientRequestOld" class="btn-down btn btn-primary btn-block">Вернуться к запросам</router-link>
            </div>
            <td colspan="2"><div class="form-group">
              <button class="btn-down btn btn-primary btn-block">Сохранить</button>
            </div>
            </td>
          </tr>
        </table>
      </div>
    </form>
    <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
    >{{message}}</div>

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
        request: new Request(this.$route.params.id,'', '', '', '', '','', '', '', '', '',''),
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
      editThisRequest() {
        this.message = '';
        this.submitted = true;
        //this.$validator.validate().then(isValid => {
        //  if (isValid) {
           RequestService.editRequest(this.request).then(
                    response => {
                      this.$router.push('/clientRequestOld');
                      return Promise.resolve(response.data);
                    },
                    error => {
                      return Promise.reject(error);
                    }
            );
         // }
        //});
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
