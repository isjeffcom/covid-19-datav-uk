<template>
    <div id="carea">
        <!-- REGIONAL MAP -->

        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
            <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
                <span>{{getLang("Regions")}}</span><br>
                <div style="font-size: 16px;"><b style="color: #7DA5B5;">{{unknown}}</b> {{getLang("Unknown Locations")}}</div>
                <div style="font-size: 16px;"  v-if="nearbyShow"><b style="color: #F62E3A;">{{nearby.num}}</b> {{getLang("Cases Near")}} <b style="color: #FFC634;">{{nearby.name}}</b></div>
                <div style="font-size: 12px; opacity: 0.5;">* {{getLang("At least 1 day in arrears")}}</div>
            </div>

            <div class="title-right" v-on:click="getLoc()" :style="getLocAva ? 'opacity: 1' : 'opacity: 0.2'">
                <img src="https://i.ibb.co/09dv1dN/location.png" alt="location" width="30px" style="cursor: pointer;">
            </div>
        </div>

        <!-- switch between map or list -->
        <div class="tab-switcher">
            <div 
                class="ds-single" 
                v-for="(item, index) in areaViews" 
                :key="index" 
                :style="'width:calc(100%/' + areaViews.length + ');'" 
                v-on:click="switchAreaView(item)">

                <div class="ds-text">
                    <span>{{getLang(item)}}</span>
                </div>

                <div class="ds-ids" v-if="item == currentAreaView"></div>
                
            </div>
        </div>

        <!-- IF MAP -->
        <!-- use ccmap from /src/components/widgets/ccmap -->
        <transition name="fade">
            <div id="area-map" v-if="currentAreaView == 'Map'">
                <osmmap :mapData="mapData"></osmmap>
            </div>
        </transition>

        <!-- IF LIST -->
        <transition name="fade">
            <div v-if="currentAreaView == 'List'" style="margin-top:20px;">

            <div class="area-list-search">
                <input type="text" placeholder="Search by place" v-model="listSearch">
            </div>
            

            <table>
                <tr>
                <th>{{getLang("Location")}}</th>
                <th>{{getLang("Cases")}}</th>

                <tr v-for="item in listFiltered" :key="item.location">
                    <td>{{item.location}}</td>
                    <td>{{item.number}}</td>
                </tr>
            </table>
            </div>
        </transition>

        <!-- IF LIST -->
        <transition name="fade">
            <div v-if="currentAreaView == 'Postcode'" style="margin-top:20px;">

            <div class="area-po-search">
                <input type="text" placeholder="Enter your postcode" v-model="poSearch" style="width: 70%;"><br>
                <input type="submit" style="margin-left: 5%;width: 25%;" v-on:click="searchPO" />
            </div>

            <div class="area-po-res">
                <div class="area-po-res-cont">
                    <b style="color: #F62E3A;">{{nearby.num}}</b> {{getLang("Cases Near")}} <b style="color: #FFC634;">{{nearby.name}}</b>
                </div>
            </div>
            

            </div>
        </transition>
    </div>
</template>

<script>
import { putCN } from '../../translate'
import osmmap from '../widgets/map'
import { EventBus } from '../../bus'
import { genGet } from '../../request'

export default {
    name: "carea",
    components:{
        osmmap
    },
    props:{
        renderArea:{
            type: Array,
            default(){
                return []
            }
        },
        mapData: {
            type: Array,
            default(){
                return []
            }
        },
        unknown:{
            type: Number,
            default: 0
        }
    },
    data(){
        return{
            api_pos: "https://api.postcodes.io/postcodes/",
            nearby: {
                num: 0,
                name: ""
            },
            nearbyShow: false,
            getLocAva: true,
            listSearch: "",
            poSearch: "",
            areaViews: ["Map", "List", "Postcode"],
            currentAreaView: "Map",
            areaList: []
        }
    },

    mounted(){
        //this.areaList = this.renderArea
    },
    created(){
        EventBus.$on("utla", (area)=>{
            this.displayMyArea(area)
        })
    },
    computed:{
        // Filter table list
        // 列表搜索的filter，每次键入fire
        listFiltered: function(){
            return this.renderArea.filter(val => {
                return val.location.toLowerCase().includes(this.listSearch.toLowerCase())
            })
        }
    },
    methods:{

        searchPO(){
            genGet(this.api_pos + this.poSearch, [], true, (res)=>{
                if(res.status){
                    let result = res.data.result
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

                    this.displayMyArea(UTLA)

                } else {
                    alert("Is this a UK Postcode?")
                }
            })
        },

        displayMyArea(area){
            if(area){
                let n = this.getCasesByArea(area)
                this.nearby.num = n[0].number
                this.nearby.name = n[0].location
                this.nearbyShow = true
            }
        },

        // 更换区域，地图<->列表
        switchAreaView(idx){
            this.currentAreaView = idx
        },

        getCasesByArea(area){
            return this.renderArea.filter(val => {
                //console.log(val.location.toLowerCase().includes(area.toLowerCase()))
                return val.location.toLowerCase().includes(area.toLowerCase())
            })
        },

        getLoc(){
            if(this.getLocAva){
                EventBus.$emit("getLoc", true)
                this.getLocAva = false
                setTimeout(()=>{
                    this.getLocAva = true
                }, 8000)
            }
            
        },

        // 翻译，由translate.js提供字典
        getLang(str){
            if(window.navigator.language != "zh-CN"){
                return str
            } else {
                return putCN(str)
            }
        }
    }
}
</script>

<style scoped>

.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #2D3133;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #2D3133;
}



#carea{
  width: 100%;
}

#area-map{
  width: 92%;
  height: 700px;
  margin-left: auto;
  margin-right: auto;
}

.area-list-search{
  width: 89%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}


.area-po-search{
  width: 90%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

.area-po-res{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

#area table{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.title-area{
    line-height:24px;
}

@media only screen and (max-width: 800px) {

  #area-map{
    width: 100%;
    height: 450px;
  }
}
</style>


