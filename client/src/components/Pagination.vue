<template>
  <div class="pagination">
    <div class="pagination__body">
      <slot></slot>
    </div>
    <div class="pagination__footer">
      <ul>
        <li
          :class="{ disabled: currentPage === 1 }"
          class="page-item previous-item"
        >
          <router-link
            :to="{ query: { page: currentPage - 1 } }"
            class="page-link"
            >Previous</router-link
          >
        </li>
        <li
          :class="{ disabled: currentPage === 3 }"
          class="page-item next-item"
        >
          <router-link
            :to="{ query: { page: currentPage + 1 } }"
            class="page-link"
            >Next</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      currentPage: 1
    };
  },
  watch: {
    "$route.query.page": {
      immediate: true,
      handler(page) {
        page = parseInt(page) || 1;
        console.log(page);
      }
    }
  }
};
</script>

<style></style>
