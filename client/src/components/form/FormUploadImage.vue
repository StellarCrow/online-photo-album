<template>
  <form
    autocomplete="off"
    @submit.prevent="sendForm()"
    class="form-upload form"
  >
    <div class="form__group">
      <div class="form__field">
        <label for="file" class="form__file-label">Выберите файл</label>
        <input
          type="file"
          id="file"
          accept=".jpg, .jpeg"
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
          class="input-flat"
          maxlength="500"
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
          class="input-flat"
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
            class="input-flat"
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
          class="input-flat"
          minlength="1"
          maxlength="20"
          v-model="tagInput"
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
      <div
        class="form__error"
        data-aos="zoom-in"
        data-aos-duration="500"
        data-aos-once="true"
        v-if="error"
      >
        {{ error }}
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
      error: "",
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
        let size = imageFile.size / maxSize / 1024;

        if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            "Your file is too big! Please select an image under 5MB";
        } else {
          // turn file into image URL
          let imageURL = URL.createObjectURL(imageFile);
          this.errorText = "";
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
      if (str) this.formData.tags.push(str);
      this.tagInput = "";
    },
    deleteTag(index) {
      this.formData.tags.splice(index, 1);
    },
    async sendForm() {
      if (this.isAlbumsExist && this.newAlbum !== "") {
        this.formData.album = this.newAlbum;
      }
      //create FormData for sendind photo info to the server
      let data = new FormData();
      for (let key in this.formData) {
        data.append(key, this.formData[key]);
      }

      //sending data
      try {
        let res = await PhotosService.uploadImage(data);
        if (res.data.success) {
          this.$router.push({
            path: `/users/${this.$store.getters.userId}`
          });
        }
      } catch (err) {
        this.error = err.response.data.msg;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/_forms.scss";
</style>
