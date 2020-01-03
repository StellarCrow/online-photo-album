<template>
  <section>
    <div class="container error">
      <h2 class="error__header">Oops! It looks like the page was not found.</h2>
      <img
        src="../assets/images/pageNotFound.png"
        alt="404 Not Found"
        class="error__image"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "pageNotFound"
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_error.scss";
</style>
