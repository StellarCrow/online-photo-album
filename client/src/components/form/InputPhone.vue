<template>
  <div class="form-group">
    <label :for="inputId">Номер телефона</label>
    <input
      v-model="phone"
      type="tel"
      class="input-phone"
      :id="inputId"
      :required="required"
      placeholder="+38(xxx)xxx-xx-xx"
      maxlength="17"
    />
  </div>
</template>

<script>
export default {
  name: "InputPhone",
  props: {
    required: Boolean,
    inputId: String
  },
  data() {
    return {
      phone: ""
    };
  }
};
</script>

<style></style>
