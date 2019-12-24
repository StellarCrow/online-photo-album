<template>
  <div class="form-group">
    <label for="input_phone">Номер телефона</label>
    <input
      v-model="phone"
      type="tel"
      class="input-phone"
      id="input_phone"
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
    required: Boolean
  },
  data() {
    return {
      phone: ""
    };
  }
};
</script>

<style></style>
