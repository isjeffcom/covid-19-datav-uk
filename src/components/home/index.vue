<template>
  <div id="home" v-if="loaded">

    <div id="update">
      <span>Last Update: {{update}}</span>
    </div>

    <div class="tab-switcher data-switcher">
      <div 
        class="ds-single" 
        v-for="(item, index) in allData" 
        :key="item.id" :style="'width:calc(100%/' + allData.length + ');'" 
        v-on:click="switchData(index)">

        <div class="ds-text">
          <span>{{item.source}}</span>
        </div>

        <div class="ds-ids" v-if="index == selected"></div>
        
      </div>
    </div>

    <div id="overall">
      <div id="overall-inner">

        <div id="overall-show">
          <div 
            class="overall-single" 
            v-for="(value, name) in renderData" 
            :key="name">

            <div class="overall-single-value" :style="value=='---' ? 'opacity: 0.2;font-weight:bold;' : 'opacity: 1;font-weight:bold;color:' + getColor(name)">
              
              <span v-if="value=='---'">{{value}}</span>

              <ICountUp
                :delay="100"
                :endVal="value"
                :options="countUpOptions"
                v-else
              ></ICountUp>
              
            </div>

            <div class="overall-single-title">
              <span>{{name}}</span>
            </div>

            <div class="overall-single-compare">
              <span :style="'color:' + getColor(name) + ';font-weight: bold; font-size: 14px;opacity: 0.8;'">{{  compare(value, name) }}</span>
            </div>

            

          </div>

        </div>

        <div id="overall-more">
          <div
            class="overall-single" 
            v-for="(value, name) in hiddenData" 
            :key="name">

            <div class="overall-single-value" :style="value=='---' ? 'opacity: 0.2;font-weight:bold;' : 'opacity: 1;font-weight:bold;color:' + getColor(name)">
              <span v-if="value=='---'">{{value}}</span>
              <ICountUp
                :delay="300"
                :endVal="value"
                :options="countUpOptions"
                v-else
              />
            </div>

            <div class="overall-single-title">
              <span>{{name}}</span>
            </div>
            
          </div>
        </div>

      </div>

      <div class="overall-source" v-on:click="sourcePopup()">
        <div class="overall-source-inner">
          <div style="margin-top: 2px;margin-right: 8px;">Source</div>
          <img src="https://i.ibb.co/7XMdBfH/info.png" alt="source info">
        </div>
      </div>

      <div id="chart" v-if="chartLoaded">
        <apexchart width="100%" height="320px" type="area" :options="chartOptions" :series="chartData"></apexchart>
      </div>


      <div id="area" v-if="areaLoaded">

        <div id="area-title">
          <span>By Region</span><br>
          <span style="font-size: 16px;"><b style="color: #7DA5B5;">{{unknown}}</b> Unknown Locations</span><br>
          <span style="font-size: 12px; opacity: 0.5;">* Current data only covered England and Scotland (at least 1 day in arrears). </span>
        </div>

        <div class="tab-switcher data-switcher">
          <div 
            class="ds-single" 
            v-for="(item, index) in areaViews" 
            :key="index" 
            :style="'width:calc(100%/' + allData.length + ');'" 
            v-on:click="switchAreaView(item)">

            <div class="ds-text">
              <span>{{item}}</span>
            </div>

            <div class="ds-ids" v-if="item == currentAreaView"></div>
            
          </div>
        </div>

        <div id="area-map" v-if="currentAreaView == 'map'">
          <ccmap :mapData="mapData"></ccmap>
          <!--cmap :mapData="mapData"></cmap-->
        </div>

        <div v-if="currentAreaView == 'list'">
          <table>
            <tr>
              <th>Location</th>
              <th>Cases</th>
            </tr>

            <tr v-for="item in renderArea" :key="item.location">
              <td>{{item.location}}</td>
              <td>{{item.number}}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>

    <div id="sources">
      <span>Sources</span>
      <li><a href="https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public" target="_blank">COVID-19: latest information and advice (UK Gov)</a></li>
      <li><a href="https://www.worldometers.info/coronavirus/" target="_blank">COVID-19 CORONAVIRUS OUTBREAK (Worldometers)</a></li>
      <li><a href="https://www.gov.uk/government/publications/coronavirus-covid-19-number-of-cases-in-england/coronavirus-covid-19-number-of-cases-in-england" target="_blank">COVID-19: number of cases in England (UK Gov)</a></li>
      <li><a href="https://www.gov.scot/coronavirus-covid-19/" target="_blank">Coronavirus in Scotland (Scotland Gov)</a></li>
    </div>

    <alert 
      :title="sourceAlert.title" 
      :content="sourceAlert.content" 
      :submit="sourceAlert.submit" 
      :topColor="sourceAlert.topColor" 
      :bgColor="sourceAlert.bgColor" 
      v-if="sourceAlertEnabled">
    </alert>

    
  </div>
