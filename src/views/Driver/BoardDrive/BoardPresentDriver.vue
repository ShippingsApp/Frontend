<template>
  <div class="container">
    <header class="jumbotron">
      <h3><router-link :to="'/pastDriver'" class="btn"><font-awesome-icon icon="chevron-left" /></router-link>
          Мои текущие поездки
      <router-link :to="'/driver'" class="btn"><font-awesome-icon icon="chevron-right" /></router-link></h3>
    </header>
    <body>

    <table class="table table-hover table-sm">
        <thead class="thead-dark">
        <tr>
            <th>Дата отправления</th>
            <th>Дата прибытия</th>
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
            <th>Доп. время (дн)</th>
            <th>Высота (см)</th>
            <th>Ширина (см)</th>
            <th>Длина (см)</th>
            <th>Вес (кг)</th>
            <th>Комментарий</th>
            <th><router-link to="/addRoute" class="btn btn-dark btn-sm"><font-awesome-icon icon="plus-square" /></router-link></th>
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
              <td><router-link :to="'/editRoute/'+route.id" class="btn btn-sm"><font-awesome-icon icon="edit" /></router-link>
                  <router-link :to="'/deleteRoute/'+route.id" class="btn btn-sm"><font-awesome-icon icon="trash-alt" /></router-link></td>

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
        start:'',
        finish:'',
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
    ShipService.getDriverBoard(2).then(
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
<style>

    select{
        font-weight: bold;
        color: white;
        background-color: #343a40;
        border-color: #343a40;
    }
</style>
