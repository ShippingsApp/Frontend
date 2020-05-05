<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Изменить запрос</h3>
    </header>
    <body>

    <div v-if="!successful">
      <div class="card card-container">
        <form name="form" @submit.prevent="editThisRequest">
          <div class="form-group row">
            <label for="requestStart" class="col-sm-4 col-form-label">Стартовая точка:</label>
            <input
                    v-model="request.start"
                    type="text"
                    class="form-control col-sm-8"
                    name="requestStart"
                    :placeholder="oldRequest.start"
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
                    :placeholder="oldRequest.finish"
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
                    :placeholder="oldRequest.weight"
            />
            <div v-if="errors.has('requestWeight')" class="alert-danger">Введите вес</div>

            <label for="requestHeight" class="col-sm-2 col-form-label">Высота (см):</label>
            <input
                    v-model="request.height"
                    v-validate="'required|decimal:6'"
                    type="text"
                    class="form-control col-sm-1"
                    name="requestHeight"
                    :placeholder="oldRequest.height"
            />
            <div v-if="errors.has('requestHeight')" class="alert-danger">Введите высоту</div>

            <label for="requestWidth" class="col-sm-2 col-form-label">Ширина (см):</label>
            <input
                    v-model="request.width"
                    v-validate="'required|decimal:6'"
                    type="text"
                    class="form-control col-sm-1"
                    name="requestWidth"
                    :placeholder="oldRequest.width"
            />
            <div v-if="errors.has('requestWidth')" class="alert-danger">Введите ширину</div>

            <label for="requestLength" class="col-sm-2 col-form-label">Длина (см):</label>
            <input
                    v-model="request.length"
                    v-validate="'required|decimal:6'"
                    type="text"
                    class="form-control col-sm-1"
                    name="requestLength"
                    :placeholder="oldRequest.length"
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
                    :placeholder="oldRequest.comment"
            />
          </div>

          <div class="form-group row">
            <label for="requestPrice" class="col-sm-6 col-form-label">Предполагаемая стоимость перевозки:</label>
            <input
                    v-model="request.price"
                    type="text"
                    v-validate="'decimal:6'"
                    class="form-control col-sm-6"
                    name="requestPrice"
                    :placeholder="oldRequest.price"
            />
            <div v-if="errors.has('requestPrice')" class="alert-danger">Введите цену</div>
          </div>

          <div class="form-group custom-padding">
            <button class="btn btn-secondary btn-block">
              <span>Сохранить изменения</span>
            </button>
          </div>

        </form>
      </div>
    </div>
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
