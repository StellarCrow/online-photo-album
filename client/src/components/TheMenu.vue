<template>
  <nav class="navigation">
    <div class="navigation__logo">
      <router-link to="/"
        ><img src="@/assets/logo/logo-text.svg" alt="Logo"
      /></router-link>
    </div>

    <input type="checkbox" id="navigation_icon" />

    <div class="navigation__menu menu">
      <DropdownMenu
        class="menu__item"
        :links="profile"
        :menuTitle="'Мой профиль'"
        v-if="isLoggedIn"
      ></DropdownMenu>
      <DropdownMenu
        class="menu__item"
        :links="links"
        :menuTitle="'Категории фотографий'"
      ></DropdownMenu>
      <router-link class="menu__item" :to="{ path: '/photos/explore' }"
        >Исследовать</router-link
      >
      <router-link v-if="!isLoggedIn" class="menu__item" to="/contacts"
        >Контакты</router-link
      >
      <router-link v-if="!isLoggedIn" class="menu__item" to="/about"
        >О нас</router-link
      >
      <a v-if="isLoggedIn" @click.prevent="logoutUser" class="menu__item" to="/"
        >Logout</a
      >
    </div>

    <div class="navigation__search">
      <Search :inputClassName="'input-search-menu'"></Search>
    </div>

    <label for="navigation_icon" class="navigation__icon"
      ><font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon
    ></label>
  </nav>
</template>

<script>
import DropdownMenu from "../components/MenuDropdown";
import Search from "../components/SearchPhoto";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheMenu",
  components: {
    DropdownMenu,
    Search
  },
  data() {
    return {
      profile: [
        {
          name: "Мой профиль",
          address: `/users/${this.$store.getters.user._id}`
        },
        {
          name: "Добавить фото",
          address: "/uploadImage"
        }
      ],
      links: [
        {
          name: "Популярные фото",
          address: `/photos/explore/?sort=likes`
        },
        {
          name: "Новые фото",
          address: "/photos/explore/?sort=newest"
        },
        {
          name: "Животные",
          address: `/#`,
          links: [
            {
              name: "Коты",
              address: "/photos/explore/cat"
            },
            {
              name: "Собаки",
              address: "/photos/explore/dog"
            },
            {
              name: "Кролики",
              address: "/photos/explore/rabbit"
            }
          ]
        },
        {
          name: "Природа",
          address: "/photos/explore/nature"
        },
        {
          name: "Еда",
          address: "/photos/explore/food"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_the-menu";
</style>