</template>

<script>
import { genGet } from '../../request'
import { getDateFromTs, indexOfObjArr } from '../../utils'
import alert from '../widgets/alert'
//import cmap from '../widgets/cmap'
import ccmap from '../widgets/ccmap'
import ICountUp from 'vue-countup-v2'
import { EventBus } from '../../bus'

export default {
  name: 'home',
  components:{
    //cmap,
    ccmap,
    alert,
    ICountUp
  },
  data(){
    return{
      loaded: false,
      chartLoaded: false,
      areaLoaded: false,
      api: "/",
      api_history: "/history",
      api_locations: "/locations",
      selected: 0,
      selectedChart: "confirm",
      rematchWording: [
        ['confirmed', 'confirm'],
        ['negative', 'nagative']
      ],
      allData: [],
      renderData: {},
      hiddenData: {},
      compareData: {},
      renderArea: {},
      mapData: [],
      historyData: [],
      update:"",
      unknown: 0,
      areaViews: ["map", "list"],
      currentAreaView: "map",
      countUpOptions:{
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      },
      sourceAlertEnabled: false,
      sourceAlert:{
        title:"Source",
        content: "",
        submit: "OK",
        topColor: "#2D3133",
        bgColor: "#8FA8B8",
      },
      colors:[
        {
          txt: "confirmed",
          color: "#F62E3A"
        },
        {
          txt: "death",
          color: "#949BB5"
        },
        {
          txt: "cured",
          color: "#31DA93"
        },
        {
          txt: "negative",
          color: "#46DEFF"
        },
        {
          txt: "serious",
          color: "#D21414"
        },
        {
          txt: "suspected",
          color: "#A98AFF"
        },
      ],
      chartOptions: {
        
        chart: {
          id: 'main-chart',
          foreColor: '#8D9EAA',
          toolbar:{
            show: false
          }
        },
        colors:["#F62E3A", "#949BB5"],
        xaxis: {
          categories: [0, 0, 0, 0, 0, 0, 0, 0]
        }
      },
      chartData: [
        {
          name: 'Confirmed',
          data: [0,0,0,0,0,0,0]
        },
        {
          name: 'Death',
          data: [0,0,0,0,0,0,0]
        },
      ]
    }
  },

  mounted(){
    this.getData(this.api)

  },

  created(){
    EventBus.$on("alert-clicked", ()=>{
      setTimeout(()=>{
        this.sourceAlertEnabled = false
      }, 500)
    })
  },
  methods:{
    getData(api){
      genGet(api, {}, (res)=>{
        this.allData = res.data.data
        this.renderArea = JSON.parse(this.allData[0].area)
        this.produceRenderData()
        this.calUnknown()
        this.update = getDateFromTs(this.allData[0].ts)

        this.loaded = true

        this.getHistory(this.api_history)
      })
    },

    calUnknown(){

      let all = 0
      this.renderArea.forEach(el => {
        all = all + parseInt(el.number)
      })

      this.unknown = this.allData[0].confirmed - all

    },

    getHistory(api){

      genGet(api, {}, (res)=>{

        if(res.status){
          let categories = []
          let confirmed = []
          let death = []

          this.historyData = res.data.data

          this.historyData.forEach((el, index) => {
            
            el.date = getDateFromTs(el.date, "datesimple")
            categories.push(el.date)
            confirmed.push(el.confirmed)
            death.push(el.death)

            

          })

          confirmed.push(this.allData[0].confirmed)
          death.push(this.allData[0].death)
          categories.push(getDateFromTs(Date.parse( new Date()), "datesimple"))

          this.chartOptions.xaxis.categories = categories
          this.chartData[0].data = confirmed
          this.chartData[1].data = death

        }

        this.chartLoaded = true
        this.getLocations(this.api_locations)
        
      })
    },

    getLocations(api){
      var that = this
      genGet(api, {}, (res)=>{
        let d = res.data.data
         
        var markers = []
        this.renderArea.forEach((el, index) => {
          
          // Match location from location cases list
          let idx = indexOfObjArr(el.location, d, 'name')

          // If matched
          if(el.number != 0 && idx != -1){
            d[idx].confirmed = parseInt(el.number)
            markers.push(d[idx])
          }
          
        })

       

        this.mapData = markers

        setTimeout(()=>{
          that.areaLoaded = true
        }, 200)
        
      })
    },

    findAreaData(target, arr){
      var res = -1
      for(let i=0;i<arr.length;i++){
        if(target == arr[i].location){
          res = arr[i].number
        }
      }

      return res
    },

    produceRenderData(){
      const all = this.allData[this.selected]
      this.renderData = {
        confirmed: all.confirmed,
        death: all.death,
        cured: all.cured == 0 ? this.allData[1].cured : all.cured,
        negative: all.negative == 0 ? "---" : all.negative,
      }

      this.hiddenData = {
        tested: this.renderData.negative != "---" ? this.renderData.confirmed + this.renderData.negative : "---",
        serious: all.serious == 0 ? "---" : all.serious,
        suspected: all.suspected == 0 ? "---" : all.suspected,
      }
    },

    getColor(str){
      
      const colors = this.colors
      for(let i=0;i<colors.length;i++){
        if(str == colors[i].txt){
          return colors[i].color
        }
      }
    },

    switchData(idx){
      this.selected = idx
      this.produceRenderData()
    },

    switchAreaView(idx){
      this.currentAreaView = idx
    },

    compare(value, name){
      if(this.historyData.length > 0){
        let res = parseInt(value - this.historyData[this.historyData.length - 1][name])
        if(isNaN(res)){
          return '---'
        } else {
          return res >= 0 ? '+' + res : '-' + res
        }
        
      } else {
        return '+0'
      }
      
    },

    sourcePopup(){
      let source = this.allData[this.selected]
      this.sourceAlert.content = "<br><br>Source Name: " + source.source + ". <br><br> Link:" + "<a href='" + source.link + " style='color:#3F8BBE;'>" + source.link + "</a>"
      this.$nextTick(()=>{
        this.sourceAlertEnabled = true
      })
      
    },

    correctWording(str){

      var res = false

      for(let i=0;i<this.rematchWording.length; i++){
        if(str == this.rematchWording[i][0]){
          res =  this.rematchWording[i][1]
        }
      }

      return res ? res : str
    }

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

#update{
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  color: #CED3D6;
  opacity: 0.2;
}

.tab-switcher{
  width: 100%;
  display: flex;
  color: #CED3D6;
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
}

.ds-single{
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #2D3133;
}

.ds-ids{
  height: 4px;
  width: 50%;
  background: #51606A;
  margin-top: 4px;
  margin-left: auto;
  margin-right:auto;
}

#overall{
  width: 100%;
  color: #CED3D6;
}

