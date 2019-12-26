<template>
  <form class="form">
    <div class="form__field">
      <Username
        :required="true"
        :placeholder="'Username'"
        :fieldName="'Username'"
      />
    </div>
    <div class="form__field">
      <Password :required="true" :placeholder="'*****'" :fieldName="'Пароль'" />
    </div>
    <button class="button-submit" type="submit">Войти</button>
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
    return {};
  }
};
</script>

<style lang="scss"></style>
