<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Отправить отзыв</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="addComment">

      <div class="card">
            <div class="row">
                <div class="col-sm-12">
                    <div class="top-buffer font-weight-bold text-center"><h4 class="text-center">Отзыв</h4></div>
                    <div class="row top-buffer">
                        <div class="col-sm-4 light-color">Оцените перевозку: </div>
                        <div class="col-sm-8"><select
                                v-model="comment.rate"
                                class="form-control"
                        >
                            <option disabled value="">Оценка</option>
                            <option value="5">Превосходно</option>
                            <option value="4">Хорошо</option>
                            <option value="3">Нормально</option>
                            <option value="2">Плохо</option>
                            <option value="1">Ужасно</option>
                        </select></div>
                    </div>
                    <div class="row top-buffer">
                        <div class="col-sm-4 light-color">Оставьте комментарий о поездке: </div>
                        <div class="col-sm-8"><input
                                v-model="comment.comment"
                                v-validate="'max:50'"
                                type="text"
                                class="form-control"
                                name="comment"
                                placeholder="Довольны ли Вы перевозкой?"
                        /></div>
                    </div>
                </div>
            </div>
            <br>
            <button class="btn btn-primary btn-block btn-dark">Отправить</button>
          <router-link to="/client" class="btn btn-secondary btn-block">Назад</router-link>
        </div>

    </form>
    <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
    >{{message}}</div>
    </body>
  </div>
</template>

<script>
  import Comment from '../../models/comment';
  import CommentService from '../../services/comment.service';

  export default {
    name: 'Request',
    data() {
      return {
        comment: new Comment(this.$route.params.id,'','','',''),
        submitted: false,
        successful: false,
        message: ''
      };
    },
    methods: {
      addComment() {

        CommentService.addComment(this.comment).then(
                response => {
                  this.$router.push('/clientRequest');
                  return Promise.resolve(response.data);
                },
                error => {
                  return Promise.reject(error);
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
