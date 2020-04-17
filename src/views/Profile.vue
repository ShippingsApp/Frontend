<template>
  <div class="col-md-12">
    <header class="jumbotron">
      <h3>
        <strong>Мой профиль</strong>
      </h3>
    </header>

    <div class="card">

      <div class="row top-buffer">
        <div class="col-sm-4 light-color">Логин: </div>
        <div class="col-sm-8">{{currentUser.username}}</div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-4 light-color">Имя, фамилия: </div>
        <div class="col-sm-8">{{currentUser.realName}}</div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-4 light-color">Статус: </div>
        <div class="col-sm-8" v-if="currentUser.roles[0] === 'driver'">Перевозчик</div>
        <div class="col-sm-8" v-if="currentUser.roles[0] === 'client'">Заказчик</div>
      </div>
      <div class="row top-buffer">
        <div class="col-sm-4 light-color">Моб. номер: </div>
        <div class="col-sm-8">{{currentUser.mobilePhone}}</div>
      </div>
      <div class="form-group top-buffer">
        <button v-on:click="redirectToEditProfile" class="btn btn-secondary btn-block">Редактировать</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      //console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.$store.state.auth.status.loggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    redirectToEditProfile() {
      this.$router.push('/edit profile');
    }
  }

};
</script>

<style scoped>
  .jumbotron {
    background-color: #f1f1f1;
    padding-top: 20px !important;
    padding-bottom: 15px !important;
  }

  .top-buffer { margin-top:15px; }

  .card {
    max-width: 500px !important;
    background-color: #f7f7f7;
    padding: 20px 25px 20px;
    margin: 0 auto 25px;
    margin-top: 50px;
  }

  .light-color {color: lightslategray}

</style>