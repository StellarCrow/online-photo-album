<template>
  <div class="photo">
    <div class="photo__image">
      <img :src="`${publicPath}uploads/${photo.link}`" alt="Photo" />
    </div>

    <div class="photo__details details">
      <div class="details__header">
        <i class="details__icon"
          ><font-awesome-icon :icon="['fa', 'user']"></font-awesome-icon
        ></i>
        <router-link class="details__link" :to="`/users/${user._id}`">{{
          user.username
        }}</router-link>
      </div>
      <div class="details__content">
        <p class="details__description" v-if="photo.description">
          {{ photo.description }}
        </p>
        <div class="details__likes">
          <LikeButton
            :photoId="imageId"
            :userId="this.$store.getters.userId"
          ></LikeButton>
          {{ totalLikesCount }}
        </div>

        <div class="details__tags" v-if="photo.tags && photo.tags.length > 0">
          <ul class="taglist">
            <li
              class="taglist__item"
              v-for="(tag, index) in photo.tags"
              :key="index"
            >
              <router-link :to="`/photos/s/${tag}`" class="taglist__link">{{
                tag
              }}</router-link>
            </li>
          </ul>
        </div>
        <span class="details__date">
          {{
            photo.date &&
              photo.date
                .replace("-", ".")
                .split("T")[0]
                .replace("-", ".")
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import PhotosService from "../services/PhotosService";
import LikeButton from "../components/LikeButton";
import { mapGetters } from "vuex";

export default {
  name: "ImageComponent",
  props: ["imageId", "userId"],
  components: { LikeButton },
  data() {
    return {
      photo: {},
      user: {},
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapGetters(["totalLikesCount"])
  },
  async mounted() {
    let res = await PhotosService.getPhoto(this.imageId);
    if (res.data.success) {
      this.photo = res.data.photo;
      this.user = res.data.photo.user;
      // this.likesCount = res.data.likesCount;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_image-component.scss";
</style>
