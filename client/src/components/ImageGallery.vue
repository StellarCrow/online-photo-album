<template>
  <section class="images" :class="this.className">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="image"
      @click="openImage(image)"
    >
      <div class="image__hover">
        <span class="image__likes">{{ image.likesCount }} </span>
        <i><font-awesome-icon :icon="['fa', 'heart']"></font-awesome-icon></i>
      </div>
      <ImageLazy
        v-if="lazyLoading"
        :lazy-src="`${publicPath}uploads/compressed/${image.link}`"
        :class="'image__img'"
        :backgroundColor="image.colors[0]"
      ></ImageLazy>
      <img
        v-else
        :src="`${publicPath}uploads/compressed/${image.link}`"
        :alt="image.tags[0] || 'photo'"
        class="image__img"
      />
    </div>
  </section>
</template>

<script>
import ImageLazy from "./ImageLazy";

export default {
  name: "ImageGallery",
  props: {
    images: {
      type: Array,
      required: true
    },
    lazyLoading: {
      type: Boolean,
      required: true
    },
    className: String
  },
  components: {
    ImageLazy
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
    openImage(image) {
      this.$router.push(`/users/${image.user._id}/photos/${image._id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_image-gallery.scss";
</style>
