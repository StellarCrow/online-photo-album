<template>
  <div class="like">
    <input type="checkbox" id="like" v-model="isLiked" />
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
    return {
      isLiked: false,
      payload: {
        imageId: this.photoId,
        userId: this.userId
      }
    };
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
      if (this.isLiked) {
        this.deleteLike(this.payload);
      } else this.setLike(this.payload);
    },
    getStatus() {
      this.getPhotoLikeStatus(this.payload);
      this.isLiked = this.likeStatus;
    }
  },
  mounted() {
    console.log("In mounted");
    this.getStatus();
    // this.$store.dispatch("getPhotoLikeStatus", this.photoId, this.userId);
    // this.getPhotoLikeStatus(this.photoId, this.userId);
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_like-button.scss";
</style>
