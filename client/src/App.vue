<template>
  <div id="app">
    <header class="header">
      <TheMenu></TheMenu>
    </header>
    <main class="content">
      <router-view />
    </main>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheMenu from "../src/components/TheMenu";
import TheFooter from "../src/components/TheFooter";

export default {
  components: {
    TheFooter,
    TheMenu
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      if (from.name == to.name) {
        this.$router
          .replace({
            query: {
              ...from.query,
              ...to.query
            }
          })
          .catch(err => {});
      }
    }
    /* eslint-enable no-unused-vars */
  }
};
</script>

<style lang="scss">
@import "normalize-scss";
@include normalize();
@import url("https://fonts.googleapis.com/css?family=Comfortaa:300,400,600,700|Poiret+One&display=swap&subset=cyrillic");
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap&subset=cyrillic");
@import "../src/styles/basics/_base.scss";
</style>
