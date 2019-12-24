<template>
  <div class="dropdown">
    <a
      class="dropdown__title"
      href="#"
      @click.prevent="showDropdown = !showDropdown"
    >
      <span>{{ menuTitle }}</span>
      <i class="dropdown__icon"
        ><font-awesome-icon :icon="['fa', 'caret-down']"></font-awesome-icon
      ></i>
    </a>
    <transition name="slide-fade">
      <div class="dropdown__content" v-if="showDropdown">
        <ul class="dropdown__list">
          <li
            class="dropdown__item"
            v-for="(link, index) in links"
            :key="index"
          >
            <MenuDropdown
              class="dropdown-inside"
              v-if="link.links"
              :links="link.links"
              :menuTitle="link.name"
            ></MenuDropdown>
            <router-link v-else :to="`${link.address}`">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MenuDropdown",
  props: {
    links: Array,
    menuTitle: String
  },
  data() {
    return {
      showDropdown: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_menu-dropdown.scss";
</style>
