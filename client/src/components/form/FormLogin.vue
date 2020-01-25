<template>
  <form class="form" @submit="loginUser">
    <div class="form__field">
      <label for="login_username">Username</label>
      <input
        class="input-round"
        type="text"
        v-model="formData.username"
        placeholder="Username"
        id="login_username"
        required
      />
    </div>
    <div class="form__field">
      <label for="login_password">Password</label>
      <input
        class="input-round"
        type="password"
        v-model="formData.password"
        placeholder="*****"
        id="login_password"
        required
      />
    </div>
    <div
      class="form__error"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-once="true"
      v-if="error"
    >
      {{ error }}
    </div>
    <div class="form__field form__field--center">
      <button class="button-submit button-submit--green" type="submit">
        Войти
      </button>
    </div>
    <div class="form__field form__field--center">
      <span class="form__text"
        >Нет аккаунта?
        <router-link to="#registration">Зарегистрироваться</router-link></span
      >
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormLogin",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      error: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let formUser = {
        username: this.formData.username.toLowerCase(),
        password: this.formData.password
      };
      this.login(formUser)
        .then(res => {
          if (res.data.success) {
            this.$router.push(`/users/${this.user._id}`);
          }
        })
        .catch(err => {
          this.error = err.response.data.msg;
        });
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
