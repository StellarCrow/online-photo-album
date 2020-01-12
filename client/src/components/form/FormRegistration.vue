<template>
  <form class="form" @submit="sendFormData" autocomplete="off">
    <div class="form__field">
      <FullName
        :inputData.sync="formData.fullName"
        :required="false"
        :placeholder="'Ваше полное имя'"
        :fieldName="'Имя'"
        :inputId="'register_fullname'"
      />
    </div>
    <div class="form__field">
      <Username
        :inputData.sync="formData.username"
        :required="true"
        :placeholder="'Уникальное имя-идентификатор'"
        :fieldName="'Username'"
        :inputId="'register_username'"
      />
    </div>
    <div class="form__field">
      <Password
        :inputData.sync="formData.password"
        :required="true"
        :placeholder="'******'"
        :fieldName="'Пароль'"
        :inputId="'register_password'"
      />
    </div>
    <div class="form__field">
      <Password
        :inputData.sync="formData.passwordRepeat"
        :required="true"
        :placeholder="'******'"
        :fieldName="'Повторите пароль'"
        :inputId="'register_reppassword'"
        :passwordCompare="formData.password"
      />
    </div>
    <button class="button-submit form__submit" type="submit">
      Регистрация
    </button>
    {{ error }}
  </form>
</template>

<script>
import FullName from "../form/InputText";
import Username from "../form/InputLogin";
import Password from "../form/InputPassword";
import { mapActions } from "vuex";

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
        passwordRepeat: ""
      },
      error: null
    };
  },
  methods: {
    ...mapActions(["register"]),
    async sendFormData() {
      if (this.checkFormData()) {
        try {
          this.register(this.formData).then(res => {
            if (res.data.success) {
              debugger;
              this.$router.push(`/users/${this.$store.getters.user._id}`);
            }
          });
        } catch (error) {
          this.error = error.response.data.error;
        }
      }
    },
    checkFormData() {
      for (let prop in this.formData) {
        if (this.formData[prop] === "") return false;
      }
      return true;
    },
    validation() {}
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
