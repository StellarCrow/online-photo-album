<template>
  <div class="form-group">
    <label for="input_email">Email</label>
    <input
      v-model="email"
      type="text"
      class="input-email"
      id="input_email"
      :required="required"
      placeholder="myemail@example.com"
      maxlength="50"
    />
  </div>
</template>

<script>
export default {
  name: "InputEmail",
  props: {
    required: Boolean
  },
  data() {
    return {
      email: ""
    };
  }
};
</script>

<style></style>
