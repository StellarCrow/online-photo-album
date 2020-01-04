<template>
  <section class="upload">
    <div class="container">
      <h2>Загрузить изображение</h2>
      <div class="upload__form">
        <FormUpload></FormUpload>
      </div>
    </div>
  </section>
</template>

<script>
import FormUpload from "../components/form/FormUploadImage";
export default {
  name: "UploadImage",
  components: {
    FormUpload
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_upload-image.scss";
</style>
