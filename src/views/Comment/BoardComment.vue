<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Отзывы о водителе {{this.$route.params.driverName}}</h3>
        Рейтинг водителя: <b>{{averageRating}}</b>; Показать отзывы с оценкой <select v-model="rate" class="header_select">
            <option value="">Все</option>
            <option value="Превосходно">Превосходно</option>
            <option value="Хорошо">Хорошо</option>
            <option value="Нормально">Нормально</option>
            <option value="Плохо">Плохо</option>
            <option value="Ужасно">Ужасно</option>
        </select>
    </header>
    <body>
    <div class="card" v-for="comment in filteredList">
        <div class="row">
            <div class="col-sm-12">
                <div class="top-buffer font-weight-bold text-center"><h4 class="text-left">{{comment.nameFrom}}</h4></div>
                <div class="row top-buffer">
                    <div class="col-sm-2 light-color">Оценка перевозки: </div>
                    <div class="col-sm-3">{{comment.rate}}</div>

                    <div class="col-sm-3 light-color">Комментарий о поездке: </div>
                    <div class="col-sm-4">{{comment.comment}}</div>

                    <div class="col-sm-3 light-color">{{comment.date}}</div>
                </div>
            </div>
         </div>
         </div>

    </body>
  </div>
</template>

<script>
import CommService from '../../services/comment.service';

export default {
  name: 'list_route',
    data: function () {
        return {
            rate: '',
            averageRating: '2,5',
            comments: []
        };
    },
  computed:{
      filteredList: function(){
            var rt = this.rate;
            return this.comments.filter(function (elem) {
                if(rt=='') return true;
                else return (elem.rate.indexOf(rt) > -1);
            })
        }
      },
  mounted() {
    CommService.getDriverComments(this.$route.params.driverName).then(
      response => {
        this.comments = response.data;
      },
      error => {
        this.comments =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
      CommService.getDriverRate(this.$route.params.driverName).then(
          response => {
              this.averageRating = response.data;
          },
          error => {
              this.averageRating =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
          }
      );
  }
};
</script>
<style>

.header_select{
    font-weight: normal;
    color: black;
    background-color: #eaedf0;
    border-color: #eaedf0;
}

</style>
