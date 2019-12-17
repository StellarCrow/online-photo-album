<template>
  <nav class="navigation">
    <div navigation__logo>Logo</div>

    <input type="checkbox" id="navigation_icon"/>

    <div class="navigation__menu menu">
      <div class="menu__item dropdown">
        <span>Категории фотографий</span>
        <i class="dropdown__icon"><font-awesome-icon :icon="['fa', 'caret-down']"></font-awesome-icon></i>
        <div class="dropdown__content">
          <router-link class="dropdown__item" to="#">Популярные</router-link>
          <router-link class="dropdown__item" to="#">Новые</router-link>
        </div>
      </div>
      <router-link class="menu__item" to="#">Случайное фото</router-link>
      <router-link class="menu__item" to="#">Контакты</router-link>
      <router-link class="menu__item" to="/about">О нас</router-link>
    </div>
    
    <div class="navigation__search">Search</div>

    <label for="navigation_icon" class="navigation__icon"><font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon></label>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/components/_the-menu";
</style>
