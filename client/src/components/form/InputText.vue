<template>
  <div class="form-group">
    <label for="input_text">{{ fieldName }}</label>
    <input
      v-model="text"
      type="text"
      class="input-text"
      id="input_text"
      :required="required"
      :placeholder="placeholder"
      maxlength="50"
    />
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    fieldName: String,
    required: Boolean,
    placeholder: String
  },
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style lang="scss"></style>
