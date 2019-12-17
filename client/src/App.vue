<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheFooter from "../src/components/TheFooter";

export default {
  components: {
    TheFooter
  }
};
</script>

<style lang="scss">
@import "styles/global.scss";
</style>
