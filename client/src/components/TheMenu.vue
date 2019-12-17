<template>
  <nav class="menu">
    <router-link class="menu__item" to="/">Лого</router-link>
    <div class="menu__item dropdown">
      <span>Категории фотографий</span>
      <i class="dropdown__icon"></i>
      <div class="dropdown__content">
        <router-link class="dropdown__item" to="#">Популярные</router-link>
        <router-link class="dropdown__item" to="#">Новые</router-link>
      </div>
    </div>
    <router-link class="menu__item" to="#">Случайное фото</router-link>
    <router-link class="menu__item" to="#">Контакты</router-link>
    <router-link class="menu__item" to="/about">О нас</router-link>
    <div class="menu__item">Поиск</div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/components/_the-menu";
</style>
