<template>
  <section class="contacts">
    <div class="contacts__map">
      <Map />
      <div class="contacts__addresses">
        <address>
          Украина, Киев<br />
          ул. Блаблабла 12<br />
          тел. +38(093)876-23-23<br />
        </address>
        <address>
          Украина, Киев<br />
          ул. Блаблабла 12<br />
          тел. +38(093)876-23-23<br />
        </address>
        <address>
          Украина, Киев<br />
          ул. Блаблабла 12<br />
          тел. +38(093)876-23-23<br />
        </address>
      </div>
    </div>
    <div class="contacts__form">
      <h3 class="contacts__heading">Свяжитесь с нами</h3>
      <FormContactUs />
    </div>
  </section>
</template>

<script>
import Map from "../components/MapGoogle";
import FormContactUs from "../components/form/FormContactUs";

export default {
  name: "Contacts",
  components: {
    Map,
    FormContactUs
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_contacts.scss";
</style>
