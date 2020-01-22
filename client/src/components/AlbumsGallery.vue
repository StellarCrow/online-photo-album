<template>
  <div class="albums">
    <div
      class="album"
      v-for="(album, index) in albums"
      :key="index"
      @click="openAlbum(album)"
    >
      <div class="album__hover">
        <div class="album__name">{{ album.name }}</div>
      </div>
      <div class="album__cover album__cover--horizontal">
        <img
          :src="`${publicPath}uploads/${album.photos[0].link}`"
          alt="album-cover"
          class="album__image"
        />
      </div>
      <div
        class="album__cover album__cover--vertical"
        v-if="album.photos && album.photos.length >= 3"
      >
        <img
          :src="`${publicPath}uploads/${album.photos[1].link}`"
          alt="album-cover"
          class="album__image"
        />
        <img
          :src="`${publicPath}uploads/${album.photos[2].link}`"
          alt="album-cover"
          class="album__image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumsGallery",
  props: {
    albums: {
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
    openAlbum(album) {
      this.$router.push(`/users/${this.$route.params.id}/albums/${album._id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_albums-gallery.scss";
</style>
