<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsTab",
  props: {
    name: {
      type: String,
      requires: true
    },
    selected: {
      default: false
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    this.isActive = this.selected;
  }
};
</script>

<style></style>
