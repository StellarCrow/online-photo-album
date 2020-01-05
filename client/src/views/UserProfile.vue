<template>
  <div class="userpage">
    <section class="profile">
      <div class="container profile-container">
        <div class="profile__avatar"></div>
        <div class="profile__about">
          <div class="profile__username">Username: {{ username }}</div>
          <div class="profile__name">Fullname: {{ name }}</div>
          <button v-if="isMyPage" @click="uploadImage" class="button-submit">
            Добавить фото
          </button>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <tabs>
          <tab name="Все фото" :selected="true">
            Все фото
          </tab>
          <tab name="Альбомы">
            Альбомы
          </tab>
        </tabs>
      </div>
    </section>
  </div>
</template>

<script>
import UsersService from "../services/UsersService";
import Tabs from "../components/TabsBase";
import Tab from "../components/TabsTab";

export default {
  name: "UserProfile",
  components: {
    Tabs,
    Tab
  },
  data() {
    return {
      name: "",
      username: "",
      isMyPage: false
    };
  },
  methods: {
    uploadImage() {
      this.$router.push(`/uploadImage`);
    }
  },
  async mounted() {
    if (this.$route.params.id === this.$store.getters.userId) {
      this.isMyPage = true;
    }
    let res = await UsersService.getUser(this.$route.params.id);
    if (res.data.success) {
      this.username = res.data.user.username;
      this.name = res.data.user.name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_profile.scss";
</style>
