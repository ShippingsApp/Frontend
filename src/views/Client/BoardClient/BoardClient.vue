<template>
  <div class="container col-md-12">
    <header class="jumbotron">
      <h3>Поиск предложений</h3>
    </header>
    <body>
    <!--router-link to="/addRequest" class="btn btn-dark btn-sm">Получить отфильтрованные данные</router-link-->
    <div class="card">
      <form name="form" @submit.prevent="sendFilterRequest">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label font-weight-bold"><h5>Маршрут</h5></label>
          <label for="startPoint" class="col-sm-1 col-form-label text-right">от:</label>
          <input
                  v-model="filter.startPoint"
                  v-validate="'required|max:60'"
                  type="text"
                  class="form-control col-sm-4"
                  name="startPoint"
          />
          <div v-if="submitted && errors.has('startPoint')" class="alert-danger">Требуется начальная точка</div>

          <label for="finishPoint" class="col-sm-1 col-form-label text-right">до:</label>
          <input
                  v-model="filter.finishPoint"
                  v-validate="'required|max:60'"
                  type="text"
                  class="form-control col-sm-4"
                  name="finishPoint"
          />
          <div v-if="submitted && errors.has('finishPoint')" class="alert-danger" >Требуется конечная точка</div>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label"><h5>Даты</h5></label>
          <label for="startDate" class="col-sm-1 col-form-label text-right">от:</label>
          <input
                  v-model="filter.startDate"
                  v-validate="'date_format:yyyy-mm-dd'"
                  type="text"
                  class="form-control col-sm-4"
                  name="startDate"
                  placeholder="ГГГГ-ММ-ДД"
          />
          <div v-if="submitted && errors.has('startDate')" class="alert-danger">Введите дату в формате ГГГГ-ММ-ДД</div>

          <label for="finishDate" class="col-sm-1 col-form-label text-right">до:</label>

          <input
                  v-model="filter.finishDate"
                  v-validate="'date_format:yyyy-mm-dd'"
                  type="text"
                  class="form-control col-sm-4"
                  name="finishDate"
                  placeholder="ГГГГ-ММ-ДД"
          />
          <div v-if="submitted && errors.has('finishDate')" class="alert-danger">Введите дату в формате ГГГГ-ММ-ДД</div>
        </div>

        <div class="form-group row">
          <label class="col-sm-1 col-form-label font-weight-bolder"><h5>Груз</h5></label>
          <label for="weight" class="col-sm-1 col-form-label text-right">Вес</label>
          <input
                  v-model="filter.weight"
                  v-validate="'decimal'"
                  type="text"
                  class="form-control col-sm-1"
                  name="weight"
          />
          <div v-if="submitted && errors.has('weight')" class="alert-danger">Введите число</div>

          <label for="length" class="col-sm-2 col-form-label text-right">Длина</label>
          <input
                  v-model="filter.length"
                  v-validate="'decimal'"
                  type="text"
                  class="form-control col-sm-1"
                  name="length"
          />
          <div v-if="submitted && errors.has('length')" class="alert-danger">Введите число</div>

          <label for="width" class="col-sm-2 col-form-label text-right">Ширина</label>
          <input
                  v-model="filter.width"
                  v-validate="'decimal'"
                  type="text"
                  class="form-control col-sm-1"
                  name="width"
          />
          <div v-if="submitted && errors.has('weight')" class="alert-danger">Введите число</div>

          <label for="height" class="col-sm-2 col-form-label text-right">Высота</label>
          <input
                  v-model="filter.height"
                  v-validate="'decimal'"
                  type="text"
                  class="form-control col-sm-1"
                  name="height"
          />
          <div v-if="submitted && errors.has('height')" class="alert-danger">Введите число</div>
         </div>


        <div class="form-group custom-padding">
          <button class="btn btn-secondary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Найти</span>
          </button>
        </div>

        <!--div v-if="message"
             class="alert align-text-center"
             :class="successful ? 'alert-success' : 'alert-danger'"
        >{{message}}</div-->



      </form>
    </div>

    <div v-show="filteredRoutes.size > 0"><h3 class="text-center">Возможные маршруты</h3></div>

    <div class="custom-card-with-background border border-light rounded" v-for="route in filteredRoutes" :key="route.id">
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              {{route.start}}
            </div>
            <div class="col-md-6">
              {{route.finish}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              {{route.dateStart}}
            </div>
            <div class="col-md-6">
              {{route.dateFinish}}
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <router-link :to="'/displayRoute/' + route.id" class="btn btn-info btn-block">Подробнее</router-link>
        </div>
      </div>
    </div>


    <!--button v-on:click="sendFilterRequest" class="btn btn-primary btn-block btn-dark">Получить отфильтрованные поездки</button-->
    </body>
  </div>
</template>

<script>
import RouteFilter from '../../../models/routeFilter.js';
import RequestService from '../../../services/rqst.service';
import ShipService from '../../../services/ship.service'


export default {
  name: 'BoardClient',
  data() {
    return {
      content: '',
      submitted: false,
      loading: false,
      filteredRoutes: [],
      filter: new RouteFilter(null,null,null, null, null, null, null, null)
    };
  },
  mounted() {
    RequestService.getClientBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
      }
    );
  },
  methods: {
    sendFilterRequest() {
      this.submitted = true;

      this.$validator.validate().then(isValid => {
        if (isValid) {
          ShipService.getFilteredShippings(this.filter).then(
                  response => {
                    this.filteredRoutes = response.data;
                  });
        }
      });
    }
  }
}
</script>

<style scoped>

  .card {
    /*max-height: 350px;*/
    max-width: 95%;
  background-color: #ffffff;
  padding: 0px 30px 30px 30px;
  /*margin-top: 0px;*/
  border: none;
  }

  .custom-card-with-background {
    background-color: #f1f1f1;
    padding: 20px 20px 20px 20px;
    /*margin: 0 auto 25px;*/
    margin-top: 20px;
    margin-bottom: 20px;
  }

  /*.text-align-right {*/
  /*  text-align: right;*/
  /*}*/
</style>