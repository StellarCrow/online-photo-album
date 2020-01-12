<template>
  <form action="#" method="post" class="form form-contacts">
    <div class="form__field">
      <label for="contacts__name">Имя</label>
      <input
        type="text"
        id="contacts__name"
        class="input-flat"
        placeholder="Ваше имя"
        required
      />
    </div>
    <div class="form__field">
      <label for="contacts__email">Email</label>
      <input
        type="text"
        id="contacts__email"
        placeholder="email@example.com"
        class="input-flat"
        required
      />
    </div>
    <div class="form__field">
      <label for="contacts__phone">Номер телефона</label>
      <input
        type="tel"
        id="contacts__phone"
        class="input-flat"
        placeholder="+38(xxx)xxx-xx-xx"
        maxlength="17"
        required
      />
    </div>
    <div class="form__field">
      <label for="contacts__textarea">Сообщение</label>
      <textarea
        class="input-flat"
        id="contacts__textarea"
        placeholder="Вопросы/Пожелания..."
        maxlength="500"
        rows="8"
        cols="10"
      />
    </div>
    <button type="submit" class="button-submit form__submit">Отправить</button>
  </form>
</template>

<script>
export default {
  name: "FormContactUs",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../styles/components/_forms.scss";
</style>
