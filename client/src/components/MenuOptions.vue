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
    <div class="options__section">
      <div class="options__heading">Ориентация:</div>
      <ul class="options__list orientation" @change="changeRoute()">
        <li
          v-for="(item, index) in orientations"
          :key="index"
          class="orientation__item"
        >
          <input
            type="radio"
            name="orientation"
            :value="item.type"
            :id="`orientation_${item.type}`"
            class="orientation__input"
            v-model="orientation"
          /><label :for="`orientation_${item.type}`" class="orientation__label">
            <i v-if="item.icon"
              ><font-awesome-icon
                :icon="['fa', `${item.icon}`]"
              ></font-awesome-icon
            ></i>
            {{ item.name }}</label
          >
        </li>
      </ul>
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
      orientation: "",
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
      orientations: [
        {
          type: "landscape",
          name: "Landscape",
          icon: "image"
        },
        {
          type: "portrait",
          name: "Portrait",
          icon: "portrait"
        },
        {
          type: "square",
          name: "Square",
          icon: "square"
        },
        {
          type: "",
          name: "All",
          icon: ""
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
        query: {
          color: this.filter,
          sort: this.sorting,
          orientation: this.orientation
        }
      });
    }
  },
  mounted() {
    this.filter = this.$route.query.color || "";
    this.sorting = this.$route.query.sort || "";
    this.orientation = this.$route.query.orientation || "";
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_menu-options.scss";
</style>
