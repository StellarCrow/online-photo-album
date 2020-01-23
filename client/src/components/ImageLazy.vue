<template>
  <img
    :data-src="lazySrc"
    :class="imgClass"
    :style="{ backgroundColor: backgroundColor }"
    alt="lazy-image"
  />
</template>

<script>
import lozad from "lozad";

export default {
  name: "ImageLazy",
  props: {
    lazySrc: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "#5e6e4a"
    },
    imgClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    const setLoadingState = () => {
      this.loading = false;
    };
    this.$el.addEventListener("load", setLoadingState);

    this.$once("hook:destroyed", () => {
      this.$el.removeEventListener("load", setLoadingState);
    });

    const observer = lozad(this.$el);
    observer.observe();
  }
};
</script>

<style></style>
