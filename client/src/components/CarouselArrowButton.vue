<template>
  <button>
    <font-awesome-icon
      :icon="['fa', `chevron-${arrowType}`]"
    ></font-awesome-icon>
  </button>
</template>

<script>
export default {
  name: "CarouselArrow",
  props: {
    arrowType: String
  }
};
</script>

<style lang="scss" scoped></style>
