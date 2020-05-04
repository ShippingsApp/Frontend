<template>
  <div class="container">
    <body>
      <div v-if="!successful && startedCreatingRequest">
        <div class="card card-container">
          <form name="form" @submit.prevent="addNewRequest">
            <div class="form-group row">
              <label for="requestStart" class="col-sm-4 col-form-label">Стартовая точка:</label>
              <input
                      v-model="request.start"
                      v-validate="'required'"
                      type="text"
                      class="form-control col-sm-8"
                      name="requestStart"
              />
              <div v-if="errors.has('requestStart')" class="alert-danger">Требуется стартовая точка</div>
            </div>

            <div class="form-group row">
              <label for="requestFinish" class="col-sm-4 col-form-label">Конечная точка:</label>
              <input
                      v-model="request.finish"
                      v-validate="'required'"
                      type="text"
                      class="form-control col-sm-8"
                      name="requestFinish"
              />
              <div v-if="errors.has('requestFinish')" class="alert-danger">Введите конечную точку</div>
            </div>

            <div class="form-group row">
              <label for="requestWeight" class="col-sm-2 col-form-label">Вес (кг):</label>
              <input
                      v-model="request.weight"
                      v-validate="'required|decimal:6'"
                      type="text"
                      class="form-control col-sm-1"
                      name="requestWeight"
              />
              <div v-if="errors.has('requestWeight')" class="alert-danger">Введите вес</div>

              <label for="requestHeight" class="col-sm-2 col-form-label">Высота (см):</label>
              <input
                      v-model="request.height"
                      v-validate="'required|decimal:6'"
                      type="text"
                      class="form-control col-sm-1"
                      name="requestHeight"
              />
              <div v-if="errors.has('requestHeight')" class="alert-danger">Введите высоту</div>

              <label for="requestWidth" class="col-sm-2 col-form-label">Ширина (см):</label>
              <input
                      v-model="request.width"
                      v-validate="'required|decimal:6'"
                      type="text"
                      class="form-control col-sm-1"
                      name="requestWidth"
              />
              <div v-if="errors.has('requestWidth')" class="alert-danger">Введите ширину</div>

              <label for="requestLength" class="col-sm-2 col-form-label">Длина (см):</label>
              <input
                      v-model="request.length"
                      v-validate="'required|decimal:6'"
                      type="text"
                      class="form-control col-sm-1"
                      name="requestLength"
              />
              <div v-if="errors.has('requestLength')" class="alert-danger">Введите ширину</div>
            </div>

            <div class="form-group row">
              <label for="requestComment" class="col-sm-4 col-form-label">Комментарий водителю:</label>
              <input
                      v-model="request.comment"
                      type="text"
                      class="form-control col-sm-8"
                      name="requestComment"
              />
            </div>

            <div class="form-group row">
              <label for="requestPrice" class="col-sm-6 col-form-label">Предполагаемая стоимость перевозки:</label>
              <input
                      v-model="request.price"
                      type="text"
                      v-validate="'required|decimal:6'"
                      class="form-control col-sm-6"
                      name="requestPrice"
              />
              <div v-if="errors.has('requestPrice')" class="alert-danger">Введите цену</div>
            </div>

            <div class="form-group custom-padding">
              <button class="btn btn-secondary btn-block" :disabled="loading">
                <span>Отправить заявку</span>
              </button>
            </div>

          </form>
        </div>
      </div>


      <div style="max-width:70%; margin-left: 15%; margin-right: 15%">
        <div v-if="message" class="alert text-center"
             :class="successful ? 'alert-success' : 'alert-danger'">{{message}}
        </div>

        <router-link :to="'/client'" v-if="successful" class="btn btn-secondary btn-block" style="margin-bottom: 15px">
          Вернуться к поиску поездок
        </router-link>
      </div>
    </body>
  </div>
</template>

<script>
  import Request from '../../../models/request';
  import RequestService from '../../../services/rqst.service';

  export default {
    name: 'add-request',
    props: {
      startedCreatingRequest: Boolean,
      routeId: Number
    },
    data() {
      return {
        request: new Request('', '', '', '', '', '','', '', '', '', '',''),
        submitted: false,
        successful: false,
        loading: false,
        message: ''
      };
    },
    methods: {
      addNewRequest() {
        this.submitted = true;
        this.$validator.validate().then(isValid => {
          if (isValid) {
              RequestService.addRequest(this.request).then(
                  response => {
                      this.message = response.data.message;
                      this.successful = true;
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

  .card {
    max-width: 70%;
    background-color: #f9f9f9;
    padding: 20px 25px 20px;
    margin: 0 auto 25px;
    margin-top: 50px;
  }

</style>
