<template>
  <section class="explore">
    <div class="explore__menu">
      <MenuOptions @options="updateAll" />
    </div>
    <div class="explore__content">
      <div class="explore__search">
        <input
          type="text"
          class="input-flat"
          name="search-input"
          id="explore__search"
          v-model="exploreInputSearch"
          placeholder="Найти..."
          @keydown.enter.prevent="searchQuery()"
        />
      </div>
      <section>
        <Tabs>
          <Tab :name="`Фотографии (${photos.length})`" :selected="true">
            <PhotoGallery :images="photos"></PhotoGallery>
          </Tab>
          <Tab :name="`Пользователи (${users.length})`">
            <UsersList :users="users"></UsersList>
          </Tab>
          <Tab :name="`Альбомы (${albums.length})`">
            Альбомы
          </Tab>
        </Tabs>
      </section>
    </div>
  </section>
</template>

<script>
import Tabs from "../components/TabsBase";
import Tab from "../components/TabsTab";
import MenuOptions from "../components/MenuOptions";
import PhotoGallery from "../components/ImageGallery";
import UsersList from "../components/UsersList";
import SearchService from "../services/SearchService";

export default {
  name: "ExplorePhotos",
  props: {
    query: {
      default: "",
      type: String
    }
  },
  components: {
    Tabs,
    Tab,
    PhotoGallery,
    MenuOptions,
    UsersList
  },
  data() {
    return {
      photos: [],
      albums: [],
      users: [],
      exploreInputSearch: this.query,
      options: {}
    };
  },
  methods: {
    formatString() {
      return this.exploreInputSearch.trim().toLowerCase();
    },
    async searchQuery(query) {
      let res = await SearchService.searchAllByQuery(this.formatString(query));
      if (res.data.success) {
        this.photos = res.data.photos;
        this.albums = res.data.albums;
        this.users = res.data.users;
      }
    },
    async updateAll(options) {
      let filter = options.filter;
      let sorting = options.sorting;
      let res = await SearchService.filterAndSortAll(
        filter,
        sorting,
        this.exploreInputSearch
      );
      if (res.data.success) {
        this.photos = res.data.photos;
        this.albums = res.data.albums;
        this.users = res.data.users;
      }
    }
  },
  mounted() {
    this.searchQuery(this.exploreInputSearch);
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to.params.query);
  //   this.searchQuery(to.params.query);
  //   next();
  // }
  watch: {
    $route() {
      console.log(this.$route.params.query);
      this.searchQuery(this.$route.params.query);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_explore-photos.scss";
</style>
