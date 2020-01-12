<template>
  <section class="images">
    <div class="images__container">
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
        <img
          :src="`${publicPath}uploads/${image.link}`"
          alt="Photo"
          class="image__img"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ImageGallery",
  props: {
    images: {
      type: Array,
      required: true
    }
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