#overall-inner{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#overall-show{
  display: flex;
  width: 100%;
}

#overall-more{
  display: flex;
  width: 100%;
}

.overall-single{
  width: calc(100%/4);
  height: 100px;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.overall-single-bg{
  position: absolute;
  background: #2D3133;
  border-radius: 8px;
  width: calc(100%/12);
  height: 70px;
  margin-left: 160px;
  z-index:1;
}

.overall-single-title{
  font-size: 14px;
  font-weight: bold;
  opacity: 0.6;
  z-index:2;
}

.overall-single-value{
  font-size: 24px;
  font-weight: bold;
  z-index:2;
}

.overall-source{
  width: 92%;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
}

.overall-source-inner{
  width: 100px;
  position: absolute;
  right: 5.5%;
  color: #51606A;
  font-size: 16px;
  font-weight: bold;
  opacity: 0.6;
  display: flex;
  cursor: pointer;
}

.overall-source img{
  width: 20px;
  height: 20px;
}

#chart{
  width: 90%;
  margin-left:auto;
  margin-right: auto;
}

#area{
  width: 100%;
}

#area-map{
  width: 90%;
  height: 700px;
  margin-left: auto;
  margin-right: auto;
}

#area-title{
  width: 90%;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

#area table{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

#sources{
  width: 90%;
  height: 220px;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  color: #CED3D6;
  font-size: 24px;
  line-height: 36px;
}


#sources a{
  color: #3F8BBE;
  text-decoration: underline;
  font-size: 16px;
  font-weight: bold;
}

#sources a:active{
  background: #FEB547;
}


@media only screen and (max-width: 800px) {


  #area-map{
    width: 100%;
    height: 450px;
  }

  #sources{
    height: 320px;
  }

  .overall-source-inner{
    right: 10px;
  }
}

</style>
