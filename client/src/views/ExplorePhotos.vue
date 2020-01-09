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
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
