<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Реквесты</h3>
    </header>
    <body>

    <table class="table table-hover table-sm">
        <thead class="thead-dark">
        <tr>
            <th><label for="date_start">Дата отправления</label></th>
            <th><label for="date_finish">Дата прибытия</label></th>
            <th><label for="start">Город отправления</label></th>
            <th><label for="finish">Город прибытия</label></th>
            <th><label for="weight">Высота (м)</label></th>
            <th><label for="height">Ширина (м)</label></th>
            <th><label for="length">Длина (м)</label></th>
            <th><label for="width">Вес (кг)</label></th>
            <th><label for="plus_time">Доп. время (дн)</label></th>
            <th><label for="comment">Комментарий</label></th>
            <th><button class="btn btn-dark btn-sm">?</button></th>
        </tr>
        </thead>
        <tbody id="list_route">
            <tr v-for="route in routes" :key="route.id">
              <td>{{ route.date_start }}</td>
              <td>{{ route.date_finish }}</td>
              <td>{{ route.start }}</td>
              <td>{{ route.finish }}</td>
              <td>{{ route.weight }}</td>
              <td>{{ route.height }}</td>
              <td>{{ route.length }}</td>
              <td>{{ route.width }}</td>
              <td>{{ route.plus_time }}</td>
              <td>{{ route.comment }}</td>
                <td><button class="btn btn-sm">V</button><router-link :to="'/refuseShip/'+route.id" class="btn btn-sm">X</router-link></td>
            </tr>
        </tbody>
    </table>
    </body>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'DriverRequest',
  el: '#list_route',
  data() {
    return {
      routes: []
    };
  },
  mounted() {
    UserService.getDriverRequestBoard().then(
      response => {
        this.routes = response.data;
      },
      error => {
        this.routes =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
