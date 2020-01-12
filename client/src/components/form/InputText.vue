<template>
  <div class="form-group">
    <label :for="inputId">{{ fieldName }}</label>
    <input
      v-model="text"
      type="text"
      class="input-flat"
      :id="inputId"
      :required="required"
      :placeholder="placeholder"
      maxlength="50"
      @keyup="validation"
    />
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    fieldName: String,
    required: Boolean,
    placeholder: String,
    inputId: String
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    validation() {
      //Validation
      this.sendResult(this.text);
    },
    sendResult(str) {
      this.$emit("update:inputData", str);
    }
  }
};
</script>

<style lang="scss"></style>
