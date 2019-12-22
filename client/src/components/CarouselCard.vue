<template>
  <div class="card">
    <div
      class="card__header"
      :style="{
        background: `url(require('../assets/images/${object.imgName}'))`
      }"
    >
      <div class="card__heading">
        <h2>{{ object.heading }}</h2>
      </div>
      <div class="card__subheading">{{ object.subheading }}</div>
    </div>
    <div class="card__content"></div>
  </div>
</template>

<script>
export default {
  name: "CarouselCard",
  props: {
    object: Object,
    index: Number
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_carousel-card.scss";
</style>
