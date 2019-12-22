<template>
  <section class="contacts">
    <div class="contacts__map">
      <!-- <Map /> -->
      <div class="contacts__addresses">
        <address>
          Украина, Киев<br />
          ул. Блаблабла 12<br />
          тел. 972492384702<br />
        </address>
        <address>
          Украина, Киев<br />
          ул. Блаблабла 12<br />
          тел. 972492384702<br />
        </address>
        <address>
          Украина, Киев<br />
          ул. Блаблабла 12<br />
          тел. 972492384702<br />
        </address>
      </div>
    </div>
    <div class="contacts__form"></div>
  </section>
</template>

<script>
// import Map from "../components/MapGoogle";

export default {
  name: "Contacts",
  components: {
    // Map
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_contacts.scss";
</style>
