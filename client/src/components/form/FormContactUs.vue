<template>
  <form action="#" method="post" class="form form-contacts">
    <div class="form__field">
      <InputText
        :fieldName="'Имя'"
        :required="true"
        :placeholder="'Ваше имя'"
        :inputId="'contacts__name'"
      />
    </div>
    <div class="form__field">
      <InputEmail :required="true" :inputId="'contacts__email'" />
    </div>
    <div class="form__field">
      <InputPhone :required="true" :inputId="'contacts__phone'" />
    </div>
    <div class="form__field">
      <InputTextArea
        :required="false"
        :fieldName="'Сообщение'"
        :inputId="'contacts__textarea'"
      />
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
