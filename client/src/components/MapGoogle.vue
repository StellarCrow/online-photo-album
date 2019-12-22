<template>
  <div class="map"></div>
</template>

<script>
import gmapsInit from "../utils/gmaps";

export default {
  name: "Map",
  async mounted() {
    try {
      let coordinates = {
        location1: { lat: 50.45, lng: 30.467 },
        location2: { lat: 50.466, lng: 30.508 },
        location3: { lat: 50.43, lng: 30.515 }
      };

      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();

      let styledMap = this.createStyledMap(google);

      const map = new google.maps.Map(this.$el, {
        zoom: 12,
        mapTypeControlOptions: {
          mapTypeIds: [
            "roadmap",
            "satellite",
            "hybrid",
            "terrain",
            "styled_map"
          ]
        }
      });

      map.mapTypes.set("styled_map", styledMap);
      map.setMapTypeId("styled_map");

      geocoder.geocode({ address: "Kyiv" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        // map.fitBounds(results[0].geometry.viewport);
      });

      this.createMarker(
        google,
        coordinates.location1,
        "OPA Политехнический институт"
      ).setMap(map);
      this.createMarker(
        google,
        coordinates.location2,
        "OPA Контрактовая площадь"
      ).setMap(map);
      this.createMarker(
        google,
        coordinates.location3,
        "OPA Олимпийская"
      ).setMap(map);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    createMarker(google, location, title) {
      return new google.maps.Marker({
        position: location,
        title: title
      });
    },
    createStyledMap(google) {
      return new google.maps.StyledMapType([
        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#c9b2a6" }]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [{ color: "#dcd2be" }]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ae9e90" }]
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#93817c" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#a5b076" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#5e6e4a" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#f5f1e6" }]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#fdfcf8" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#f8c967" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#e9bc62" }]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [{ color: "#e98d58" }]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [{ color: "#db8555" }]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#806b63" }]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }]
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [{ color: "#8f7d77" }]
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ebe3cd" }]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#b9d3c2" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#92998d" }]
        },
        { name: "Styled Map" }
      ]);
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
