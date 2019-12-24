<template>
  <div class="form-group">
    <label for="textarea">{{ fieldName }}</label>
    <textarea
      v-model="textarea"
      type="tel"
      class="input-phone"
      id="textarea"
      :required="required"
      placeholder="Вопросы/Пожелания..."
      maxlength="500"
      rows="8"
      cols="10"
    />
  </div>
</template>

<script>
export default {
  name: "InputTextArea",
  props: {
    required: Boolean,
    fieldName: String
  },
  data() {
    return {
      textarea: ""
    };
  }
};
</script>

<style></style>
