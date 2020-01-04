<template>
  <div>
    <section class="profile">
      <div class="container profile-container">
        <div class="profile__avatar">Avatar</div>
        <div class="profile__about">
          <div class="profile__username">Username</div>
          <div class="profile__name">Fullname</div>
          <div class="profile__about">About</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_profile.scss";
</style>
