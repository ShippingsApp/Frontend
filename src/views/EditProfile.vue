<template>
    <div class="col-md-12">
        <header class="jumbotron">
            <h3>
                <strong>Изменение профиля</strong>
            </h3>
        </header>
        <div class="card card-container">
            <form name="form" @submit.prevent="editProfile">
                <div class="form-group row">
                    <label for="realName" class="col-sm-4 col-form-label">Имя и фамилия:</label>
                    <input
                            v-model="newRealName"
                            v-validate="'required|max:30'"
                            type="text"
                            class="form-control col-sm-8"
                            name="realName"
                    />
                    <div
                            v-if="errors.has('realName')"
                            class="alert-danger"
                    >{{errors.first('realName')}}</div>
                </div>

                <div class="form-group row">
                    <label for="mobilePhone" class="col-sm-4 col-form-label">Моб. номер:</label>
                    <input
                            v-model="newMobilePhone"
                            v-validate="'required|max:15'"
                            type="text"
                            class="form-control col-sm-8"
                            name="mobilePhone"
                    />
                    <div
                            v-if="errors.has('mobilePhone')"
                            class="alert-danger"
                    >{{errors.first('mobilePhone')}}</div>
                </div>

                <div class="form-group custom-padding">
                    <button class="btn btn-secondary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Сохранить изменения</span>
                    </button>
                </div>

                <div v-if="message"
                        class="alert align-text-center"
                        :class="successful ? 'alert-success' : 'alert-danger'"
                >{{message}}</div>

            </form>
        </div>
    </div>
</template>



<script>

export default {
    name: 'EditProfile',
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('user')),
            successful: false,
            loading: false,
            message: null,
            newRealName: JSON.parse(localStorage.getItem('user')).realName,
            newMobilePhone: JSON.parse(localStorage.getItem('user')).mobilePhone
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },
    methods: {
        editProfile() {
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }

                if (this.newRealName && this.newMobilePhone) {

                    this.$store.dispatch('auth/updateUser',
                        [this.newRealName, this.newMobilePhone])
                        .then(
                        response => {
                            this.message = response.data.message;
                            this.loading = false;
                            this.successful = true;

                        },
                        error => {
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                            this.loading = false;
                        }
                    );
                }
            })
        },
    }
};
</script>


<style scoped>
.jumbotron {
    padding-top: 20px !important;
    padding-bottom: 15px !important;
}

.card-container.card {
    max-width: 600px !important;
    padding: 20px 40px;
}

.custom-padding {
    padding: 20px 0px 0px 0px;
}

.align-text-center {
    text-align: center;
}

.card {
    background-color: #ffffff;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    border: none;
}
</style>
