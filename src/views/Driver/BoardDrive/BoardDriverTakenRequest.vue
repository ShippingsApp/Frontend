<template>
  <div class="container">
    <header class="jumbotron">
      <h3>  <router-link to="/driverRequest" class="btn btn-sm"><-</router-link>
          Принятые реквесты</h3>
    </header>
    <body>

    <table class="table table-hover table-sm">
        <thead class="thead-dark">
        <tr>
            <th><label for="date_start">Дата отправления</label></th>
            <th><label for="date_finish">Дата прибытия</label></th>
            <th>
                <select v-model="start" >
                    <option value="">Город отправления</option>
                    <option v-for="(start) in uniqStarts">{{start}}</option>
                </select>
            </th>
            <th><select v-model="finish" >
                <option value="">Город прибытия</option>
                <option v-for="(finish) in uniqFinishes">{{finish}}</option>
            </select></th>
            <th><label for="plus_time">Доп. время (дн)</label></th>
            <th><label for="weight">Высота (м)</label></th>
            <th><label for="height">Ширина (м)</label></th>
            <th><label for="length">Длина (м)</label></th>
            <th><label for="width">Вес (кг)</label></th>
            <th><label for="comment">Комментарий</label></th>
            <th><button class="btn btn-dark btn-sm">?</button></th>
        </tr>
        </thead>
        <tbody id="list_route">

             <tr v-for="route in filteredList">
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
                <td><router-link :to="'/shipTakenRequests/'+route.id" class="btn btn-sm">V</router-link></td>
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
  el: '#list_route',
  data() {
      return {
          start: '',
          finish: '',
          routes: []
      };
  },
    computed:{
        uniqStarts: function(){
            return this.routes
                .map((x) => x.start)
                .reduce((r, с) => [...new Set(r.concat(с))], [])
        },
        uniqFinishes: function(){
            return this.routes
                .map((x) => x.finish)
                .reduce((r, с) => [...new Set(r.concat(с))], [])
        },
        filteredList: function(){
            var strt = this.start;
            var fnsh = this.finish;
            return this.routes.filter(function (elem) {
                if(strt=='' && fnsh=='') return true;
                else return (elem.start.indexOf(strt) > -1) && (elem.finish.indexOf(fnsh) > -1);
            })
        }
    },

    mounted() {
    ShipService.getDriverRequestBoard(1).then(
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
