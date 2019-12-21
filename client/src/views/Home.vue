<template>
  <div class="home">
    <Carousel :cards="cards" />
  </div>
</template>

<script>
import Carousel from "../components/CarouselBase";

export default {
  name: "home",
  components: {
    Carousel
  },
  data() {
    return {
      cards: [
        {
          imgName: "bg-footer.jpg",
          heading: "Online Photo Album",
          subheading: "Тот, кто хранит твои воспоминания..."
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
