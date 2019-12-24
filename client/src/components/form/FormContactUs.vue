<template>
  <form action="#" method="post" class="form form-contacts">
    <div class="form__field">
      <InputText
        :fieldName="'Имя'"
        :required="true"
        :placeholder="'Ваше имя'"
      />
    </div>
    <div class="form__field">
      <InputEmail :required="true" />
    </div>
    <div class="form__field">
      <InputPhone :required="true" />
    </div>
    <div class="form__field">
      <InputTextArea :required="false" :fieldName="'Сообщение'" />
    </div>
    <button type="submit" class="button-submit form__submit">Отправить</button>
  </form>
</template>

<script>
import InputText from "../form/InputText";
import InputEmail from "../form/InputEmail";
import InputPhone from "../form/InputPhone";
import InputTextArea from "../form/InputTextArea";

export default {
  name: "FormContactUs",
  components: {
    InputText,
    InputEmail,
    InputPhone,
    InputTextArea
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
