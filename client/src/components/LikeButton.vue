<template>
  <div class="like">
    <input type="checkbox" id="like" v-model="isLiked" />
    <label for="like" class="like__label"
      ><i
        ><font-awesome-icon
          :icon="[`${iconLike}`, 'heart']"
        ></font-awesome-icon></i
    ></label>
  </div>
</template>

<script>
export default {
  name: "LikeButton",
  props: ["userId", "photoId"],
  data() {
    return {
      isLiked: false
    };
  },
  computed: {
    iconLike() {
      return this.isLiked ? "fa" : "far";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_like-button.scss";
</style>
