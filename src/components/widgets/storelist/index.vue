<template>
    <div id="storelist" :style="'opacity:' + (loading ? '0.5' : '1')">

        <div id="sl-sorter">
            <div>
                <select v-model="selected" @change="changed()">
                    <option v-for="(item, index) in stores" :key="index">{{item}}</option>
                </select>
            </div>

            <div id="sl-sinput">
                <div id="sl-sinput-box">
                    <input type="text" v-model="searchInput">
                    
                </div>

                <div id="sl-sinput-check">
                    <button v-on:click="checkNearbyWithPo()">Find Nearby Stores</button>
                </div>

                <div id="sl-sinput-getnearby">
                    <button v-on:click="getCurrentLoc()">Get My Location</button>
                </div>
                
            </div>

            <div id="sl-map">
                <storemap :mapData="storeRes" :ct="mapCenter"></storemap>
            </div>
        </div>

    

        <div id="sl-list" style="color: #fff;">
            <div 
            class="sl-s"
            v-for="(item, index) in storeRes" 
            :key="index" :style="'color:' + (mapSelected == index ? '#F62E3A' : '#ffffff')" 
            v-on:mouseover="selectFromList(index)"
            v-on:click="listClicked(item)">

                <div class="sl-s-info">
                    <div class="sl-s-name">
                        {{item.sname}}
                    </div>
                        
                    <div class="sl-s-add">
                        {{item.address}}
                    </div>
                </div>
        
                
            </div>
        </div>
    </div>
</template>

<script>
import { genGet, getLocByPO } from '../../../request'
import { geoDistance } from '../../../utils'
import { EventBus } from '../../../bus'

import storemap from '../storemap'

const ls = require('local-storage')

export default {
    name: "storelist",
    components:{
        storemap
    },
    data(){
        return{
            loading: false,
            api: "http://localhost:8020/store/",
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
            mapSelected: 0,
            tryTime: 0,
            currentStore: [],
            storeRes: [],
            searchInput: "",
            mapCenter: [],
            output: ""
        }
    },
    
    created(){

        EventBus.$on("storemap", (res)=>{
            this.mapSelected = res
        })

        this.autoByLast()
        
        
    },
    methods:{

        autoByLast(){
            // If has last query
            if(ls.get('cuk19-location') && ls.get('cuk19-store')){
                let lsLoc = ls.get('cuk19-location')
                let lsStore = ls.get('cuk19-store')
                this.la = lsLoc.la
                this.lo = lsLoc.lo
                this.selected = lsStore
                this.checkNearby()
            }
        },


        getCurrentLoc(){
            this.loading = true
            navigator.geolocation.getCurrentPosition((geo)=>{

                this.la = geo.coords.latitude
                this.lo = geo.coords.longitude
                this.checkNearby()
                this.loading = false

            }), (err)=>{
                if(err.code == 1){
                    alert("You didn't give location access to your bowser. Please try input postcode")
                }
                this.loading = false
            }
        },

        selectFromList(idx){
            this.mapSelected = idx
            EventBus.$emit("storemaprs", idx)
        },

        checkNearby(){
            this.loading = true

            if(this.la && this.la){

                ls.set('cuk19-location', {la: this.la, lo: this.lo})
                ls.set('cuk19-store', this.selected)

                genGet(this.api, [
                    {
                        name: "n",
                        val: this.selected.toLowerCase()
                    }
                ], true, (res)=>{
                    this.currentStore = res.data.data
                    this.findStoreByGeo(this.la, this.lo)
                    this.loading = false
                })
            } else {
                alert("Please input Postcode")
                this.loading = false
            }
            
        },

        listClicked(d){
            d.store = this.selected.toLowerCase()
            EventBus.$emit("slclick", d)
        },

        changed(){
            if(this.la && this.lo){
                this.checkNearby()
            }
        },

        checkNearbyWithPo(){

            if(this.searchInput.length > 0){
                this.loading = true

                getLocByPO(this.searchInput, (res)=>{
                    if(res.status){
                        this.la = res.data.result.latitude
                        this.lo = res.data.result.longitude
                        this.checkNearby()
                    } else {
                        alert("Invalid postcode")
                    }

                    this.loading = false
                    
                })
            } else {
                alert("no input")
            }

            
        },

        findStoreByGeo(la, lo, dis){

            let res = []

            dis = dis ? dis : 5
            
            for(let i=0;i<this.currentStore.length;i++){
                
                let tmpDis = geoDistance(la, lo, this.currentStore[i].latitude, this.currentStore[i].longitude)
                
                if(tmpDis < dis){
                    res.push(this.currentStore[i])
                }
            }

            if(res.length > 0 || dis > 100){
                this.storeRes = res
                this.mapCenter = [la, lo]
                return
            } else {
                if(this.tryTime > 10){
                    this.tryTime = 0
                    return
                } else {
                    this.findStoreByGeo(name, la, lo, dis+10)
                    this.tryTime = this.tryTime + 1
                    return
                }
                
            }
            
        }
    }
}
</script>


<style scoped>
#sl-map{
    height: 150px;
    width: 100%;
}

#sl-sorter{

    position: relative;
    width: 100%;
    height: 200px;
    background: #333;
}

#sl-list{
    margin-top: 0px;
    height: 500px;;
    overflow-y:scroll; 
}

.sl-s{
    display: flex;
}

#sl-sinput{
    width: 100%;
    display: flex;
}


</style>