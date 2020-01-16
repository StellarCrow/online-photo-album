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
        <li v-for="(color, index) in colors" :key="index">
          <input
            type="radio"
            name="filter"
            :id="`filter-${color.name}`"
            :value="color.name"
            v-model="filter"
          /><label
            :for="`filter-${color.name}`"
            :style="{ backgroundColor: color.hex }"
            >lala</label
          >
        </li>
        <li>
          <input
            type="radio"
            name="filter"
            value=""
            id="filter_reset"
            v-model="filter"
          /><label for="filter_reset">Убрать фильтры</label>
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
      filter: "",
      colors: [
        {
          name: "red",
          hex: "#FF0000"
        },
        {
          name: "yellow",
          hex: "#f0ff00"
        },
        {
          name: "green",
          hex: "#1abf00"
        },
        {
          name: "blue",
          hex: "#00c3df"
        },
        {
          name: "pink",
          hex: "#FFC0CB"
        }
      ]
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
