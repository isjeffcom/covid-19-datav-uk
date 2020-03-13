<template>

  <div style="height: 100%; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >

      <l-tile-layer
        :url="url"
        :detectRetina="true"
        :attribution="attribution"
      ></l-tile-layer>

      <l-marker 
        v-for="(item, index) in mapData"
        :key="index"
        :icon="setIcon(item.confirmed)"
        :lat-lng="setLatLng(item.la, item.lo)" >


        <l-popup>
          <div>
            Area: {{item.name}}
            <br>
            Confirmed: {{item.confirmed}}
          </div>
        </l-popup>
      </l-marker>

    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  name: "ccmap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props:{
    mapData: {
        type: Array,
        value: []
    }
  },
  data() {
    return {
        iconResize: 3,
        minSize: 16,
        zoom: 5.6,
        center: L.latLng(54.275967, -3.234891),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        withPopup: L.latLng(47.41322, -1.219482),
        withTooltip: L.latLng(47.41422, -1.250482),
        currentZoom: 5,
        currentCenter: L.latLng(54.275967, -3.234891),
        showParagraph: false,
        icon: L.icon({
            iconUrl: 'https://playground.isjeff.com/marker.svg?v=2',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        }),
        mapOptions: {
            zoomSnap: 0.5,
            easeLinearity: true,
            zoomAnimation: true,
            fadeAnimation: true,
            markerZoomAnimation: true
        },
        showMap: true
    };
  },
  mounted(){
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    setLatLng(lo, la){
        return L.latLng(lo, la)
    },
    setIcon(num){
      let size = num * this.iconResize > this.minSize ? num * this.iconResize : this.minSize
      return L.icon({
          iconUrl: 'https://playground.isjeff.com/marker.svg',
          iconSize: [size, size],
          iconAnchor: [size/2, size/2]
      })
    }
  }
};
</script>
