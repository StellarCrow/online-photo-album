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
          <Tab :name="`Фотографии (${totalPhotos})`" :selected="true">
            <Pagination :pager="pager.photos"
              ><PhotoGallery :images="photos"></PhotoGallery
            ></Pagination>
          </Tab>
          <Tab :name="`Пользователи (${users.length})`">
            <Pagination :pager="pager.users">
              <UsersList :users="users"></UsersList>
            </Pagination>
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
        sorting: ""
      },
      pager: {},
      totalPhotos: 0
    };
  },
  methods: {
    formatString() {
      return this.exploreInputSearch.trim().toLowerCase();
    },
    async searchQuery() {
      let res = await SearchService.searchAllByQuery(
        this.formatString(this.exploreInputSearch)
      );
      if (res.data.success) {
        this.photos = res.data.photos;
        this.albums = res.data.albums;
        this.users = res.data.users;
        this.pager.users = res.data.pagerUsers;
        this.pager.albums = res.data.pagerAlbums;
        this.pager.photos = res.data.pagerPhotos;
        this.totalPhotos = res.data.pagerPhotos.totalItems;
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
  }
  // watch: {
  //   "$route.query.page": {
  //     immediate: true,
  //     handler(page) {
  //       page = parseInt(page) || 1;
  //       console.log(page);

  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_explore-photos.scss";
</style>
