<template>
  <div class="carousel">
    <ArrowButton
      class="carousel__arrow carousel__arrow--left"
      arrowType="left"
      @click.native="showPrevElement"
    />

    <transition-group
      tag="div"
      class="carousel__slider"
      name="card"
      mode="out-in"
    >
      <CarouselCard
        :object="currentElement"
        :index="currentElementIndex"
        :key="currentElementIndex"
      />
    </transition-group>

    <ArrowButton
      class="carousel__arrow carousel__arrow--right"
      arrowType="right"
      @click.native="showNextElement"
    />
    <Indicators
      :elements="this.cards"
      :currentElementIndex="this.currentElementIndex"
      :showElement="this.showElement"
    />
  </div>
</template>

<script>
import CarouselCard from "./CarouselCard";
import Indicators from "./CarouselIndicators";
import ArrowButton from "./CarouselArrowButton";

export default {
  name: "Carousel",
  props: {
    cards: Array
  },
  components: { CarouselCard, Indicators, ArrowButton },
  data() {
    return {
      currentElementIndex: 0,
      interval: ""
    };
  },
  computed: {
    currentElement() {
      return this.cards[this.currentElementIndex];
    },
    reachedMaxLeft() {
      return this.currentElementIndex === 0;
    },
    reachedMaxRight() {
      return this.currentElementIndex === this.cards.length - 1;
    }
  },
  methods: {
    showNextElement() {
      if (this.reachedMaxRight) {
        this.currentElementIndex = 0;
        return;
      }
      this.currentElementIndex++;
    },
    showPrevElement() {
      if (this.reachedMaxLeft) {
        this.currentElementIndex = this.cards.length - 1;
        return;
      }
      this.currentElementIndex--;
    },
    showElement(elementIndex) {
      this.currentElementIndex = elementIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_carousel-base.scss";
</style>
