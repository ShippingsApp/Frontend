<template>
    <div class="container col-md-12" style="height:100%; width:100%">
        <header class="jumbotron">
            <h3>
                <strong>Информация о поездке</strong>
            </h3>
        </header>

        <div class="card">
            <div class="row">
                <div class="col-sm-7">
                    <div class="top-buffer font-weight-bold text-center"><h4 class="text-center">Маршрут</h4></div>
                    <div class="row top-buffer">
                        <div class="col-sm-4 light-color">Точка отправления: </div>
                        <div class="col-sm-8">{{this.route.start}}</div>
                    </div>
                    <div class="row top-buffer">
                        <div class="col-sm-4 light-color">Точка прибытия: </div>
                        <div class="col-sm-8">{{this.route.finish}}</div>
                    </div>
                    <div class="row top-buffer">
                        <div class="col-sm-4 light-color">Дата отправления: </div>
                        <div class="col-sm-8">{{this.route.dateStart}}</div>
                    </div>
                    <div class="row top-buffer">
                        <div class="col-sm-4 light-color">Дата прибытия: </div>
                        <div class="col-sm-8">{{this.route.dateFinish}}</div>
                    </div>
                </div>
                <div class="col-sm-5" style="height:100%; width:100%">
                    <div  id="mapid" ref="mapref" style="max-width: 300px; height: 300px">
                    </div>
                </div>
            </div>


            <div class="top-buffer font-weight-bold"><h4 class="text-center">Параметры груза</h4></div>
            <div class="row top-buffer">
                <div class="col-sm-4 light-color">Максимальный вес: </div>
                <div class="col-sm-2">{{this.route.weight}}кг</div>
                <div class="col-sm-4 light-color">Макс. длина: </div>
                <div class="col-sm-2">{{this.route.length}}см</div>
            </div>
            <div class="row top-buffer">
                <div class="col-sm-4 light-color">Максимальная ширина: </div>
                <div class="col-sm-2">{{this.route.width}}см</div>
                <div class="col-sm-4 light-color">Максимальная высота: </div>
                <div class="col-sm-2">{{this.route.height}}см</div>
            </div>
            <div v-if="showCreateRequestButton" class="form-group top-buffer">
                <button v-on:click="displayAddRequest" class="btn btn-secondary btn-block">Откликнуться</button>
            </div>
        </div>

        <add-request :started-creating-request="startedCreatingRequest"/>


    </div>

</template>

<script>
    import ShipService from "../../../services/ship.service";
    import Route from "../../../models/route";
    import {loadYmap} from "vue-yandex-maps";
    import AddRequest from "../../Client/Request/AddRequest";

    export default {
        name: "DisplayRoute",
        data() {
            return {
                route: new Route(),
                startedCreatingRequest: false,
                showCreateRequestButton:true,
                successful: false,
                message: '',
                currMap: null
            };
        },
        components: {
            AddRequest,
            loadYmap
        },
        async mounted() {
            await ShipService.getRoute(this.$route.params.id).then(
                response => {
                    this.route = response.data;
                }
            );

            const settings = {
                apiKey: 'e7ac42a7-0581-4bb6-a333-8d12997bfb46',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            };
            await loadYmap(settings);
            ymaps.ready(this.showRoute());
        },
        methods: {
            displayAddRequest() {
                this.startedCreatingRequest = true;
                this.showCreateRequestButton = false;
            },

            async showRoute(){
                var map, placemark;
                this.currMap = map;
                var startObjectFromGeocoder, finishObjectFromGeocoder;
                 await this.processAddress(this.route.start).then(obj => {
                     startObjectFromGeocoder = obj;
                 });
                await this.processAddress(this.route.finish).then(obj => {
                    finishObjectFromGeocoder = obj;
                });
                //let finishObjectFromGeocoder = this.processAddress(this.route.finish);


                var multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        startObjectFromGeocoder.geometry.getCoordinates(),
                        finishObjectFromGeocoder.geometry.getCoordinates()
                    ],
                    params: {results: 1}
                }, {
                    boundsAutoApply: true
                });

                this.currMap = new ymaps.Map(this.$refs.mapref, {
                    center: startObjectFromGeocoder.geometry.getCoordinates(),
                    zoom: 5,
                    controls: []
                });

                this.currMap.geoObjects.add(multiRoute);
            },

            async processAddress(address) {
                let geocodeResponse = null;
                await ymaps.geocode(address).then(response =>
                    geocodeResponse = response.geoObjects.get(0)
                );
                return geocodeResponse
            },
        }
    }
</script>

<style scoped>
    .top-buffer { margin-top:15px; }

    .card {
        max-width: 70%;
        max-height: 50% !important;
        background-color: #f9f9f9;
        padding: 20px 25px 20px;
        margin: 0 auto 25px;
        margin-top: 50px;
    }

    .light-color {color: lightslategray}

    .ymap-container {
        height: 50% !important;
    }

    .ymap-body {
        width: 50%;
        height: 50%;
    }
</style>