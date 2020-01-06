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
      <router-link class="menu__item" to="#">Случайное фото</router-link>
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

    <div class="navigation__search">Search</div>

    <label for="navigation_icon" class="navigation__icon"
      ><font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon
    ></label>
  </nav>
</template>

<script>
import DropdownMenu from "../components/MenuDropdown";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheMenu",
  components: {
    DropdownMenu
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
        },
        {
          name: "Lalala",
          address: "/#"
        }
      ],
      links: [
        {
          name: "Популярные фото",
          address: "/#"
        },
        {
          name: "Новые фото",
          address: "/#"
        },
        {
          name: "Животные",
          address: "/#",
          links: [
            {
              name: "Коты",
              address: "/#"
            },
            {
              name: "Собаки",
              address: "/#",
              links: [
                {
                  name: "Коты",
                  address: "/#"
                },
                {
                  name: "Коты",
                  address: "/#"
                }
              ]
            },
            {
              name: "Кролики",
              address: "/#"
            }
          ]
        },
        {
          name: "Природа",
          address: "/#"
        },
        {
          name: "Еда",
          address: "/#"
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
