<template>
  <form class="form" @submit.prevent="sendFormData" autocomplete="off">
    <div class="form__field">
      <label for="register_fullname">Имя</label>
      <input
        type="text"
        name="name"
        id="register_fullname"
        class="input-flat"
        placeholder="Полное имя"
        minlength="1"
        maxlength="25"
        v-model="formData.fullname.data"
        @keyup="validation('fullname')"
        pattern="(([A-Za-z]+\s?)|([\u0400-\u04FF]+'?\s?))+"
        :required="formData.fullname.required"
      />
      <span class="input-warning" v-if="formData.fullname.warning">{{
        formData.fullname.warning
      }}</span>
    </div>
    <div class="form__field">
      <label for="register_username">Username</label>
      <input
        type="text"
        id="register_username"
        class="input-flat"
        placeholder="myuniqueusername"
        minlength="2"
        maxlength="20"
        v-model="formData.username.data"
        pattern="^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
        @keyup="validation('username')"
        @blur="checkUsername"
        :required="formData.username.required"
      />
      <span class="input-warning" v-if="formData.username.warning">{{
        formData.username.warning
      }}</span>
    </div>
    <div class="form__field">
      <label for="register_password">Пароль</label>
      <input
        type="password"
        placeholder="*****"
        id="register_password"
        class="input-flat"
        v-model="formData.password.data"
        @keyup="validation('password')"
        :required="formData.password.required"
      />
      <span class="input-warning" v-if="formData.password.warning">{{
        formData.password.warning
      }}</span>
    </div>
    <div class="form__field">
      <label for="register_repeat">Повторите пароль</label>
      <input
        type="password"
        placeholder="*****"
        id="register_repeat"
        class="input-flat"
        v-model="formData.passwordRepeat.data"
        @keyup="validation('passwordRepeat')"
        :required="formData.passwordRepeat.required"
      />
      <span class="input-warning" v-if="formData.passwordRepeat.warning">{{
        formData.passwordRepeat.warning
      }}</span>
    </div>
    <div class="form__error" v-if="error">{{ error }}</div>
    <button class="button-submit form__submit" type="submit">
      Регистрация
    </button>
  </form>
</template>

<script>
import UsersService from "../../services/UsersService";
import { mapActions } from "vuex";
import validator from "../../utils/validation";

export default {
  name: "FormRegistration",
  data() {
    return {
      formData: {
        username: {
          data: "",
          warning: "",
          isValid: false,
          required: true,
          isExist: true
        },
        fullname: {
          data: "",
          warning: "",
          isValid: false,
          required: false
        },
        password: {
          data: "",
          warning: "",
          isValid: false,
          required: true
        },
        passwordRepeat: {
          data: "",
          warning: "",
          isValid: false,
          required: true
        }
      },
      validator: null,
      error: null
    };
  },
  mounted() {
    this.validator = new validator();
  },
  computed: {
    usernameLowerCase() {
      return this.formData.username.data.toLowerCase();
    }
  },
  methods: {
    ...mapActions(["register"]),
    async sendFormData() {
      if (this.isFormDataValid()) {
        let data = {
          username: this.formData.username.data,
          fullName: this.formData.fullname.data,
          password: this.formData.password.data,
          passwordRepeat: this.formData.passwordRepeat.data
        };
        this.register(data)
          .then(res => {
            if (res.data.success) {
              this.$router.push(`/users/${this.$store.getters.user._id}`);
            }
          })
          .catch(err => {
            this.error = err.response.data.msg;
          });
      }
    },
    isFormDataValid() {
      for (let prop in this.formData) {
        if (this.formData[prop].required && !this.formData[prop].isValid)
          return false;
      }
      return true;
    },
    async checkUsername() {
      if (this.usernameLowerCase === "") return;
      UsersService.checkUsername(this.usernameLowerCase)
        .then(res => {
          if (res.status) {
            this.formData.username.warning = "";
            this.formData.username.isExist = false;
          }
        })
        .catch(err => {
          this.formData.username.warning = err.response.data.msg;
          this.formData.username.isExist = true;
        });
    },
    validation(field) {
      let res;
      switch (field) {
        case "fullname":
          res = this.validator.validateFullname(this.formData.fullname.data);
          this.formData.fullname.warning = res === true ? "" : res;
          this.formData.fullname.isValid = res === true ? true : false;
          break;
        case "username":
          res = this.validator.validateUsername(this.usernameLowerCase);
          this.formData.username.warning = res === true ? "" : res;
          this.formData.username.isValid = res === true ? true : false;
          break;
        case "password":
          res = this.validator.validatePassword(this.formData.password.data);
          this.formData.password.warning = res === true ? "" : res;
          this.formData.password.isValid = res === true ? true : false;
          break;
        case "passwordRepeat":
          res = this.validator.comparePasswords(
            this.formData.password.data,
            this.formData.passwordRepeat.data
          );
          this.formData.passwordRepeat.warning = res === true ? "" : res;
          this.formData.passwordRepeat.isValid = res === true ? true : false;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
