<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li
        class="tabs__list-item"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'is-active': tab.isActive }"
      >
        <a @click="selectTab(tab)">{{ tab.name }}</a>
      </li>
    </ul>
    <div class="tabs__details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabsBase",
  data() {
    return {
      tabs: []
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_tabs.scss";
</style>
