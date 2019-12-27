<template>
  <form class="form" enctype="application/x-www-form-urlencoded" method="POST">
    <div class="form__field">
      <FullName
        :inputData.sync="formData.fullName"
        :required="false"
        :placeholder="'Ваше полное имя'"
        :fieldName="'Имя'"
      />
    </div>
    {{ formData.fullName }}
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
    <button
      @submit="sendFormData"
      class="button-submit form__submit"
      type="submit"
    >
      Регистрация
    </button>
    {{ error }}
  </form>
</template>

<script>
import FullName from "../form/InputText";
import Username from "../form/InputLogin";
import Password from "../form/InputPassword";
import AuthenticationService from "../../services/AuthenticationService";

export default {
  name: "FormRegistration",
  components: {
    FullName,
    Username,
    Password
  },
  data() {
    return {
      formData: {
        fullName: "",
        username: "",
        password: "",
        repeatPassword: ""
      },
      error: null
    };
  },
  methods: {
    async sendFormData() {
      try {
        let res = await AuthenticationService.register(this.formData);
        console.log(res);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
