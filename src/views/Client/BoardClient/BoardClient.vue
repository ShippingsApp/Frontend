<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
    <body>
    <router-link to="/addRequest" class="btn btn-dark btn-sm">Отправить реквест!</router-link>
    </body>
  </div>
</template>

<script>
import RequestService from '../../../services/rqst.service';

export default {
  name: 'User',
  data() {
    return {
      content: '',

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
  }
};
</script>
