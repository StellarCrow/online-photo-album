<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__block">
          <div class="footer__heading">
            Про OPA
          </div>
          <div class="footer__text">
            OPA - Online Photo Album. Ваш помощник в хранении и поиске
            фотографий. Загружайте свои изображения, ищите, оценивайте работы
            других пользователей.
          </div>
        </div>
        <div class="footer__block">
          <div class="footer__heading">
            Ссылки
          </div>
          <div class="footer__list">
            <ul>
              <li class="footer__link">
                <router-link class="menu__item" to="/contacts"
                  >Контакты</router-link
                >
              </li>
              <li class="footer__link">
                <router-link class="menu__item" to="/about">О нас</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer__block">
          <div class="footer__heading">
            Ищите нас в соц.сетях
          </div>
          <div class="footer__list">
            <ul class="socials">
              <li class="socials__link">
                <font-awesome-icon
                  class="icon"
                  :icon="['fab', 'instagram']"
                ></font-awesome-icon>
              </li>
              <li class="socials__link">
                <font-awesome-icon
                  class="icon"
                  :icon="['fab', 'facebook-f']"
                ></font-awesome-icon>
              </li>
              <li class="socials__link">
                <font-awesome-icon
                  class="icon"
                  :icon="['fab', 'twitter']"
                ></font-awesome-icon>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__copyright">Copyright&#169;2019</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../styles/components/_the-footer.scss";
</style>
