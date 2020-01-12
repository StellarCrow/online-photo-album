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
import CarouselCardRegistration from "../components/CarouselCardRegister";

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
          imgName: "cards.png",
          heading: "Online Photo Album",
          subheading: "Тот, кто хранит твои воспоминания..."
        },
        {
          imgName: "woman-with-frame.jpg",
          heading: "Регистрируйся",
          subheading: "Заполни одну небольшую форму",
          content: CarouselCardRegistration
        },
        {
          imgName: "woman-with-frame.jpg",
          heading: "Загружай свои фото",
          subheading: "Поделись творчеством с остальными",
          content: FormLogin
        },
        {
          imgName: "likes.png",
          heading: "Оценивай чужие фотографии",
          subheading: "И получай лайки в ответ"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_home.scss";
</style>
