<template>
  <form class="form" @submit="loginUser">
    <div class="form__field">
      <label for="login_username">Username</label>
      <input
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
        type="password"
        v-model="formData.password"
        placeholder="*****"
        id="login_password"
        required
      />
    </div>
    <button class="button-submit" type="submit">
      Войти
    </button>
    <div class="form__field">
      <span>Нет аккаунта? <a href="#registration">Зарегистрироваться</a></span>
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
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let formUser = {
        username: this.formData.username,
        password: this.formData.password
      };
      this.login(formUser)
        .then(res => {
          if (res.data.success) {
            this.$router.push(`/users/${this.user._id}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss"></style>
