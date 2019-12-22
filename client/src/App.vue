<template>
  <div id="app">
    <header>
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
  }
};
</script>

<style lang="scss">
@import "styles/global.scss";
</style>
