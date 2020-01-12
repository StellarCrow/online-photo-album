<template>
  <div class="card">
    <div class="card__header">
      <div class="card__heading">
        <h2>{{ object.heading }}</h2>
      </div>
      <div class="card__subheading">{{ object.subheading }}</div>
    </div>
    <div
      class="card__content"
      :style="{
        background: `url(${publicPath}images/carousel/${object.imgName}) no-repeat center top / cover`
      }"
    >
      <div :is="object.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselCard",
  props: {
    object: Object,
    index: Number
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_carousel-card.scss";
</style>
