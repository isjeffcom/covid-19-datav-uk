<template>
    <div id="carea">
        <!-- REGIONAL MAP -->

        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
        <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Regions")}}</span><br>
            <div style="font-size: 16px;"><b style="color: #7DA5B5;">{{unknown}}</b> {{getLang("Unknown Locations")}}</div>
            <div style="font-size: 12px; opacity: 0.5;">* {{getLang("At least 1 day in arrears")}}</div>
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
        <div id="area-map" v-if="currentAreaView == 'Map'">
            <osmmap :mapData="mapData"></osmmap>
        </div>

        <!-- IF LIST -->
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
    </div>
</template>

<script>
import { putCN } from '../../translate'
import osmmap from '../widgets/map'
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
            listSearch: "",
            areaViews: ["Map", "List"],
            currentAreaView: "Map",
            areaList: []
        }
    },

    mounted(){
        //this.areaList = this.renderArea
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

        // 更换区域，地图<->列表
        switchAreaView(idx){
            this.currentAreaView = idx
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

input{
  background: #373D41;
  border: 1px solid rgba(255,255,255,0.05);
  width: 100%;
  height: 32px;
  color: #CED3D6;
  -webkit-appearance: none;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

input:focus {
  border: 1px solid rgba(70,222,255,1);
  outline: none;
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

#area table{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 800px) {

  #area-map{
    width: 100%;
    height: 450px;
  }
}
</style>


