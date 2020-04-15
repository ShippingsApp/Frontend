<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Изменить маршрут //Где-то здесь должен быть кусок который подгружает исходную информацию о поездке</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="editThisRoute">
      <div v-if="!successful">
        <table>
          <tr>
            <td><div class="form-group">
              <label for="dateStart">Дата отправления</label>
              <input
                      v-model="route.dateStart"
                      v-validate="'max:10'"
                      type="text"
                      class="form-control"
                      name="dateStart"
                      placeholder="ГГГГ-ММ-ДД"
              />
              <div
                      v-if="submitted && errors.has('dateStart')"
                      class="alert-danger"
              >{{errors.first('dateStart')}}</div>
            </div></td>
            <td colspan="4"><div class="form-group">
              <label for="start">Город отправления</label>
              <input
                      v-model="route.start"
                      v-validate="'max:30'"
                      type="text"
                      class="form-control"
                      name="start"
                      placeholder="Санкт-Петербург"
              />
              <div
                      v-if="submitted && errors.has('start')"
                      class="alert-danger"
              >{{errors.first('start')}}</div>
            </div></td>
          </tr>
          <tr>
            <td> <div class="form-group">
              <label for="dateFinish">Дата прибытия</label>
              <input
                      v-model="route.dateFinish"
                      v-validate="'max:10'"
                      type="text"
                      class="form-control"
                      name="dateFinish"
                      placeholder="ГГГГ-ММ-ДД"
              />
              <div
                      v-if="submitted && errors.has('dateFinish')"
                      class="alert-danger"
              >{{errors.first('dateFinish')}}</div>
            </div></td>
            <td colspan="4"><div class="form-group">
              <label for="finish">Город прибытия</label>
              <input
                      v-model="route.finish"
                      v-validate="'max:30'"
                      type="text"
                      class="form-control"
                      name="finish"
                      placeholder="Волгоград"
              />
              <div
                      v-if="submitted && errors.has('finish')"
                      class="alert-danger"
              >{{errors.first('finish')}}</div>
            </div></td>
          </tr>
          <tr>
            <td><div class="form-group">
              <label for="weight">Высота (м)</label>
              <input
                      v-model="route.weight"
                      v-validate="'max:5'"
                      type="text"
                      class="form-control"
                      name="weight"
                      placeholder="0"
              />
              <div
                      v-if="submitted && errors.has('weight')"
                      class="alert-danger"
              >{{errors.first('weight')}}</div>
            </div></td>
            <td><div class="form-group">
              <label for="height">Ширина (м)</label>
              <input
                      v-model="route.height"
                      v-validate="'max:5'"
                      type="text"
                      class="form-control"
                      name="height"
                      placeholder="0"
              />
              <div
                      v-if="submitted && errors.has('height')"
                      class="alert-danger"
              >{{errors.first('height')}}</div>
            </div></td>
            <td><div class="form-group">
              <label for="length">Длина (м)</label>
              <input
                      v-model="route.length"
                      v-validate="'max:5'"
                      type="text"
                      class="form-control"
                      name="length"
                      placeholder="0"
              />
              <div
                      v-if="submitted && errors.has('length')"
                      class="alert-danger"
              >{{errors.first('length')}}</div>
            </div></td>
            <td><div class="form-group">
              <label for="width">Вес (кг)</label>
              <input
                      v-model="route.width"
                      v-validate="'max:5'"
                      type="text"
                      class="form-control"
                      name="width"
                      placeholder="0"
              />
              <div
                      v-if="submitted && errors.has('width')"
                      class="alert-danger"
              >{{errors.first('width')}}</div>
            </div></td>
            <td><div class="form-group">
              <label for="plusTime">Дополнительное время (дни)</label>
              <input
                      v-model="route.plusTime"
                      v-validate="'max:5'"
                      type="text"
                      class="form-control"
                      name="plusTime"
                      placeholder="0"
              />
              <div
                      v-if="submitted && errors.has('plusTime')"
                      class="alert-danger"
              >{{errors.first('plusTime')}}</div>
            </div></td>
          </tr>
          <tr>
            <td colspan="4"><div class="form-group">
              <label for="comment">Комментарий</label>
              <input
                      v-model="route.comment"
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
            </div></td>
            <td><div class="form-group">
              <button class="btn btn-primary btn-block">Сохранить изменения</button>
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
  import Route from '../models/route';

  export default {
    name: 'Route',
    data() {
      return {
        route: new Route(this.$route.params.id,'', '', '', '', '','', '', '', '', '',''),
        submitted: false,
        successful: false,
        message: ''
      };
    },

    methods: {
      editThisRoute() {
        this.message = '';
        this.submitted = true;
        this.$validator.validate().then(isValid => {
          if (isValid) {
            this.$store.dispatch('auth/editRoute', this.route).then(
                    data => {
                      this.message = data.message;
                      this.successful = true;
                    },
                    error => {
                      this.message =
                              (error.response && error.response.data) ||
                              error.message ||
                              error.toString();
                      this.successful = false;
                    }
            );
          }
        });
      }
    }
  };
</script>
<style>
  table{
    width: 100%;
  }
  td{
    vertical-align: bottom;
  }
</style>
