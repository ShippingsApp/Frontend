<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Добавить маршрут</h3>
    </header>
    <body style="height:100%; width:100%">
    <form name="form" @submit.prevent="addNewRoute">
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
                        v-validate="'required|date_format:yyyy-mm-dd'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('dateStart')}"
                        name="dateStart"
                        placeholder="ГГГГ-ММ-ДД"
                />
                <div v-if="submitted && errors.has('dateStart')" class="alert-danger">Введите дату в формате ГГГГ-ММ-ДД</div>
              </div>
            </td>

            <td colspan="3">
              <div class="form-group">
                <div class="width: 100%; height: 100%; position-relative">
                  <label for="start">Город отправления</label>
                  <input
                          ref="suggest"
                          v-validate="'required|address_city_from'"
                          type="text"
                          class="form-control input"
                          v-bind:class="{ 'alert-danger' : submitted && errors.has('startPoint')}"
                          name="startPoint"
                          placeholder="Введите адрес">
                </div>
                <div v-if="submitted && errors.has('startPoint')" class="alert-danger">{{errors.first('startPoint')}}</div>
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="1"> <div class="form-group">
              <label for="dateFinish">Дата прибытия</label>
              <input
                      v-model="route.dateFinish"
                      v-validate="'required|date_format:yyyy-MM-dd'"
                      type="text"
                      class="form-control"
                      v-bind:class="{ 'alert-danger' : submitted && errors.has('dateFinish')}"
                      name="dateFinish"
                      placeholder="ГГГГ-ММ-ДД"
              />
              <div v-if="submitted && errors.has('dateFinish')" class="alert-danger">Введите дату в формате ГГГГ-ММ-ДД</div>
            </div></td>

            <td colspan="3">
              <div class="form-group">
                <div class="width: 100%; height: 100%; position-relative">
                  <label for="finish">Город прибытия</label>
                  <input
                          ref="suggest2"
                          type="text"
                          v-validate="'required|address_city_to'"
                          class="form-control input"
                          v-bind:class="{ 'alert-danger' : submitted && errors.has('finishPoint')}"
                          name="finishPoint"
                          placeholder="Введите адрес">
                </div>
              </div>
              <div v-if="submitted && errors.has('finishPoint')" class="alert-danger">{{errors.first('finishPoint')}}</div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4">
              <div class="form-group">
                <label for="plusTime">Дополнительное время (дни)</label>
                <input
                        v-model="route.plusTime"
                        v-validate="'required|max:5'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('plusTime')}"
                        name="plusTime"
                        placeholder="0"
                />
                </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4" class="text-center haract">Характеристики груза</td>
          </tr>

          <tr class="table-active">
            <td>
              <div class="form-group">
                <label for="height">Высота (см)</label>
                <input
                        v-model="route.height"
                        v-validate="'required|max:5'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('height')}"
                        name="height"
                        placeholder="0"
                />
              </div>
            </td>

            <td>
              <div class="form-group">
                <label for="width">Ширина (см)</label>
                <input
                        v-model="route.width"
                        v-validate="'required|max:5'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('width')}"
                        name="width"
                        placeholder="0"
                />
              </div>
            </td>

            <td>
              <div class="form-group">
                <label for="length">Длина (см)</label>
                <input
                        v-model="route.length"
                        v-validate="'required|max:5'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('length')}"
                        name="length"
                        placeholder="0"
                />
              </div>
            </td>

            <td>
              <div class="form-group">
                <label for="weight">Вес (кг)</label>
                <input
                        v-model="route.weight"
                        v-validate="'required|max:5'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('weight')}"
                        name="weight"
                        placeholder="0"
                />
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4">
              <div class="form-group">
                <label for="comment">Комментарий</label>
                <input
                        v-model="route.comment"
                        v-validate="'max:100'"
                        type="text"
                        class="form-control"
                        v-bind:class="{ 'alert-danger' : submitted && errors.has('commect')}"
                        name="comment"
                        placeholder="Сыпучий груз"
                />
              </div>
            </td>
          </tr>

          <tr class="table-active">
            <td colspan="4" class="align-content-center">
              <div class="form-group">
                <button type="submit"
                        class="btn-down btn btn-primary btn-block">Добавить
                </button>
              </div>
            </td>
          </tr>

        </table>
      </div>
    </form>



    <div class="center">
      <div v-if="message" class="alert text-center"
           :class="successful ? 'alert-success' : 'alert-danger'">
        {{message}}
      </div>
      <router-link :to="'/driver'" v-if="successful" class="btn btn-secondary btn-block text-center">
        Вернуться к моим поездкам
      </router-link>


      <div v-show="successful">
        <div  id="mapid" ref="mapref" style="max-width: 1000px; height: 400px; margin-top: 30px">
        </div>
      </div>
    </div>


    </body>
  </div>

