<template>
  <section class="explore">
    <aside>Left Menu</aside>
    <div class="explore__search">
      <input type="text" name="search-input" id="explore__search" />
    </div>
    <section>
      <Tabs>
        <Tab :name="`Фотографии (${photos.length})`" :selected="true">
          <PhotoGallery :images="photos"></PhotoGallery>
        </Tab>
        <Tab :name="`Пользователи (${users.length})`">
          Пользователи
        </Tab>
        <Tab :name="`Альбомы (${albums.length})`">
          Альбомы
        </Tab>
      </Tabs>
    </section>
  </section>
</template>

<script>
import Tabs from "../components/TabsBase";
import Tab from "../components/TabsTab";
import PhotoGallery from "../components/ImageGallery";
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
    PhotoGallery
  },
  data() {
    return {
      photos: [],
      albums: [],
      users: []
    };
  },
  async mounted() {
    let res = await SearchService.searchAllByQuery(this.query);
    if (res.data.success) {
      this.photos = res.data.photos;
      this.albums = res.data.albums;
      this.users = res.data.users;
    }
  }
};
</script>

<style lang="scss" scoped></style>
