<template>

  <div style="height: 100%; width: 100%">
    
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      ref="lmap"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >

      <l-tile-layer
        :url="url"
        :detectRetina="true"
        :attribution="attribution"
      ></l-tile-layer>

      <l-geo-json :geojson="geojson" :options="gJStyle"></l-geo-json>

      <l-marker 
        v-for="(item, index) in mapData"
        :key="index"
        :icon="setIcon(item.confirmed)"
        :lat-lng="item.la ? setLatLng(item.la, item.lo) : setLatLng(0,0)" >


        <l-popup>
          <div style="text-align:center;">
            <span style="font-size: 14px; font-weight: bold;">{{item.name}}</span> 
            <br>
            <span style="font-size: 16px; font-weight: bold; color: #FF535D;">{{item.confirmed}}</span> 
          </div>

          <button class="track-btn" v-if="tlMode" v-on:click="track(item.name)">Track</button>
        </l-popup>
      </l-marker>

    </l-map>
  </div>
</template>

<script>
import L from "leaflet"
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from "vue2-leaflet"
import { genGet } from '../../../request'
import { EventBus } from '../../../bus'

export default {
  name: "ccmap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LGeoJson
  },
  props:{
    mapData: {
        type: Array,
        value: []
    },
    tlMode: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
        api_geoToPo: "https://api.postcodes.io/postcodes/",
        api_geoJson: "./geojson/utla.geojson",
        geojson: {},
        mready: false,
        iconResize: 0.04,
        minSize: 16,
        maxSize: 90,
        zoom: 6,
        center: L.latLng(54.275967, -3.234891),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        //url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
        //url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
        attribution:
            '&copy; <a href="http://osm.org/copyright">OSM</a>',
        currentZoom: 5,
        currentCenter: L.latLng(54.275967, -3.234891),
        showParagraph: false,
        icon: L.icon({
            iconUrl: './img/marker_o.svg',
            iconSize: [0, 0],
            iconAnchor: [0, 0]
        }),
        mapOptions: {
            zoomSnap: 0.5,
            minZoom: 5,
            maxZoom: 13,
            easeLinearity: true,
            zoomAnimation: true,
            fadeAnimation: true,
            markerZoomAnimation: true
        },
        showMap: false,
        gJStyle: {
          style: {
            weight: 3,
            fillOpacity: 0,
            color: '#1C4060',
            fillColor: '#1B2B39'
          }
        }
    };
  },

  watch: {

    "tlMode": function (){

      // Set icon size
      if(this.tlMode == false){
        this.minSize = 16
        this.maxSize = 100
      }else {
        this.minSize = 6
        this.maxSize = 200
      }

    },

    "mapData": function (){
      this.$refs.lmap.mapObject.closePopup();
    }
  },


  created(){
    var that = this
    EventBus.$on("getLoc", ()=>{
      that.getUserGeo()
    })

    this.getGeo()
  },

  methods: {

    // Get UTLA Geo Json
    getGeo(){
      genGet(this.api_geoJson, [], true, (res)=>{
        this.geojson = res.data
        this.showMap = true
      })
    },

    // Get user geo by location api
    getUserGeo(){
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((geo)=>{
          let la = geo.coords.latitude
          let lo = geo.coords.longitude

          // UK's Latitude between 48 - 62
          if( la < 48 || la > 62){
            return
          }

          // UK's Longitute between -8 - 3
          if(lo < -8 || lo > 3) {
            return
          }
          
          let c = L.latLng(la, lo)
          
          this.center = c
          this.currentCenter = c

          // Do this otherwise center udpate will be overwrite
          setTimeout(()=>{
            this.zoom = 8
          }, 1400)

          genGet(this.api_geoToPo, [
            {
              name: "lon",
              val: lo
            },
            {
              name: "lat",
              val: la
            }
          ], true, (res)=>{

            let result = res.data.result[0]
            let UTLA = ""
            if(result.country == "Scotland"){
              UTLA = result["nhs_ha"]
            } 
            
            else if(result.country == "England"){
              UTLA = result["nuts"]
            }

            else if(result.country == "Northern Ireland"){
              UTLA = "Northern Ireland"
            }

            else if(result.country == "Wales"){
              UTLA = "Wales"
            }

            EventBus.$emit("utla", UTLA)

          })
          
        }, (err)=>{
          if(err.code == 1){
            alert("You didn't give location access to your bowser. Please try to clear your bowser cache and try again.")
          }
        })
        
      } else {
        console.log("no auth")
      }
    },


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

      // Min SIZE
      let size = num * this.iconResize > this.minSize ? num * this.iconResize : this.minSize

      // Max size
      if(size > this.maxSize){
        size = this.maxSize
      }

      return L.icon({
          iconUrl: './img/marker_r.svg',
          iconSize: [size, size],
          iconAnchor: [size/2, size/2]
      })
    },

    track(area){
      EventBus.$emit("area-track", area)
    }
  }
};
</script>


<style scoped>
.track-btn{
  height: 30px;
  padding-top: 0px;
  width: 100%;
  margin-top: 4px;
  margin-left: 0px;
  margin-right: 0px;
}
</style>