<template>
  <div class="container">
    <header class="jumbotron">
      <h3><router-link :to="'/clientRefusedRequest'" class="btn btn-sm"><font-awesome-icon icon="chevron-left" /></router-link>
        Не отвеченные заявки
        <router-link :to="'/clientRequest'" class="btn btn-sm"><font-awesome-icon icon="chevron-right" /></router-link></h3>
    </header>
    <body>
    <table class="table table-hover table-sm">
      <thead class="thead-dark">
      <tr>
        <th>Ник водителя</th>
        <th>Город отправления</th>
        <th>Город прибытия</th>
        <th>Высота (см)</th>
        <th>Ширина (см)</th>
        <th>Длина (см)</th>
        <th>Вес (кг)</th>
        <th>Комментарий</th>
        <th>Цена (руб.)</th>
        <th></th>
      </tr>
      </thead>
      <tbody id="list_request">
      <tr v-for="request in requests" :key="request.id">
        <td><router-link :to="'/comment/'+request.driverName" class="btn btn-sm">{{ request.driverName }}</router-link></td>
        <td>{{ request.start }}</td>
        <td>{{ request.finish }}</td>
        <td>{{ request.weight }}</td>
        <td>{{ request.height }}</td>
        <td>{{ request.length }}</td>
        <td>{{ request.width }}</td>
        <td>{{ request.comment }}</td>
        <td>{{ request.price}}</td>
        <td><router-link :to="'/editRequest/'+request.id" class="btn btn-sm"><font-awesome-icon icon="edit" /></router-link>
        <router-link :to="'/deleteRequest/'+request.id" class="btn btn-sm"><font-awesome-icon icon="trash-alt" /></router-link></td>

      </tr>
      </tbody>
    </table>
    </body>
  </div>
</template>

<script>
import RequestService from '../../../services/rqst.service';

export default {
  name: 'list_request',
  data() {
    return {
      requests: []
    };
  },
  mounted() {
    RequestService.getClientRequestBoard(0).then(
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
