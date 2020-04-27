<template>
  <div class="container">
    <header class="jumbotron">
      <h3><router-link :to="'/presentDriver'" class="btn"></router-link>
          Мои будущие поездки</h3>
    </header>
    <body>

    <table class="table table-hover table-sm">
        <thead class="thead-dark">
        <tr>
            <th>Дата отправления</th>
            <th>Дата прибытия</th>
            <th>Город отправления</th>
            <th>Город прибытия</th>
            <th>Доп. время (дн)</th>
            <th>Высота (м)</th>
            <th>Ширина (м)</th>
            <th>Длина (м)</th>
            <th>Вес (кг)</th>
            <th>Комментарий</th>
            <th><router-link to="/addRoute" class="btn btn-dark btn-sm">+</router-link></th>
        </tr>
        </thead>
        <tbody id="list_route">
            <tr v-for="route in routes" :key="route.date_start">
              <td>{{ route.date_start }}</td>
              <td>{{ route.date_finish }}</td>
              <td>{{ route.start }}</td>
              <td>{{ route.finish }}</td>
              <td>{{ route.plus_time }}</td>
              <td>{{ route.weight }}</td>
              <td>{{ route.height }}</td>
              <td>{{ route.length }}</td>
              <td>{{ route.width }}</td>
              <td>{{ route.comment }}</td>
              <td><router-link :to="'/editRoute/'+route.id" class="btn btn-sm">./</router-link>
                  <router-link :to="'/deleteRoute/'+route.id" class="btn btn-sm">X</router-link></td>

            </tr>
        </tbody>
    </table>
    </body>
  </div>
</template>

<script>
import ShipService from '../../../services/ship.service';

export default {
  name: 'list_route',
  data() {
    return {
      routes: []
    };
  },
  mounted() {
    ShipService.getDriverBoard(3).then(
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
