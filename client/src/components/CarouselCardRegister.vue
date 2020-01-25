<template>
  <div class="card__register-link">
    <img src="../assets/logo/logo.svg" class="card__logo" alt="Logo" />
    <button class="button-registration">
      <router-link to="#registration">Регистрация</router-link>
    </button>
    <span>Есть аккаунт? <router-link to="#login">Войти</router-link></span>
  </div>
</template>

<script>
export default {
  name: "ButtonRegistration",
  data() {
    return {};
  }
};
</script>

<style></style>
