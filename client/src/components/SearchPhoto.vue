<template>
  <div class="search">
    <input
      type="text"
      name="search-input"
      placeholder="Найти..."
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
    async searchQuery() {
      this.$router.push(`/photos/explore/${this.inputQuery}`);
      this.inputQuery = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
