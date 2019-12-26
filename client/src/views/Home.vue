<template>
  <div>
    <Carousel :cards="cards" />
    <section class="section section--gray-gradient">
      <div class="container">
        <div class="section__header">
          <h1 class="section__heading">Online Photo Album</h1>
          <p class="section__subheading">
            Твой помощник в хранении и поиске фотографий
          </p>
        </div>
        <div class="section__form" id="registration">
          <FormRegistration />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Carousel from "../components/CarouselBase";
import FormRegistration from "../components/form/FormRegistration";
import FormLogin from "../components/form/FormLogin";

export default {
  name: "home",
  components: {
    Carousel,
    FormRegistration
  },
  data() {
    return {
      cards: [
        {
          imgName: "bg-footer.jpg",
          heading: "Online Photo Album",
          subheading: "Тот, кто хранит твои воспоминания...",
          content: FormLogin
        },
        {
          imgName: "bg-footer.jpg",
          heading: "Регистрируйся",
          subheading: "Заполни одну небольшую форму"
        },
        {
          imgName: "bg-footer.jpg",
          heading: "Загружай свои фото",
          subheading: "Заполни одну небольшую форму"
        },
        {
          imgName: "bg-footer.jpg",
          heading: "Мобильно",
          subheading: "Заполни одну небольшую форму"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_home.scss";
</style>
