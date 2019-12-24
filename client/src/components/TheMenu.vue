<template>
  <nav class="navigation">
    <div class="navigation__logo">
      <router-link to="/">Logo</router-link>
    </div>

    <input type="checkbox" id="navigation_icon" />

    <div class="navigation__menu menu">
      <DropdownMenu
        class="menu__item"
        :links="links"
        :menuTitle="'Категории фотографий'"
      ></DropdownMenu>
      <router-link class="menu__item" to="#">Случайное фото</router-link>
      <router-link class="menu__item" to="/contacts">Контакты</router-link>
      <router-link class="menu__item" to="/about">О нас</router-link>
    </div>

    <div class="navigation__search">Search</div>

    <label for="navigation_icon" class="navigation__icon"
      ><font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon
    ></label>
  </nav>
</template>

<script>
import DropdownMenu from "../components/MenuDropdown";

export default {
  name: "TheMenu",
  components: {
    DropdownMenu
  },
  data() {
    return {
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
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_the-menu";
</style>
