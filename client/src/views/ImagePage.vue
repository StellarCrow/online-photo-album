<template>
  <section>
    <ImageComponent :imageId="photoId" :userId="userId"></ImageComponent>
  </section>
</template>

<script>
import ImageComponent from "../components/ImageComponent";

export default {
  name: "ImagePage",
  components: {
    ImageComponent
  },
  data() {
    return {
      photoId: this.$route.params.pid,
      userId: this.$route.params.id,
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style lang="scss" scoped></style>
