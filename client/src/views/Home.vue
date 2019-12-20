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
      cards: [1, 2, 3, 4, 6]
    };
  }
};
</script>
