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
                        name="date_format_field"
                        placeholder="ГГГГ-ММ-ДД"
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
                          ref="suggest"
                          v-model="route.start"
                          v-validate="'required|correct_address_city'"
                          type="text"
                          class="form-control input"
                          name="startPoint"
                          placeholder="Введите адрес">
                </div>
                <div
                        v-if="submitted && errors.has('correct_address_city')"
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
                      v-model.trim="dateFinish"
                      v-model="route.dateFinish"
                      v-validate="'date_format:yyyy-MM-dd'"
                      type="text"
                      class="form-control"
                      name="dateFinish"
                      placeholder="ГГГГ-ММ-ДД"
              />
              <div
                      v-if="submitted && errors.has('dateFinish')"
                      class="alert-danger">
                Введите дату в формате ГГГГ-ММ-ДД
              </div>
            </div></td>

            <td colspan="3"><div class="form-group">
              <div class="width: 100%; height: 100%; position-relative">
                <label for="finish">Город прибытия</label>
                <input type="text" ref="suggest2" class="form-control input" placeholder="Введите адрес">
                <!--button ref="button"
                        class="btn-down btn btn-primary btn-block"
                        v-on:click="processAdress(2)">Проверить на карте</button-->
              </div>
              <div
                      v-if="point_error"
                      class="alert-danger"
              >{{point_error}}</div>
            </div></td>
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
                        name="plusTime"
                        placeholder="0"
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
                        class="alert-danger">
                  {{errors.first('weight')}}
                </div>
              </div>
            </td>

            <td>
              <div class="form-group">
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
                        class="alert-danger">
                  {{errors.first('height')}}
                </div>
              </div>
            </td>

            <td>
              <div class="form-group">
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
                >{{errors.first('length')}}
                </div>
              </div>
            </td>

            <td>
              <div class="form-group">
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
                        placeholder="Сыпучий груз"
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
                        v-on:click="addNewRoute"
                        class="btn-down btn btn-primary btn-block">Добавить
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
            :class="successful ? 'alert-success' : 'alert-danger'">
      {{message}}
    </div>

    <!--    <div>-->
    <!--      <input type="text" ref="suggest3" class="input" placeholder="Введите адрес">-->
    <!--      <button type="submit" ref="button" v-on:click="geocode">Проверить</button>-->
    <!--    </div>-->

    <!--    <yandex-map ref="addRouteMap"-->
    <!--                :coords="coords_from"-->
    <!--                :zoom="10"-->
    <!--                style="width: 200px; height: 200px;"-->
    <!--                @map-was-initialized="mapLoaded"-->
    <!--    >-->
    <!--    </yandex-map>-->

    <!--    <div class="width: 100%; height: 100%; position-relative">-->
    <!--      <label for="start">Город отправления</label>-->
    <!--      <input type="text" ref="suggest3" class="form-control" placeholder="Введите адрес">-->
    <!--      <button ref="button"-->
    <!--              class="btn-down btn btn-primary btn-block"-->
    <!--              v-on:click="processAdress(1)">Проверить на карте</button>-->
    <!--    </div>-->

    <div id="mapid" ref="mapref" style="width: 300px; height: 200px">
    </div>



    </body>
  </div>

</template>

