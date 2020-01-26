<template>
  <span class="like" @click="changeLike">
    <i
      ><font-awesome-icon :icon="[`${iconLike}`, 'heart']"></font-awesome-icon
    ></i>
  </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LikeButton",
  props: ["userOwner", "photoId"],
  data() {
    return {
      payload: {
        imageId: this.photoId,
        userId: this.userOwner
      }
    };
  },
  computed: {
    ...mapGetters(["likeStatus", "totalLikesCount", "isLoggedIn", "userId"]),
    iconLike() {
      if (!this.isLoggedIn) return "far";
      return this.likeStatus ? "fa" : "far";
    }
  },
  methods: {
    ...mapActions(["getPhotoLikeStatus", "setLike", "deleteLike"]),
    changeLike() {
      if (!this.isLoggedIn) {
        return this.$router.push("/#login");
      }
      this.payload.userId = this.userId;
      if (!this.isLoggedIn) return;
      if (this.likeStatus) {
        this.deleteLike(this.payload);
      } else {
        this.setLike(this.payload);
      }
    },
    getStatus() {
      this.getPhotoLikeStatus(this.payload);
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_like-button.scss";
</style>
