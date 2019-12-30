<template>
  <form class="form">
    <div class="form__field">
      <Username
        :required="true"
        :placeholder="'Username'"
        :fieldName="'Username'"
        :inputId="'login_username'"
      />
    </div>
    <div class="form__field">
      <Password
        :required="true"
        :placeholder="'*****'"
        :fieldName="'Пароль'"
        :inputId="'login_password'"
      />
    </div>
    <button class="button-submit" type="submit" @submit="sendForm">
      Войти
    </button>
    <div class="form__field">
      <span>Нет аккаунта? <a href="#registration">Зарегистрироваться</a></span>
    </div>
  </form>
</template>

<script>
import Username from "../form/InputLogin";
import Password from "../form/InputPassword";

export default {
  name: "FormLogin",
  components: {
    Username,
    Password
  },
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    sendForm() {
      console.log("Will be sent to the server");
    }
  }
};
</script>

<style lang="scss"></style>
