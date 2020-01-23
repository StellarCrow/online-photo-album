<template>
  <section class="explore">
    <input type="checkbox" id="options_button" hidden />
    <div class="explore__menu">
      <MenuOptions :idForCloseLabel="'options_button'" />
    </div>
    <div class="explore__content">
      <div class="explore__settings">
        <input
          type="text"
          class="input-flat explore__search"
          name="search-input"
          id="explore__search"
          v-model="exploreInputSearch"
          placeholder="Найти..."
          @keydown.enter.prevent="changeRouter()"
        />
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
      users: [],
      exploreInputSearch: "",
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
      if (this.exploreInputSearch) {
        return this.exploreInputSearch.trim().toLowerCase();
      } else return "";
    },
    changeRouter() {
      /* eslint-disable no-unused-vars */
      this.$router
        .push(`/photos/explore/${this.formatString(this.exploreInputSearch)}`)
        .catch(err => {});
      /* eslint-enable no-unused-vars */
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
        this.users = res.data.users;
        this.pager.users = res.data.pagerUsers;
        this.pager.photos = res.data.pagerPhotos;
        this.totalPhotos = res.data.pagerPhotos.totalItems;
        this.totalUsers = res.data.pagerUsers.totalItems;
      }
    }
  },
  mounted() {
    this.options.page = parseInt(this.$route.query.page) || 1;
    this.options.filter = this.$route.query.filter || "";
    this.options.sorting = this.$route.query.sort || "";
    this.sendRequest();
  },
  watch: {
    // "$route.query": {
    //   immediate: true,
    //   async handler(query) {
    //     this.options.page = query.page || 1;
    //     this.options.sorting = query.sort || this.options.sorting;
    //     this.options.filter = query.filter || this.options.filter;
    //     this.sendRequest();
    //   }
    // },

    "$route.query.page": {
      immediate: true,
      async handler(page) {
        page = parseInt(page) || 1;
        this.options.page = page;
        this.sendRequest();
      }
    },
    "$route.query.filter": {
      immediate: true,
      async handler(filter) {
        this.options.filter = filter;
        this.sendRequest();
      }
    },
    "$route.query.sort": {
      immediate: true,
      async handler(sort) {
        this.options.sorting = sort;
        this.sendRequest();
      }
    },
    "$route.params.query": {
      immediate: true,
      async handler(query) {
        this.exploreInputSearch = query;
        this.sendRequest();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_explore-photos.scss";
</style>
