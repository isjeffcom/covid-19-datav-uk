<template>
    <div id="map">
        <MglMap 
            :accessToken="accessToken" 
            :mapStyle="mapStyle"
            :center.sync="MapCenter"
            :zoom="MapZoom"
            :speed="MapSpeed" 
            :pitch="MapPitch"
            :bearing="MapBearing"
            :antialias="MapAntialias"
            @load="onMapLoaded">

            <MglMarker 
                v-for="(item, index) in mapData" 
                :key="index"
                :coordinates="[item.lo, item.la]" 
                color="blue">

                <div slot="marker">
                    <img src="http://playground.isjeff.com/marker.svg" alt="point" :style="'width:' + (item.confirm*10) + 'px;'">
                </div>

                <MglPopup>
                    <div style="color: #F62E3A; font-weight: bold;">Area: {{item.name}}<br>Confirmed Cases: {{item.confirm}}</div>
                </MglPopup>

            </MglMarker>

        </MglMap>
    </div>
</template>

<script>

import Mapbox from "mapbox-gl"
import { MglMap, MglMarker, MglPopup } from "vue-mapbox"

export default {
    components: {
        MglMap,
        MglMarker,
        MglPopup
    },
    props:{
        mapData: {
            type: Array,
            value: []
        }
    },
    data() {
        return {
            api: "http://api.mapbox.com/geocoding/v5/",
            accessToken: "pk.eyJ1IjoiamVmZnd1LTAwIiwiYSI6ImNrNHk3eWF0cTA4N24zZXA0NDRhN3Q0aDEifQ.qDaAd2i4tYxdeCVlYq9R-w",
            mapStyle: "mapbox://styles/jeffwu-00/ck4youe0j180e1cmjin0941du",

            // Map Default Config
            MapCenter: {lat: 54.275967, lon: -3.234891},
            MapZoom: 5,
            MapSpeed: 1,
            MapPitch: this.Def_MapPitch,
            MapBearing: this.Def_Bearing,
            MapAntialias: false,
        }
    },

    created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox
        this.map = null
    },

    methods:{
        onMapLoaded(event) {
            // in component
            this.map = event.map
        },
    }

    
}
</script>


<style scoped>
#map{
    height: 100%;
}
</style>