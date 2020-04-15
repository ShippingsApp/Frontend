<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Отказаться //И здесь должен быть кусок который подгружает информацию о шипе</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="refuseShip">
      <div v-if="!successful">
        <div class="form-group">
          <div class="form-group">
            <button class="btn btn-primary btn-block btn-dark">Отказаться</button>
          </div>
        </div>
      </div>
    </form>
    <router-link :to="'/driverRequest'" class="btn btn-primary btn-block">Вернуться к реквестам</router-link>
    </body>
  </div>
</template>

<script>
  import Route from '../models/route';

  export default {
    name: 'Route',
    data() {
      return {
          submitted: false,
          successful: false,
          message: ''
    };
    },

    methods: {
      refuseShip() {
        this.message = '';
        this.submitted = true;
        this.$store.dispatch('auth/refuseShip', this.$route.params.id).then(
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
