<template>
  <div id="app">
    <header>
      <TheMenu></TheMenu>
    </header>
    <div class="content">
      <router-view />
    </div>
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
  }
};
</script>

<style lang="scss">
@import "styles/global.scss";
</style>
