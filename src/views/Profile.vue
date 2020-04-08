<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>Мой профиль</strong>
      </h3>
    </header>

    <p>Логин: {{currentUser.username}}
    </p>
    <p>Имя, фамилия: {{currentUser.realName}}
    </p>
    <p>Роль: {{currentUser.roles[0]}}
    </p>
    <p>Мобильный телефон: {{currentUser.mobilePhone}}
    </p>
    <div class="form-group">
      <button v-on:click="redirectToEditProfile" class="btn btn-secondary btn-block">Редактировать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
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
    padding-top: 20px !important;
    padding-bottom: 15px !important;
  }
</style>