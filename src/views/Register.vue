<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">

          <div class="form-group">
            <label for="username">Имя пользователя</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:30'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>

          <div class="form-group">
            <label for="realName">Имя и фамилия</label>
            <input
              v-model="user.realName"
              v-validate="'required|max:30'"
              type="text"
              class="form-control"
              name="realName"
            />
            <div
              v-if="submitted && errors.has('realName')"
              class="alert-danger"
            >{{errors.first('realName')}}</div>
          </div>

          <div class="form-group">
            <label for="chosenRole">Роль</label>
            <input
              v-model="user.chosenRole"
              v-validate="'required|max:10'"
              type="text"
              class="form-control"
              name="chosenRole"
            />
            <div
              v-if="submitted && errors.has('chosenRole')"
              class="alert-danger"
            >{{errors.first('chosenRole')}}</div>
          </div>

          <div class="form-group">
            <label for="mobilePhone">Мобильный телефон</label>
            <input
              v-model="user.mobilePhone"
              v-validate="'required|max:15'"
              type="text"
              class="form-control"
              name="mobilePhone"
            />
            <div
              v-if="submitted && errors.has('mobilePhone')"
              class="alert-danger"
            >{{errors.first('mobilePhone')}}</div>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              v-model="user.password"
              v-validate="'required|min:5|max:20'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>

          <div class="form-group">
            <button class="btn btn-secondary btn-block">Зарегистрироваться</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
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
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
}

</style>