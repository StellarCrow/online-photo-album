<template>
  <form class="form">
    <div class="form__field">
      <FullName
        :required="false"
        :placeholder="'Ваше полное имя'"
        :fieldName="'Имя'"
      />
    </div>
    <div class="form__field">
      <Username
        :required="true"
        :placeholder="'Уникальное имя-идентификатор'"
        :fieldName="'Username'"
      />
    </div>
    <div class="form__field">
      <Password
        :required="true"
        :placeholder="'password'"
        :fieldName="'Пароль'"
      />
    </div>
    <div class="form__field">
      <Password
        :required="true"
        :placeholder="'password'"
        :fieldName="'Повторите пароль'"
      />
    </div>
    <button class="button-submit form__submit">Регистрация</button>
  </form>
</template>

<script>
import FullName from "../form/InputText";
import Username from "../form/InputLogin";
import Password from "../form/InputPassword";
export default {
  name: "FormRegistration",
  components: {
    FullName,
    Username,
    Password
  },
  data() {
    return {
      fullName: "",
      username: "",
      password: "",
      repeatPassword: ""
    };
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
