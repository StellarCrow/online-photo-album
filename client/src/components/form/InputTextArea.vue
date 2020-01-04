<template>
  <div class="form-group">
    <label :for="inputId">{{ fieldName }}</label>
    <textarea
      v-model="textarea"
      class="input-phone"
      :id="inputId"
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
    fieldName: String,
    inputId: String
  },
  data() {
    return {
      textarea: ""
    };
  }
};
</script>

<style></style>
