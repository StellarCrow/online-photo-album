<template>
  <form enctype="multipart/form-data" class="form-upload form">
    <div class="form__group">
      <div class="form__field">
        <label for="desc">Описание фото</label>
        <input type="text" id="desc" placeholder="Описание фото" />
      </div>
    </div>
    <div class="form__group"></div>
  </form>
</template>

<script>
export default {
  name: "FormUploadImage",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
