<template>
  <ul class="carousel__indicators">
    <li
      v-for="(_, index) in elements"
      :key="index"
      class="carousel__indicator"
      :class="{
        'carousel__indicator--selected': currentElementIndex === index
      }"
      @click="showElement(index)"
    >
      <!-- <button class="btn-indicator" @click="showElement(index)"></button> -->
    </li>
  </ul>
</template>

<script>
export default {
  name: "Indicators",
  props: {
    elements: Array,
    currentElementIndex: Number,
    showElement: Function
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_carousel-base.scss";
</style>