<script>
  import Route from '../../../models/route';
  import ShipService from '../../../services/ship.service';
  //import { validationMixin } from 'vuelidate'
  import { loadYmap } from 'vue-yandex-maps'

  export default {
    name: 'Route',
    data() {
      return {
        route: new Route('', '', '', '', '', '', '', '', '', '', ''),
        submitted: false,
        successful: false,
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

      this.$validator.extend('correct_address_city', {
        getMessage: field => 'Некорректный адрес',
        validate: point => false
      });


    },
    methods: {
      addNewRoute() {
        this.message = '';
        this.submitted = true;

        this.processAdress(1);
        this.processAdress(2);



        this.$validator.validate().then(isValid => {
          if (isValid) {
            ShipService.addRoute(this.route).then(
                    response => {
                      //this.$router.push('/driver');
                      this.message = response.message;
                      this.successful = true;
                      return Promise.resolve(response.data);
                    },
                    error => {
                      this.message =
                              (error.response && error.response.data) ||
                              error.message ||
                              error.toString();
                      this.successful = false;
                      return Promise.reject(error);
                    }
            );
          }
        });




        //      }
        //    });
      },
      initMap: function () {
        console.log('!');
        var suggestView1 = new ymaps.SuggestView(this.$refs.suggest), map, placemark;
        var suggestView2 = new ymaps.SuggestView(this.$refs.suggest2);

        map = new ymaps.Map(this.$refs.mapref, {
          center: [55.74954, 37.621587],
          zoom: 10,
          style: 'width: 200px; min-height: 200px; width: 100%; height: 100%'
        });

      },
      showResult : function(objectFromGeocoder) {
        //this.$refs.suggest.removeClass('input_error');
        //$('#notice').css('display', 'none');

        var mapContainer = $('#map'),
                bounds = objectFromGeocoder.properties.get('boundedBy'),
                mapState = ymaps.util.bounds.getCenterAndZoom(
                        bounds,
                        [mapContainer.width(), mapContainer.height()]
                ),
                address = [objectFromGeocoder.getCountry(), objectFromGeocoder.getAddressLine()].join(', '),
                shortAddress = [objectFromGeocoder.getThoroughfare(), objectFromGeocoder.getPremiseNumber(), objectFromGeocoder.getPremise()].join(' ');
        // Убираем контролы с карты.
        mapState.controls = [];
        createMap(mapState, shortAddress);
        // showMessage(address);
      },
      processAdress: function (point) {
        switch (point) {
          case 1:
            var request = this.$refs.suggest.value;
            break;
          case 2:
            var request = this.$refs.suggest2.value;
            break;
        }

        console.log('processingAddress');
        console.log(request);
        console.log(point);

        ymaps.geocode(request).then(res => {

          var obj = res.geoObjects.get(0), error, hint;
          console.log(obj);
          if (obj) {
            switch (obj.properties.get('metaDataProperty.GeocoderMetaData.kind')) {
              case 'locality':
              case 'district':
              case 'metro':
              case 'street':
              case 'house':
                break;
              case 'area':
              case 'province':
              case 'country':
              case 'region':
              case 'other':
              default:
                error = 'Неточный адрес, требуется уточнение';
                hint = 'Уточните город/поселение';
            }
          } else {
            error = 'Адрес не найден';
            hint = 'Введите корректный адрес';
          }


          if (error) {
            console.log("ERROR!!!");
            //this.showError(elem, error);
          } else {
            console.log("OK!!!!");
            switch (point) {
              case 1:
                this.route.start = request;
                break;
              case 2:
                this.route.finish = request;
                break;
                    //this.showResult(obj);
            }

          }
        });
      },
      showErrow(elem, error) {
        elem.text(error);
      }
      // editMap : function(state, caption) {
      //
      //
      //     if (!map) {
      //       map = new ymaps.Map('map', state);
      //       placemark = new ymaps.Placemark(
      //               map.getCenter(), {
      //                 iconCaption: caption,
      //                 balloonContent: caption
      //               }, {
      //                 preset: 'islands#redDotIconWithCaption'
      //               });
      //       map.geoObjects.add(placemark);
      //       // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
      //     } else {
      //       map.setCenter(state.center, state.zoom);
      //       placemark.geometry.setCoordinates(state.center);
      //       placemark.properties.set({iconCaption: caption, balloonContent: caption});
      //     }
      //
      // }
    }

  };
</script>
<style>
  /*table{*/
  /*  width: 100%;*/
  /*}*/

  table.center {
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
    /*color: white;*/
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