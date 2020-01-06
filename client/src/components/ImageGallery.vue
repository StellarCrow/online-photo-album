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
          <span class="image__likes">{{ image.likes.length }}</span>
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
import PhotosService from "../services/PhotosService";

export default {
  name: "ImageGallery",
  props: ["userId"],
  data() {
    return {
      images: [],
      publicPath: process.env.BASE_URL
    };
  },
  async mounted() {
    let res = await PhotosService.getUserPhotos(this.userId);
    if (res.data.success) {
      this.images = res.data.photos;
    }
  },
  methods: {
    openImage(image) {
      this.$router.push(`/users/${image.user}/photos/${image._id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_image-gallery.scss";
</style>
