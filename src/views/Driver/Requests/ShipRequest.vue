<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Заявки</h3>
    </header>
    <body>

    <table class="table table-hover table-sm">
        <thead class="thead-dark">
        <tr>
            <th><label for="start">Город отправления</label></th>
            <th><label for="finish">Город прибытия</label></th>
            <th><label for="width">Высота (см)</label></th>
            <th><label for="height">Ширина (см)</label></th>
            <th><label for="length">Длина (см)</label></th>
            <th><label for="weight">Вес (кг)</label></th>
            <th><label for="comment">Комментарий</label></th>
            <th><label for="price">Цена</label></th>
            <th><button class="btn btn-dark btn-sm"></button></th>
        </tr>
        </thead>
        <tbody id="list_request">

             <tr v-for="request in requests" :key="request.id">
              <td>{{ request.start }}</td>
              <td>{{ request.finish }}</td>
              <td>{{ request.width }}</td>
              <td>{{ request.height }}</td>
              <td>{{ request.length }}</td>
              <td>{{ request.weight }}</td>
              <td>{{ request.comment }}</td>
              <td>{{ request.price}}</td>
                 <td><router-link :to="'/takeShip/'+request.id" class="btn btn-sm"><font-awesome-icon icon="check-square" /></router-link>
                     <router-link :to="'/refuseShip/'+request.id" class="btn btn-sm"><font-awesome-icon icon="trash-alt" /></router-link></td>
            </tr>

        </tbody>
    </table>
    </body>
  </div>
</template>

<script>
import ShipService from '../../../services/ship.service';

export default {
  name: 'DriverRequest',
  el: '#list_request',
  data() {
    return {
      requests: []

    };
  },
  mounted() {
    ShipService.getShipRequest(this.$route.params.id,0).then(
      response => {
        this.requests = response.data;
      },
      error => {
        this.requests =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
