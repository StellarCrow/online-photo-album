<template>
  <form
    autocomplete="off"
    enctype="multipart/form-data"
    @submit.prevent="sendForm()"
    class="form-upload form"
  >
    <div class="form__group">
      <div class="form__field">
        <label for="file" class="form__file-label">Выберите файл</label>
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
        <input
          type="text"
          id="desc"
          placeholder="Описание фото"
          v-model="formData.description"
        />
      </div>
      <div class="form__field">
        <label for="album">Альбом: </label>
        <select name="album" v-model="formData.album" id="album">
          <option
            v-for="(album, index) in albums"
            :key="index"
            :value="album._id"
            >{{ album.name }}</option
          >
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
          <!-- <label for="new_album">Добавить альбом:</label> -->
          <input
            type="text"
            maxlength="30"
            v-model="formData.newAlbum"
            id="new_album"
            placeholder="Название нового альбома..."
          />
        </div>
      </div>
      <div class="form__field">
        <label for="tags">Добавить теги:</label>
        <input
          type="text"
          name="tags"
          id="tags"
          v-model="tagInput"
          minlength="1"
          @keydown.enter.prevent="updateList()"
        />
      </div>
      <div class="form__tags">
        <ul class="taglist">
          <li
            class="taglist__item"
            v-for="(tag, index) in formData.tags"
            :key="index"
          >
            {{ tag }}
            <i class="taglist__icon" @click="deleteTag(index)"
              ><font-awesome-icon :icon="['fa', 'times']"></font-awesome-icon
            ></i>
          </li>
        </ul>
      </div>
      <button type="submit" class="button-submit">Загрузить фото</button>
    </div>
  </form>
</template>

<script>
import PhotosService from "../../services/PhotosService";
export default {
  name: "FormUploadImage",
  data() {
    return {
      albums: [],
      tagInput: "",
      isAddAlbumChecked: false,
      errorText: "",
      errorDialog: null,
      image: null,
      maxSize: 5120,
      formData: {
        imageFile: null,
        description: "",
        album: "",
        newAlbum: "",
        tags: [],
        userId: this.$store.getters.userId
      }
    };
  },
  async mounted() {
    let res = await PhotosService.getUserAlbums(this.$store.getters.userId);
    if (res.data.success) {
      this.albums = res.data.albums;
      this.formData.album = this.albums[0]._id;
    }
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
          let imageURL = URL.createObjectURL(imageFile);
          this.formData.imageFile = imageFile;
          this.image = imageURL;
        }
      }
    },
    updateList() {
      let str = this.tagInput
        .trim()
        .split(" ")
        .join("")
        .toLowerCase();
      this.formData.tags.push(str);
      this.tagInput = "";
    },
    deleteTag(index) {
      this.formData.tags.splice(index, 1);
    },
    async sendForm() {
      if (this.isAlbumsExist && this.newAlbum !== "") {
        this.formData.album = this.newAlbum;
      }
      let data = new FormData();

      for (let key in this.formData) {
        data.append(key, this.formData[key]);
      }
      let res = await PhotosService.uploadImage(data);
      if (res.data.success) {
        this.$router.push(`/users/${this.formData.userId}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
