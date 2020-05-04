<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Отправить отзыв</h3>
    </header>
    <body>
    <form name="form" @submit.prevent="addComment">
      <div v-if="!successful">
        <table>
          <tr class="table-active">
            <td>
                Оцените перевозку
              </td>
            <td>
              <div>
              <select
                      v-model="comment.rate"
                      class="form-control"
              >
                <option disabled value="">Оценка</option>
                <option value="5">Превосходно</option>
                <option value="4">Хорошо</option>
                <option value="3">Нормально</option>
                <option value="2">Плохо</option>
                <option value="1">Ужасно</option>
              </select>
              <div
                      v-if="submitted && errors.has('comment')"
                      class="alert-danger"
              >{{errors.first('comment')}}</div>
            </div>
            </td>
          </tr>
          <tr class="table-active">
            <td colspan="2">
              <div>
                <label for="comment">Оставьте комментарий о поездке</label>
                <input
                        v-model="comment.comment"
                        v-validate="'max:50'"
                        type="text"
                        class="form-control"
                        name="comment"
                        placeholder="Довольны ли Вы перевозкой?"
                />
                <div
                        v-if="submitted && errors.has('comment')"
                        class="alert-danger"
                >{{errors.first('comment')}}</div>
              </div>
            </td>
          </tr>
          <tr class="table-active">
            <td><div>
              <router-link to="/client" class="btn btn-primary btn-block">Назад</router-link>
            </div>
            <td><div>
              <button class="btn btn-primary btn-block">Отправить</button>
            </div>
            </td>
          </tr>
        </table>
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
        //this.message = '';
        //this.submitted = true;
        // this.$validator.validate().then(isValid => {
        //if (isValid) {
        CommentService.addComment(this.comment).then(
                response => {
                  this.$router.push('/clientRequest');
                  return Promise.resolve(response.data);
                },
                error => {
                  return Promise.reject(error);
                }
        );
        //      }
        //    });
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
