<template>
  <section class="explore">
    <input type="checkbox" id="options_button" hidden />
    <div class="explore__menu">
      <MenuOptions
        @options="updateFilters"
        :idForCloseLabel="'options_button'"
      />
    </div>
    <div class="explore__content">
      <div class="explore__settings">
        <!-- <div class="explore__search"> -->
        <input
          type="text"
          class="input-flat explore__search"
          name="search-input"
          id="explore__search"
          v-model="exploreInputSearch"
          placeholder="Найти..."
          @keydown.enter.prevent="sendRequest()"
        />
        <!-- </div> -->
        <label for="options_button" class="explore__filters">
          <i
            ><font-awesome-icon :icon="['fa', 'sliders-h']"></font-awesome-icon
          ></i>
        </label>
      </div>
      <section>
        <Tabs>
          <Tab :name="`Фотографии (${totalPhotos})`" :selected="true">
            <Pagination :pager="pager.photos"
              ><PhotoGallery :images="photos"></PhotoGallery
            ></Pagination>
          </Tab>
          <Tab :name="`Пользователи (${totalUsers})`">
            <Pagination :pager="pager.users">
              <UsersList :users="users"></UsersList>
            </Pagination>
          </Tab>
          <Tab :name="`Альбомы (${totalAlbums})`">
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
import Pagination from "../components/Pagination";
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
    UsersList,
    Pagination
  },
  data() {
    return {
      photos: [],
      albums: [],
      users: [],
      exploreInputSearch: this.query,
      options: {
        filter: "",
        sorting: "",
        page: ""
      },
      pager: {},
      totalPhotos: 0,
      totalUsers: 0,
      totalAlbums: 0,
      isMenuOpened: true
    };
  },
  methods: {
    formatString() {
      return this.exploreInputSearch.trim().toLowerCase();
    },
    async sendRequest() {
      let res = await SearchService.explorePhotos(
        this.formatString(this.exploreInputSearch),
        this.options.filter,
        this.options.sorting,
        this.options.page
      );
      if (res.data.success) {
        this.photos = res.data.photos;
        this.albums = res.data.albums;
        this.users = res.data.users;
        this.pager.users = res.data.pagerUsers;
        this.pager.albums = res.data.pagerAlbums;
        this.pager.photos = res.data.pagerPhotos;
        this.totalPhotos = res.data.pagerPhotos.totalItems;
        this.totalAlbums = res.data.pagerAlbums.totalItems;
        this.totalUsers = res.data.pagerUsers.totalItems;
      }
    },
    async updateFilters(options) {
      this.options.filter = options.filter;
      this.options.sorting = options.sorting;
      this.options.page = 1;
      this.sendRequest();
    }
  },
  mounted() {
    this.sendRequest();
  },
  watch: {
    "$route.query.page": {
      immediate: true,
      async handler(page) {
        page = parseInt(page) || 1;
        this.options.page = page;
        this.sendRequest();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_explore-photos.scss";
</style>
