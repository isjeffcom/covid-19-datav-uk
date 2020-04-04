<template>
    <div id="addstore">
        <div>
            <!--input type="text" v-model="searchInput"-->
            <select v-model="selected">
                <option v-for="(item, index) in stores" :key="index">{{item}}</option>
            </select>
            <button v-on:click="checkNearby()">Check</button>
            <button v-on:click="getCurrentLoc()">Auto Get Current Location</button>
        </div>

        <div style="color: #fff;">
            <li v-for="(item, index) in storeRes" :key="index">
                {{item.sname}}
                <br>
                {{item.address}}
            </li>
        </div>
    </div>
</template>

<script>
import { genGet } from '../../request'
import { geoDistance } from '../../utils'

export default {
    name: "addstore",
    data(){
        return{
            la: false,
            lo: false,
            stores: [
                "Tesco",
                "Sainsbury",
                "Coop",
                "ASDA",
                "Lidl",
                "Aldi",
                "Boots",
                "Waitrose"
            ],
            selected: "Tesco",
            currentStore: [],
            storeRes: [],
            searchInput: ""
        }
    },
    
    mounted(){


    },
    created(){
        this.getStoreList()
        this.getCurrentLoc()
    },
    methods:{
        getStoreList(tar){
            genGet("./stores/" + this.selected.toLowerCase() + ".json", [], true, (res)=>{
                this.currentStore = res.data
            })
        },

        getCurrentLoc(){
            navigator.geolocation.getCurrentPosition((geo)=>{
                this.la = geo.coords.latitude
                this.lo = geo.coords.longitude
                this.findStoreByGeo("", this.la, this.lo)
            })
        },

        checkNearby(){
            genGet("./stores/" + this.selected.toLowerCase() + ".json", [], true, (res)=>{
                this.currentStore = res.data
                this.findStoreByGeo("", this.la, this.lo)
            })
            

        },

        findStoreByGeo(name, la, lo, dis){

            let res = []

            dis = dis ? dis : 5

            console.log(this.currentStore)
            
            for(let i=0;i<this.currentStore.length;i++){
                
                let tmpDis = geoDistance(la, lo, this.currentStore[i].latitude, this.currentStore[i].longitude)
                
                if(tmpDis < dis){
                    res.push(this.currentStore[i])
                }
            }

            if(res.length > 0 || dis > 100){
                this.storeRes = res
                return
            } else {
                this.findStoreByGeo(name, la, lo, dis+10)
            }
            
        }
    }
}
</script>