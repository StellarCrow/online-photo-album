<template>
  <section class="images">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="images__image-wrapper"
    >
      <img
        :src="`${publicPath}uploads/${image.link}`"
        alt="Photo"
        class="images__img"
      />
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
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_image-gallery.scss";
</style>
