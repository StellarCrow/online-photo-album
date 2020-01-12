<template>
  <div class="options">
    <div class="options__section">
      <div class="options__heading">Сортировать:</div>
      <ul class="options__list" @change="update">
        <li>
          <input
            type="radio"
            name="sorting"
            value="likes"
            id="sort_likes"
            v-model="sorting"
          /><label for="sort_likes">По популярности</label>
        </li>
        <li>
          <input
            type="radio"
            name="sorting"
            value="newest"
            id="sort_newest"
            v-model="sorting"
          /><label for="sort_newest">От новых к старым</label>
        </li>
        <li>
          <input
            type="radio"
            name="sorting"
            value="oldest"
            id="sort_oldest"
            v-model="sorting"
          /><label for="sort_oldest">От старых к новым</label>
        </li>
        <li>
          <input
            type="radio"
            name="sorting"
            value=""
            id="sort_reset"
            v-model="sorting"
          /><label for="sort_reset">Без сортировки</label>
        </li>
      </ul>
    </div>
    <div class="options__section">
      <div class="option__heading">Фильтрация:</div>
      <ul class="options__list" @change="update">
        <li>
          <input
            type="radio"
            name="filter-color"
            id="filter_green"
            value="green"
            v-model="filter"
          /><label for="filter_green"></label>
        </li>
        <li>
          <input
            type="radio"
            name="filter-color"
            id="filter_red"
            value="red"
            v-model="filter"
          /><label for="filter_red"></label>
        </li>
        <li>
          <input
            type="radio"
            name="filter-color"
            id="filter_yellow"
            value="yellow"
            v-model="filter"
          /><label for="filter_yellow"></label>
        </li>
        <li>
          <input
            type="radio"
            name="filter-color"
            id="filter_blue"
            value="blue"
            v-model="filter"
          /><label for="filter_blue"></label>
        </li>
        <li>
          <input
            type="radio"
            name="filter-color"
            id="filter_pink"
            value="pink"
            v-model="filter"
          /><label for="filter_pink"></label>
        </li>
        <li>
          <input
            type="radio"
            name="filter-color"
            id="filter_reset"
            value=""
            v-model="filter"
          /><label for="filter_reset">Очистить фильтр</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuOptions",
  data() {
    return {
      sorting: "",
      filter: ""
    };
  },
  methods: {
    update() {
      let options = {
        sorting: this.sorting,
        filter: this.filter
      };
      this.$emit("options", options);
    }
  }
};
</script>

<style lang="scss" scoped></style>
