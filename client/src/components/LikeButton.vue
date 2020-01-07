<template>
  <div class="like">
    <input type="checkbox" id="like" v-model="likeStatus" />
    <label for="like" class="like__label" @click="changeLike"
      ><i
        ><font-awesome-icon
          :icon="[`${iconLike}`, 'heart']"
        ></font-awesome-icon></i
    ></label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LikeButton",
  props: ["userId", "photoId"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["likeStatus", "totalLikesCount"]),
    iconLike() {
      return this.isLiked ? "fa" : "far";
    }
  },
  methods: {
    ...mapActions(["getPhotoLikeStatus", "setLike", "deleteLike"]),
    changeLike() {
      if (this.likeStatus) {
        this.deleteLike(this.photoId, this.userId);
      } else this.setLike(this.photoId, this.userId);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_like-button.scss";
</style>
