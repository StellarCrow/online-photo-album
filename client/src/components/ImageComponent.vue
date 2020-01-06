<template>
  <div class="photo">
    <div class="photo__image">
      <img :src="`${publicPath}uploads/${photo.link}`" alt="Photo" />
    </div>

    <div class="photo__details details">
      <div class="details__header">
        <span class="details__icon"
          ><font-awesome-icon :icon="['fa', 'user']"></font-awesome-icon
        ></span>
        <router-link class="details__link" :to="`/users/${user._id}`">{{
          user.username
        }}</router-link>
      </div>
      <div class="details__content">
        <p class="details__description" v-if="photo.description">
          {{ photo.description }}
        </p>
        <div class="details__tags" v-if="photo.tags && photo.tags.length > 0">
          <ul class="taglist">
            <li
              class="taglist__item"
              v-for="(tag, index) in photo.tags"
              :key="index"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
        <div class="details__likes"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotosService from "../services/PhotosService";

export default {
  name: "ImageComponent",
  props: ["imageId", "userId"],
  data() {
    return {
      photo: {},
      user: {},
      publicPath: process.env.BASE_URL
    };
  },
  async mounted() {
    let res = await PhotosService.getPhoto(this.imageId);
    if (res.data.success) {
      this.photo = res.data.photo;
      this.user = res.data.photo.user;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_image-component.scss";
</style>
