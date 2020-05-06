<template>
  <div class="container">

    <!--div class="font-italic" style="margin-top: 20px; margin-right: 200px; margin-left: 200px">Наш сервис помогает снизить стоимость грузовых перевозок для клиентов засчёт того, что водители забирают ваш груз в дополнение к своим существующим заказам. А водителям - заполнить пустые места при перевозках за небольшую плату.</div-->

    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Я водитель</h5>
            <img class="card-img-top" v-bind:src="require('../assets/car.jpg')" alt="Car image">
            <p class="card-text">Создавайте поездки, принимайте заявки от клиентов, договаривайтесь о цене.</p>
            <router-link :to="'/register'"  class="btn btn-info btn-block" style="margin-bottom: 15px">Зарегистрироваться</router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Я клиент</h5>
            <img class="card-img-top" style="height: 200px" v-bind:src="require('../assets/boxes.jpg')" alt="Boxes image">
            <p class="card-text" style="margin-top: 10px">Ищите водителей, оставляйте заявки, предлагайте свою сумму сделки и ждите ответа!</p>
            <router-link :to="'/register'"  class="btn btn-info btn-block" style="margin-bottom: 15px">Зарегистрироваться</router-link>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  }
};
</script>
