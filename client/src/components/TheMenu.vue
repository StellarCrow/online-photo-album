<template>
  <nav class="navigation">
    <div class="navigation__logo">
      <router-link to="/">Logo</router-link>
    </div>

    <input type="checkbox" id="navigation_icon" />

    <div class="navigation__menu menu">
      <div class="menu__item dropdown dropdown-top-level">
        <span>Категории фотографий</span>
        <i class="dropdown__icon"
          ><font-awesome-icon :icon="['fa', 'caret-down']"></font-awesome-icon
        ></i>
        <div class="dropdown__content dropdown__content--top-level">
          <router-link class="dropdown__item" to="#"
            >Популярные фото</router-link
          >
          <router-link class="dropdown__item" to="#">Новые фото</router-link>
          <div class="dropdown dropdown-second-level dropdown__item">
            <span>Животные</span>
            <i class="dropdown__icon"
              ><font-awesome-icon
                :icon="['fa', 'caret-right']"
              ></font-awesome-icon
            ></i>
            <div
              class="dropdown__content dropdown__content--second-level dropdown__content--right"
            >
              <router-link class="dropdown__item" to="#">Коты</router-link>
              <router-link class="dropdown__item" to="#">Собаки</router-link>
              <router-link class="dropdown__item" to="#">Кролики</router-link>
            </div>
          </div>
          <router-link class="dropdown__item" to="#">Природа</router-link>
          <router-link class="dropdown__item" to="#">Город</router-link>
          <router-link class="dropdown__item" to="#">Еда</router-link>
        </div>
      </div>
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
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/components/_the-menu";
</style>
