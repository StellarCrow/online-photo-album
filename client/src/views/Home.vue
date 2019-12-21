<template>
  <div class="home">
    <TheMenu></TheMenu>
    <Carousel :cards="cards" />
  </div>
</template>

<script>
import TheMenu from "../components/TheMenu";
import Carousel from "../components/CarouselBase";

export default {
  name: "home",
  components: {
    TheMenu,
    Carousel
  },
  data() {
    return {
      cards: [
        {
          imgName: "bg-footer3.jpg",
          heading: "Online Photo Album",
          subheading: "Тот, кто хранит твои воспоминания..."
        },
        {
          imgName: "../assets/images/bg-footer3.jpg",
          heading: "Регистрируйся",
          subheading: "Заполни одну небольшую форму"
        },
        {
          imgName: "@/assets/images/bg-footer3.jpg",
          heading: "Загружай свои фото",
          subheading: "Заполни одну небольшую форму"
        },
        {
          imgName: "../assets/images/bg-footer3.jpg",
          heading: "Мобильно",
          subheading: "Заполни одну небольшую форму"
        }
      ]
    };
  }
};
</script>
