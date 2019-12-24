<template>
  <form action="#" method="post" class="form form-contacts">
    <div class="form__field">
      <InputText
        :fieldName="'Name'"
        :required="true"
        :placeholder="'Ваше имя'"
      />
    </div>
    <div class="form__field">
      Email
    </div>
    <div class="form__field">
      Phone
    </div>
    <div class="form__field">
      Message
    </div>
    <button type="submit" class="button-submit">Отправить</button>
  </form>
</template>

<script>
import InputText from "../form/InputText";

export default {
  name: "FormContactUs",
  components: {
    InputText
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
