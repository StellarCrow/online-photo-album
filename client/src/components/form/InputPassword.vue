<template>
  <div class="form-group">
    <label for="input_password">{{ fieldName }}</label>
    <input
      v-model="password"
      type="password"
      class="input-text"
      id="input_password"
      :required="required"
      :placeholder="placeholder"
      maxlength="50"
    />
  </div>
</template>

<script>
export default {
  name: "InputLogin",
  props: {
    fieldName: String,
    required: Boolean,
    placeholder: String
  },
  data() {
    return {
      password: ""
    };
  }
};
</script>

<style lang="scss"></style>
