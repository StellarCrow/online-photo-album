<template>
  <div class="map"></div>
</template>

<script>
import gmapsInit from "../utils/gmaps";

export default {
  name: "Map",
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      map.setZoom(20);

      var coordinates = {
        location1: { lat: 50.45, lng: 30.467 },
        location2: { lat: 50.466, lng: 30.508 },
        location3: { lat: 50.43, lng: 30.515 }
      };

      geocoder.geocode({ address: "Kyiv" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      var marker = new google.maps.Marker({
        position: coordinates.location1,
        title: "OPA Политехнический институт"
      });
      var marker2 = new google.maps.Marker({
        position: coordinates.location2,
        title: "OPA Контрактовая площадь"
      });
      var marker3 = new google.maps.Marker({
        position: coordinates.location3,
        title: "OPA Олимпийская"
      });

      marker.setMap(map);
      marker2.setMap(map);
      marker3.setMap(map);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss" scoped>
// .map {
//   width: 100%;
//   height: 100%;
// }
</style>
