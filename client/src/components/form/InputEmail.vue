<template>
  <div class="form-group">
    <label :for="inputId">Email</label>
    <input
      v-model="email"
      type="text"
      class="input-email"
      :id="inputId"
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
    required: Boolean,
    inputId: String
  },
  data() {
    return {
      email: ""
    };
  }
};
</script>

<style></style>
