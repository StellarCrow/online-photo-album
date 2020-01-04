<template>
  <form enctype="multipart/form-data" class="form-upload form">
    <div class="form__group">
      <div class="form__field">
        <label for="file"></label>
        <input
          type="file"
          id="file"
          accept=".jpg, .jpeg, .png"
          required
          @change="onFileChange($event.target.files)"
        />
        <span
          ><strong>{{ errorText }}</strong></span
        >
      </div>
      <div v-if="image !== null" class="form__filed">
        <img class="form__image-preview" :src="image" alt="Ваше изображение" />
      </div>
    </div>
    <div class="form__group">
      <div class="form__field">
        <label for="desc">Описание фото</label>
        <input type="text" id="desc" placeholder="Описание фото" />
      </div>
      <div class="form__field">
        <label for="album">Добавить фотографию в альбом: </label>
        <select name="album" id="album">
          <option value="">Список альбомов</option>
          <option value="default" selected>Без альбома</option>
        </select>
      </div>
      <div class="form__field">
        <input
          type="checkbox"
          name="add-album"
          id="add_album"
          v-model="isAddAlbumChecked"
        />
        <label for="add_album">Добавить альбом...</label>
        <div v-show="isAddAlbumChecked">
          <label for="new_album">Добавить альбом:</label>
          <input
            type="text"
            maxlength="30"
            id="new_album"
            placeholder="Название нового альбома..."
          />
        </div>
      </div>
      <div class="form__field">
        <label for="tags">Добавить теги:</label>
        <input type="text" name="tags" id="tags" required />
      </div>
      <div class="form__tags">
        <ul class="taglist">
          list
        </ul>
      </div>
      <button class="button-submit">Загрузить фото</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormUploadImage",
  data() {
    return {
      isAddAlbumChecked: false,
      errorText: "",
      errorDialog: null,
      image: null,
      maxSize: 5120,
      formData: {
        imageFile: null,
        description: "",
        album: "",
        tags: [],
        userId: this.$store.getters.userId
      }
    };
  },
  methods: {
    onFileChange(file) {
      const { maxSize } = this;
      let imageFile = file[0];

      // check if user actually selected a file
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize;
        if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            "Your file is too big! Please select an image under 5MB";
        } else {
          // turn file into image URL
          console.log(imageFile);
          let imageURL = URL.createObjectURL(imageFile);
          this.formData.imageFile = imageFile;
          this.image = imageURL;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
