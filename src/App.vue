<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Главная
          </router-link>
        </li>
        <li v-if="showDriverBoard" class="nav-item">
          <router-link to="/driver" class="nav-link">Мои поездки</router-link>
        </li>
        <li v-if="showDriverBoard" class="nav-item">
            <router-link to="/driverRequest" class="nav-link">Заявки</router-link>
        </li>
        <li v-if="showClientBoard" class="nav-item">
          <router-link to="/client" class="nav-link">Поиск предложений</router-link>
        </li>
        <li v-if="showClientBoard" class="nav-item">
          <router-link to="/clientRequest" class="nav-link">Заявки</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Регистрация
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Вход
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />Выход
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showDriverBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('driver');
      }

      return false;
    },
    showClientBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('client');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
