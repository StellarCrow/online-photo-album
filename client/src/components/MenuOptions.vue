<template>
  <div class="options">
    <div class="options__section">
      <div class="options__heading">Сортировать:</div>
      <ul class="options__list sort" @change="changeRoute()">
        <li v-for="(sort, index) in sortTypes" :key="index" class="sort__item">
          <input
            type="radio"
            name="sorting"
            :value="sort.type"
            :id="`sort_${sort.type}`"
            class="sort__input"
            v-model="sorting"
          /><label :for="`sort_${sort.type}`" class="sort__label">{{
            sort.name
          }}</label>
        </li>
      </ul>
    </div>
    <div class="options__section">
      <div class="options__heading">Выбрать тон:</div>
      <ul class="options__list filter filter--color" @change="changeRoute()">
        <li v-for="(color, index) in colors" :key="index" class="filter__item">
          <input
            type="radio"
            name="filter"
            :id="`filter-${color.name}`"
            :value="color.name"
            v-model="filter"
            class="filter__input"
          /><label
            :for="`filter-${color.name}`"
            :style="{ backgroundColor: color.hex }"
            class="filter__label"
          ></label>
        </li>
        <li class="filter__item">
          <input
            type="radio"
            name="filter"
            value=""
            id="filter_reset"
            class="filter__input"
            v-model="filter"
          /><label for="filter_reset" class="filter__label filter__label--reset"
            >Все цвета</label
          >
        </li>
      </ul>
      <label :for="idForCloseLabel" class="options__close">Закрыть</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuOptions",
  props: {
    idForCloseLabel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sorting: "",
      filter: "",
      colors: [
        {
          name: "white",
          hex: "#ffffff"
        },
        {
          name: "black",
          hex: "#000000"
        },
        {
          name: "yellow",
          hex: "#ffe76e"
        },
        {
          name: "orange",
          hex: "#ff976e"
        },
        {
          name: "red",
          hex: "#ff6e6e"
        },
        {
          name: "darkViolet",
          hex: "#c36eff"
        },
        {
          name: "hotPink",
          hex: "#ff6ed1"
        },
        {
          name: "green",
          hex: "#6eff99"
        },
        {
          name: "skyBlue",
          hex: "#6ef1ff"
        },
        {
          name: "darkBlue",
          hex: "#756eff"
        }
      ],
      sortTypes: [
        {
          type: "likes",
          name: "По популярности"
        },
        {
          type: "newest",
          name: "От новых к старым"
        },
        {
          type: "oldest",
          name: "От старых к новым"
        },
        {
          type: "",
          name: "Без сортировки"
        }
      ]
    };
  },
  methods: {
    changeRoute() {
      this.$router.push({
        query: { filter: this.filter, sort: this.sorting }
      });
    }
  },
  mounted() {
    this.filter = this.$route.query.filter || "";
    this.sorting = this.$route.query.sort || "";
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_menu-options.scss";
</style>
