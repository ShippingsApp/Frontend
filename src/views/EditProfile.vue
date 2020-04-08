<template>
    <div class="col-md-12">
        <header class="jumbotron">
            <h3>
                <strong>Изменение профиля</strong>
            </h3>
        </header>
        <div class="card card-container">
            <form name="form" @submit.prevent="editProfile">
                <div class="form-group">
                    <label for="realName">Имя и фамилия</label>
                    <input
                            v-model="currentUser.realName"
                            v-validate="'required|max:30'"
                            type="text"
                            class="form-control"
                            name="realName"
                    />
                    <div
                            v-if="errors.has('realName')"
                            class="alert-danger"
                    >{{errors.first('realName')}}</div>
                </div>

                <div class="form-group">
                    <label for="mobilePhone">Мобильный телефон</label>
                    <input
                            v-model="currentUser.mobilePhone"
                            v-validate="'required|max:15'"
                            type="text"
                            class="form-control"
                            name="realName"
                    />
                    <div
                            v-if="errors.has('realName')"
                            class="alert-danger"
                    >{{errors.first('realName')}}</div>
                </div>

                <div class="form-group">
                    <button class="btn btn-secondary btn-block" :disabled="loading">
                        <!--span v-show="loading" class="spinner-border spinner-border-sm"></span-->
                        <span>Сохранить изменения</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                </div>
            </form>
        </div>
    </div>
</template>



<script>
// import User from '../models/user';

export default {
    name: 'EditProfile',
    data() {
        return {
            loading: false,
            message: ''
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },
    methods: {
        editProfile() {

        }
    }
};
</script>


<style scoped>
.jumbotron {
    padding-top: 20px !important;
    padding-bottom: 15px !important;
}

.card-container.card {
    max-width: 400px !important;
    padding: 20px 40px;
}

.card {
    background-color: #ffffff;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    border: none;
}
</style>
