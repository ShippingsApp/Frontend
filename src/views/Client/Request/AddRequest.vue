<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Отправить запрос //сюда нужно красиво подтягивать данные из того что клиент искал, желательно как-то через router</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="addNewRequest">
      <div v-if="!successful">
        <table>
          <tr class="table-active">
            <td><div class="form-group">
              <label for="price">Цена (руб)</label>
              <input
                      v-model="request.price"
                      v-validate="'max:10'"
                      type="text"
                      class="form-control"
                      name="price"
                      placeholder="3 000"
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
                        placeholder="Сыпучий груз"
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
              <router-link to="/client" class="btn-down btn btn-primary btn-block">Назад</router-link>
            </div>
            <td colspan="2"><div class="form-group">
              <button class="btn-down btn btn-primary btn-block">Отправить</button>
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
  import Request from '../../../models/request';
  import RequestService from '../../../services/rqst.service';

  export default {
    name: 'Request',
    data() {
      return {
        request: new Request('', '4', '', '', 'city1', 'city2','1', '1', '1', '1', '',''),
        submitted: false,
        successful: false,
        message: ''
      };
    },
    methods: {
      addNewRequest() {
        //this.message = '';
        //this.submitted = true;
       // this.$validator.validate().then(isValid => {
          //if (isValid) {
              RequestService.addRequest(this.request).then(
                  response => {
                    this.$router.push('/client');
                    return Promise.resolve(response.data);
                          },
                  error => {
                            return Promise.reject(error);
                         }
            );
    //      }
    //    });
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
