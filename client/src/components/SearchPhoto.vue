<template>
  <div class="search">
    <input
      type="text"
      name="search-input"
      placeholder="Найти..."
      maxlength="20"
      :class="inputClassName"
      v-model="inputQuery"
      @keydown.enter.prevent="searchQuery()"
    />
  </div>
</template>

<script>
export default {
  name: "SearchPhoto",
  props: {
    inputClassName: String
  },
  data() {
    return {
      inputQuery: ""
    };
  },
  methods: {
    formatString() {
      return this.inputQuery.trim().toLowerCase();
    },
    async searchQuery() {
      /* eslint-disable no-unused-vars */
      this.$router
        .push(`/photos/explore/${this.formatString(this.inputQuery)}`)
        .catch(err => {});
      /* eslint-enable no-unused-vars */
      this.inputQuery = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_forms.scss";
</style>
