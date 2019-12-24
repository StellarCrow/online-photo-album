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
    <div class="contacts__form">
      <FormContactUs />
    </div>
  </section>
</template>

<script>
// import Map from "../components/MapGoogle";
import FormContactUs from "../components/form/FormContactUs";

export default {
  name: "Contacts",
  components: {
    FormContactUs
    // Map
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_contacts.scss";
</style>
