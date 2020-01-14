<template>
  <div class="users">
    <ul class="users__list">
      <li class="users__item" v-for="(user, index) in users" :key="index">
        <div class="user">
          <div class="user__avatar">
            <img src="../assets/images/userpage-avatar.svg" alt="user-avatar" />
          </div>
          <div class="user__info">
            <router-link class="user__link" :to="`/users/${user._id}`">{{
              user.username
            }}</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_users-list.scss";
</style>
