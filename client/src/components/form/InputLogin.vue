<template>
  <div class="form-group">
    <label :for="inputId">{{ fieldName }}</label>
    <input
      v-model="text"
      type="text"
      class="input-text"
      :id="inputId"
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
    placeholder: String,
    inputId: String
  },
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style lang="scss"></style>
