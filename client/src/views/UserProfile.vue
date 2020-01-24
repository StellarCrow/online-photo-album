<template>
  <div class="userpage">
    <section class="profile">
      <div class="container profile-container">
        <div class="profile__avatar avatar">
          <img
            src="../assets/images/userpage-avatar.svg"
            alt="user-avatar"
            class="avatar__img"
          />
        </div>
        <div class="profile__about">
          <div class="profile__name">{{ name || "Без имени" }}</div>
          <div class="profile__username">@{{ username }}</div>
          <ul class="profile__info statistic">
            <li class="statistic__item">
              Фотографий<span>{{ images.length }}</span>
            </li>
            <li class="statistic__item">
              Альбомов<span>{{ albumsCount }}</span>
            </li>
            <li class="statistic__item">
              <i
                ><font-awesome-icon :icon="['fa', 'heart']"></font-awesome-icon
              ></i>
              поставлено<span>{{ likes }}</span>
            </li>
          </ul>
          <button v-if="isMyPage" @click="uploadImage" class="button-submit">
            Добавить фото
          </button>
        </div>
      </div>
    </section>
    <section>
      <tabs>
        <tab name="Все фото" :selected="true">
          <PhotoGallery
            :lazyLoading="true"
            v-if="images.length > 0"
            :images="images"
          ></PhotoGallery>
          <span v-else>Фотографий пока нет</span>
        </tab>
        <tab name="Альбомы">
          <AlbumsGallery :albums="albums"></AlbumsGallery>
        </tab>
      </tabs>
    </section>
  </div>
</template>

<script>
import UsersService from "../services/UsersService";
import Tabs from "../components/TabsBase";
import Tab from "../components/TabsTab";
import PhotoGallery from "../components/ImageGallery";
import AlbumsGallery from "../components/AlbumsGallery";

export default {
  name: "UserProfile",
  components: {
    Tabs,
    Tab,
    PhotoGallery,
    AlbumsGallery
  },
  data() {
    return {
      name: "",
      username: "",
      isMyPage: false,
      images: [],
      likes: 0,
      albums: [],
      albumsCount: 0
    };
  },
  computed: {
    userPageId() {
      return this.$route.params.id;
    }
  },
  methods: {
    uploadImage() {
      this.$router.push(`/uploadImage`);
    },
    async getUser() {
      if (this.userPageId === this.$store.getters.userId) {
        this.isMyPage = true;
      }
      let res = await UsersService.getUser(this.userPageId);
      if (res.data.success) {
        this.username = res.data.user.username;
        this.name = res.data.user.name;
        this.images = res.data.photos;
        this.likes = res.data.likes;
        this.albumsCount = res.data.albumsCount;
        this.albums = res.data.albums;
      }
    },
    async getAlbums() {
      let res = await UsersService.getAlbums(this.userPageId);
      if (res.success) {
        this.albums = res.data.albums;
      }
    }
  },
  mounted() {
    this.getUser();
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      async handler() {
        this.getUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_profile.scss";
</style>
