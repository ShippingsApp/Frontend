<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Добавить маршрут</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="addNewRoute">
      <div v-if="!successful">
        <table>
          <tr class="tr-blue">
            <td class="haract">Характеристики пути</td>
            <td><div class="form-group">
          <label for="dateStart">Дата отправления</label>
          <input
                  v-model="route.dateStart"
                  v-validate="'required|max:10'"
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
            <td colspan="3"><div class="form-group">
              <label for="start">Город отправления</label>
              <input
                      v-model="route.start"
                      v-validate="'required|max:30'"
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
          <tr class="tr-blue">
            <td><div class="form-group">
              <label for="plusTime">Дополнительное время (дни)</label>
              <input
                      v-model="route.plusTime"
                      v-validate="'required|max:5'"
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
            <td> <div class="form-group">
              <label for="dateFinish">Дата прибытия</label>
              <input
                      v-model.trim="dateFinish"
                      v-model="route.dateFinish"
                      v-validate="'required|max:10'"
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
            <td colspan="3"><div class="form-group">
              <label for="finish">Город прибытия</label>
              <input
                      v-model="route.finish"
                      v-validate="'required|max:30'"
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
          <tr class="table-active">
            <td class="haract">Характеристики груза</td>
            <td><div class="form-group">
              <label for="weight">Высота (м)</label>
              <input
                      v-model="route.weight"
                      v-validate="'required|max:5'"
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
                      v-validate="'required|max:5'"
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
                      v-validate="'required|max:5'"
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
                      v-validate="'required|max:5'"
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
          </tr>
          <tr class="table-active">
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
              <button class="btn-down btn btn-primary btn-block">Добавить</button>
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
  import Route from '../../../models/route';
  import ShipService from '../../../services/ship.service';
  import { validationMixin } from 'vuelidate'

  export default {
    name: 'Route',
    data() {
      return {
        route: new Route('', '', '', '', '','', '', '', '', '',''),
        submitted: false,
        successful: false,
        message: ''
      };
    },
  validations:{
    dateStart: {
      required,
      maxLength: maxLength(10)
    },
    dateFinish: {
      required,
      maxLength: maxLength(10)
    },
  },
  methods: {
      addNewRoute() {
        //this.message = '';
        //this.submitted = true;
       // this.$validator.validate().then(isValid => {
          //if (isValid) {
              ShipService.addRoute(this.route).then(
                  response => {
                    this.$router.push('/driver');
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
