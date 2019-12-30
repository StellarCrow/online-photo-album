<template>
  <div class="form-group">
    <label :for="inputId">{{ fieldName }}</label>
    <input
      v-model="password"
      type="password"
      class="input-text"
      :id="inputId"
      :required="required"
      :placeholder="placeholder"
      maxlength="50"
      @keyup="validation"
    />
    <span class="input-warning">{{ warning }}</span>
  </div>
</template>

<script>
import validator from "../../utils/validation";

export default {
  name: "InputPassword",
  props: {
    fieldName: String,
    required: Boolean,
    placeholder: String,
    inputId: String,
    passwordCompare: String
  },
  data() {
    return {
      password: "",
      warning: ""
    };
  },
  methods: {
    validation() {
      let res;
      let validate = new validator();
      if (!this.$props.passwordCompare) {
        res = validate.validatePassword(this.password);
      } else
        res = validate.comparePasswords(
          this.$props.passwordCompare,
          this.password
        );
      if (res === true) {
        this.warning = "";
        this.changeInputStyle(this.$props.inputId, "green");
        this.sendResult(this.password);
      } else {
        this.warning = res;
        this.changeInputStyle(this.$props.inputId, "red");
        this.sendResult("");
      }
    },
    sendResult(str) {
      this.$emit("update:inputData", str);
    },
    changeInputStyle(id, color) {
      document.getElementById(id).style.borderBottomColor = color;
    }
  }
};
</script>

<style lang="scss"></style>
