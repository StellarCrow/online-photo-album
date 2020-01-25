<template>
  <div class="section">
    <h3 class="section__header">"{{ name }}"</h3>
    <ImageGallery :lazyLoading="true" :images="photos" />
  </div>
</template>

<script>
import ImageGallery from "../components/ImageGallery";
import PhotosService from "../services/PhotosService";

export default {
  name: "AlbumPage",
  components: {
    ImageGallery
  },
  data() {
    return {
      name: "",
      photos: []
    };
  },
  async mounted() {
    let userId = this.$route.params.id;
    let albumId = this.$route.params.aid;
    let res = await PhotosService.getUserAlbum(userId, albumId);
    if (res.data.success) {
      this.photos = res.data.album.photos;
      this.name = res.data.album.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 5% 0;

  &__header {
    font-size: 2em;
    text-align: center;
    color: $text-color--dark;
    margin-bottom: 3%;
  }
}
</style>
