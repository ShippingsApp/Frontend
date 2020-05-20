<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Изменить маршрут</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="editThisRoute">
      <div v-if="!successful">
        <table class="center">
          <tr class="table-active">
            <td colspan="4" class="text-center haract">Характеристики пути</td>
          </tr>
          <tr class="table-active">
            <td colspan="1">
              <div class="form-group">
                <label for="dateStart">Дата отправления</label>
                <input
                        v-model="route.dateStart"
                        v-validate="'date_format:yyyy-mm-dd'"
                        type="text"
                        class="form-control"
                        name="date_format_field"
                        :placeholder="oldRoute.dateStart"
                />
                <div
                        v-if="submitted && errors.has('dateStart')"
                        class="alert-danger">
                  Введите дату в формате ГГГГ-ММ-ДД
                </div>
              </div>
            </td>

            <td colspan="3">
              <div class="form-group">
                <div class="width: 100%; height: 100%; position-relative">
                  <label for="start">Город отправления</label>
                  <input
                          v-model="route.start"
                          ref="suggest"
                          type="text"
                          class="form-control input"
                          name="startPoint"
                          :placeholder="oldRoute.start"/>
                </div>
                <div
                        v-if="submitted && errors.has('startPoint')"
                        class="alert-danger">
                  {{errors.first('startPoint')}}
                </div>
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="1"> <div class="form-group">
              <label for="dateFinish">Дата прибытия</label>
              <input
                      v-model="route.dateFinish"
                      v-validate="'date_format:yyyy-MM-dd'"
                      type="text"
                      class="form-control"
                      name="dateFinish"
                      :placeholder="oldRoute.dateFinish"
              />
              <div
                      v-if="submitted && errors.has('dateFinish')"
                      class="alert-danger">
                Введите дату в формате ГГГГ-ММ-ДД
              </div>
            </div></td>

            <td colspan="3">
              <div class="form-group">
                <div class="width: 100%; height: 100%; position-relative">
                  <label for="finish">Город прибытия</label>
                  <input
                          v-model="route.finish"
                          ref="suggest2"
                          type="text"
                          class="form-control input"
                          name="finishPoint"
                          :placeholder="oldRoute.finish"
                  />
                </div>
              </div>
              <div
                      v-if="submitted && errors.has('finishPoint')"
                      class="alert-danger">
                {{errors.first('finishPoint')}}
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4">
              <div class="form-group">
                <label for="plusTime">Дополнительное время (дни)</label>
                <input
                        v-model="route.plusTime"
                        v-validate="'max:5'"
                        type="text"
                        class="form-control"
                        name="plusTime"
                        :placeholder="oldRoute.plusTime"
                />
                <div
                        v-if="submitted && errors.has('plusTime')"
                        class="alert-danger"
                >{{errors.first('plusTime')}}</div>
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4" class="text-center haract">Характеристики груза</td>
          </tr>

          <tr class="table-active">
            <td>
              <div class="form-group">
                <label for="weight">Высота (см)</label>
                <input
                        v-model="route.weight"
                        v-validate="'max:5'"
                        type="text"
                        class="form-control"
                        name="weight"
                        :placeholder="oldRoute.weight"
                />
                <div
                        v-if="submitted && errors.has('weight')"
                        class="alert-danger">
                  {{errors.first('weight')}}
                </div>
              </div>
            </td>

            <td>
              <div class="form-group">
                <label for="height">Ширина (см)</label>
                <input
                        v-model="route.height"
                        v-validate="'max:5'"
                        type="text"
                        class="form-control"
                        name="height"
                        :placeholder="oldRoute.height"
                />
                <div
                        v-if="submitted && errors.has('height')"
                        class="alert-danger">
                  {{errors.first('height')}}
                </div>
              </div>
            </td>

            <td>
              <div class="form-group">
                <label for="length">Длина (см)</label>
                <input
                        v-model="route.length"
                        v-validate="'max:5'"
                        type="text"
                        class="form-control"
                        name="length"
                        :placeholder="oldRoute.length"
                />
                <div
                        v-if="submitted && errors.has('length')"
                        class="alert-danger"
                >{{errors.first('length')}}
                </div>
              </div>
            </td>

            <td>
              <div class="form-group">
                <label for="width">Вес (кг)</label>
                <input
                        v-model="route.width"
                        v-validate="'max:5'"
                        type="text"
                        class="form-control"
                        name="width"
                        :placeholder="oldRoute.width"
                />
                <div
                        v-if="submitted && errors.has('width')"
                        class="alert-danger"
                >{{errors.first('width')}}</div>
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4">
              <div class="form-group">
                <label for="comment">Комментарий</label>
                <input
                        v-model="route.comment"
                        v-validate="'max:50'"
                        type="text"
                        class="form-control"
                        name="comment"
                        :placeholder="oldRoute.comment"
                />
                <div
                        v-if="submitted && errors.has('comment')"
                        class="alert-danger">
                  {{errors.first('comment')}}
                </div>
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4" class="align-content-center">
              <div class="form-group">
                <button type="submit"
                        class="btn-down btn btn-primary btn-block">Сохранить изменения
                </button>
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

  export default {
    name: 'Route',
    data() {
      return {
        route: new Route(this.$route.params.id),
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
      editThisRoute() {
        this.message = '';
        this.submitted = true;
        //this.$validator.validate().then(isValid => {
        //  if (isValid) {
            ShipService.editRoute(this.route).then(
                    response => {
                      this.$router.push('/driver');
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
  .center {
    width:60%;
    margin-left:20%;
    margin-right:20%;
  }

  .jumbotron {
    padding-top: 20px !important;
    padding-bottom: 15px !important;
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

  .ymap-container {
    height: 50% !important;
  }

  .ymap-body {
    width: 50%;
    height: 50%;
  }

</style>
