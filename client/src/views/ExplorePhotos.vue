<template>
  <section class="explore">
    <aside>Left Menu</aside>
    <div class="explore__search">
      <input type="text" name="search-input" id="explore__search" />
    </div>
    <section>
      <Tabs>
        <Tab name="Фотографии" :selected="true">
          Фотографии
          <!-- <PhotoGallery :userId="this.$route.params.id"></PhotoGallery> -->
        </Tab>
        <Tab name="Пользователи">
          Пользователи
        </Tab>
        <Tab name="Альбомы">
          Альбомы
        </Tab>
      </Tabs>
    </section>
  </section>
</template>

<script>
import Tabs from "../components/TabsBase";
import Tab from "../components/TabsTab";
// import PhotoGallery from "../components/ImageGallery";
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
    Tab
    // PhotoGallery
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
      console.log(this.photos);
      console.log(this.albums);
      console.log(this.users);
      
    }
  }
};
</script>

<style lang="scss" scoped></style>