</template>

<script>
  import Route from '../../../models/route';
  import ShipService from '../../../services/ship.service';

  import { loadYmap } from 'vue-yandex-maps'

  export default {
    name: 'Route',
    data() {
      return {
        route: new Route('', '', '', '', '', '', '', '', '', '', ''),
        submitted: false,
        successful: false,
        startObjectFromGeocoder: null,
        finishObjectFromGeocoder: null,
        error_address_from: true,
        error_address_to: true,
        message_error_address_from: '',
        message_error_address_to: '',
        currMap: null,
        currPlacemark: null,
        message: ''
      };
    },
    components: {
      loadYmap
    },

    async mounted() {
      const settings = {
        apiKey: 'e7ac42a7-0581-4bb6-a333-8d12997bfb46',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      };
      await loadYmap(settings);
      ymaps.ready(this.initMap());

      this.$validator.extend('address_city_from', {
        getMessage: field => this.message_error_address_from,
        validate: point => this.error_address_from
      });

      this.$validator.extend('address_city_to', {
        getMessage: field => this.message_error_address_to,
        validate: point => this.error_address_to
      });



    },
    methods: {
      async addNewRoute() {
        this.submitted = true;

        await this.processAddress(1);
        await this.processAddress(2);

        this.$validator.validate().then(isValid => {
          if (isValid) {
            ShipService.addRoute(this.route).then(
                    response => {
                      this.message = response.data.message;
                      this.successful = true;
                      this.showRoute(this.startObjectFromGeocoder, this.finishObjectFromGeocoder)
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

      },
      initMap: function () {
        var suggestView1 = new ymaps.SuggestView(this.$refs.suggest), map, placemark;
        var suggestView2 = new ymaps.SuggestView(this.$refs.suggest2);

        this.currMap = map;
        this.currPlacemark = placemark;

      },
      showRoute : function(startObjectFromGeocoder, finishObjectFromGeocoder) {
        var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: [
            startObjectFromGeocoder.geometry.getCoordinates(),
            finishObjectFromGeocoder.geometry.getCoordinates()
          ],
          params: {
            results: 1
          }
        }, {
          boundsAutoApply: true
        });

        this.currMap = new ymaps.Map(this.$refs.mapref, {
          center: startObjectFromGeocoder.geometry.getCoordinates(),
          zoom: 5,
          controls: []
        });

        this.currMap.geoObjects.add(multiRoute);
      },

      async processAddress(point) {
        let inputAddress = '';
        switch (point) {
          case 1:
            inputAddress = this.$refs.suggest.value;
            break;
          case 2:
            inputAddress = this.$refs.suggest2.value;
            break;
        }
        if (inputAddress === '')
          return;

        var obj = await ymaps.geocode(inputAddress).then(geocodeResponse => {
          return geocodeResponse.geoObjects.get(0);
        });
        var error, hint;
          if (obj) {
            switch (obj.properties.get('metaDataProperty.GeocoderMetaData.kind')) {
              case 'locality':
              case 'district':
              case 'metro':
              case 'street':
              case 'house':
              case 'area':
              case 'province':
                break;
              case 'country':
              case 'region':
              case 'other':
              default:
                error = 'Неточный адрес, требуется уточнение';
            }
          } else {
            error = 'Адрес не найден';
          }


          if (error) {
            switch (point) {
              case 1:
                this.message_error_address_from = error;
                this.error_address_from = false;
                break;
              case 2:
                this.message_error_address_to = error;
                this.error_address_to = false;
                break;
            }
          } else {
            switch (point) {
              case 1:
                this.error_address_from = true;
                this.message_error_address_from = '';
                this.route.start = inputAddress;
                this.startObjectFromGeocoder = obj;
                break;
              case 2:
                this.error_address_to = true;
                this.message_error_address_to = '';
                this.route.finish = inputAddress;
                this.finishObjectFromGeocoder = obj;
                break;
            }
          }
      },
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
