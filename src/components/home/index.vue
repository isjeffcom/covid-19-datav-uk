<template>
  <div id="home">

    <div v-if="error">
      Fail to connect API, please report ISSUE to:
      <li>https://github.com/isjeffcom/coronvirusFigureUK</li>
      <li>https://spectrum.chat/covid-19-uk-update?tab=posts</li>
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

    <div id="overall" v-if="loaded">
      <div id="overall-inner">

        <div id="overall-show">
          <div 
            class="overall-single" 
            v-for="(value, name) in renderData" 
            :key="name">

            <div class="overall-single-value" :style="value=='---' ? 'opacity: 0.2;font-weight:bold;' : 'opacity: 1;font-weight:bold;color:' + getColor(name)">
              
              <span v-if="value == '---'">{{value}}</span>
              <span v-if="value != '---' && isNaN(value)">{{value}}</span>

              <ICountUp
                :delay="100"
                :endVal="value"
                :options="countUpOptions"
                v-if="value!='---' && !isNaN(value)"
              ></ICountUp>
              
            </div>

            <div class="overall-single-title">
              <span>{{getLang(name)}}</span>
            </div>

            <div class="overall-single-compare">
              <span :style="'color:' + getColor(name) + ';font-weight: bold; font-size: 14px;opacity: 0.8;'">{{  compare(value, name) }}</span>
            </div>

            

          </div>

        </div>

        <div id="update">
              <div>{{getLang("Update")}}: {{update}}</div>
              <!--div class="overall-source" v-on:click="sourcePopup()">
                <div class="overall-source-inner">
                  <img src="https://i.ibb.co/7XMdBfH/info.png" alt="source info">
                  <div style="margin-top: 2px;margin-right: 8px;">Source</div>
                </div>
              </div-->
            </div>

      </div>

      <div class="title">
        <span>{{getLang("Confirmed")}}</span><br>
      </div>

      <div class="chart" v-if="chartLoaded">
        <apexchart width="100%" height="320px" type="area" :options="chartOptions" :series="chartData_trend"></apexchart>
      </div>

      <div class="title">
        <span>{{getLang("Increment")}}</span><br>
      </div>

      <div class="chart" v-if="chartLoaded">
        <apexchart width="100%" height="320px" type="bar" :options="chartOptions" :series="chartData_growth"></apexchart>
      </div>

      <div class="title">
        <span>{{getLang("Tested")}}</span><br>
        <div style="font-size: 12px; opacity: 0.5;">{{getLang("Tested = Confirmed + Negative")}}</div>
        <div style="font-size: 12px; opacity: 0.5;">* {{getLang("Data Incomplete")}}</div>
      </div>

      <div class="chart" v-if="chartLoaded">
        <apexchart width="100%" height="320px" type="area" :options="chartOptions" :series="chartData_tested"></apexchart>
      </div>


      <div id="area" v-if="areaLoaded">

        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
          <div class="title-area inner" style="width: 90%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Regions")}}</span><br>
            <div style="font-size: 16px;"><b style="color: #7DA5B5;">{{unknown}}</b> {{getLang("Unknown Locations")}}</div>
            <div style="font-size: 12px; opacity: 0.5;">* {{getLang("At least 1 day in arrears")}}</div>
          </div>
          
        </div>

        <div class="tab-switcher data-switcher">
          <div 
            class="ds-single" 
            v-for="(item, index) in areaViews" 
            :key="index" 
            :style="'width:calc(100%/' + allData.length + ');'" 
            v-on:click="switchAreaView(item)">

            <div class="ds-text">
              <span>{{getLang(item)}}</span>
            </div>

            <div class="ds-ids" v-if="item == currentAreaView"></div>
            
          </div>
        </div>

        <div id="area-map" v-if="currentAreaView == 'map'">
          <ccmap :mapData="mapData"></ccmap>
        </div>

        <div v-if="currentAreaView == 'list'" style="margin-top:40px;">
          <table>
            <tr>
              <th>{{getLang("Location")}}</th>
              <th>{{getLang("Cases")}}</th>
            </tr>

            <tr v-for="item in renderArea" :key="item.location">
              <td>{{item.location}}</td>
              <td>{{item.number}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div id="more">
      <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/" target="_blank">
        <img src="https://i.ibb.co/RNJTwnx/btn2.png" alt="to NHS official website for more help and information">
      </a>
    </div>

    <div id="sources">
      <span>{{getLang("References")}}</span>
      <li><a href="https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public" target="_blank">[Gov]COVID-19: latest information and advice</a></li>
      <li><a href="https://www.gov.uk/government/publications/coronavirus-covid-19-number-of-cases-in-england/coronavirus-covid-19-number-of-cases-in-england" target="_blank">[Gov]COVID-19: number of cases in England</a></li>
      <li><a href="https://www.gov.scot/coronavirus-covid-19/" target="_blank">[Gov]Coronavirus in Scotland</a></li>
      <li><a href="https://www.arcgis.com/apps/opsdashboard/index.html#/f94c3c90da5b4e9f9a0b19484dd4bb14" target="_blank">[Gov]UK GIS Dashboard</a></li>
      <li><a href="https://www.gov.uk/search/news-and-communications" target="_blank">[Gov]UK Gov Announcement (search CMO for history data)</a></li>
      <li><a href="https://twitter.com/DHSCgovuk" target="_blank">[Gov]DHSCgovuk Official Twitter</a></li>
      <li><a href="https://www.worldometers.info/coronavirus/" target="_blank">[Media]COVID-19 CORONAVIRUS OUTBREAK (Worldometers)</a></li>
    </div>

    <div id="donation" v-if="areaLoaded">
      <div id="d-inner">
        <div id="d-cont">
          <div id="d-title">{{getLang("Support Us")}}</div>
          <div id="d-sub">{{getLang("We promise free access, however, maintaining this server has costs and it's not cheap.")}}</div>
        </div>
        
        <div id="d-btn"> 
          <button v-on:click="openDonate(true)">{{getLang("SUPPORT")}}</button> 
        </div>
      </div>
    </div>

    <alert 
      :title="sourceAlert.title" 
      :content="sourceAlert.content" 
      :submit="sourceAlert.submit" 
      :topColor="sourceAlert.topColor" 
      :bgColor="sourceAlert.bgColor" 
      v-if="sourceAlertEnabled">
    </alert>

    <donate v-if="donate"></donate>

    
  </div>
</template>

<script>
import { genGet } from '../../request'
import { getDateFromTs, indexOfObjArr } from '../../utils'
import alert from '../widgets/alert'
import donate from '../widgets/donate'
import ccmap from '../widgets/ccmap'
import ICountUp from 'vue-countup-v2'
import { EventBus } from '../../bus'

import { putColor } from './color'
import { putCN } from '../../translate'

export default {
  name: 'home',
  components:{
    //cmap,
    ccmap,
    alert,
    donate,
    ICountUp
  },
  data(){
    return{
      error: false,
      lang: "",
      loaded: false,
      chartLoaded: false,
      areaLoaded: false,
      api: "/",
      api_history: "/historyfigures",
      api_locations: "/locations",
      selected: 0,
      selectedChart: "confirm",
      allData: [],
      renderData: {},
      hiddenData: {},
      compareData: {},
      renderArea: {},
      mapData: [],
      historyData: [],
      growthData: [],
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
      
      chartOptions: {
        
        chart: {
          foreColor: '#8D9EAA',
          toolbar:{
            show: false,
          }
        },
        colors:["#F62E3A", "#949BB5"],
        
        xaxis: {
          categories: [0, 0, 0, 0, 0, 0, 0, 0],
          labels:{
            style: {
              fontSize:  '8px',
            },
          },
        },
        taxis:{
          abels:{
            style: {
              fontSize:  '8px',
            },
          },
        }
      },
      chartData_trend: [
        {
          name: 'Confirmed',
          data: [0,0,0,0,0,0,0]
        },
        {
          name: 'Death',
          data: [0,0,0,0,0,0,0]
        },
      ],

      chartData_growth: [
        {
          name: 'New Cases',
          data: [0,0,0,0,0,0,0]
        }
      ],
      chartData_tested: [
        {
          name: 'All',
          data: [0,0,0,0,0,0,0]
        },
        {
          name: 'Increment',
          data: [0,0,0,0,0,0,0]
        }
      ],
      donate: false
    }
  },

  mounted(){
    this.getData(this.api)
    this.lang = window.navigator.language
  },

  created(){
    EventBus.$on("alert-clicked", ()=>{
      setTimeout(()=>{
        this.sourceAlertEnabled = false
      }, 500)
    })

    EventBus.$on("donate-close", ()=>{
      this.donate = false
    })
  },
  methods:{
    getData(api){

      genGet(api, {}, (res)=>{

        if(res.status){
          this.allData = res.data.data

          if(this.allData[0].area && this.allData[0].area != ""){
            this.renderArea = JSON.parse(this.allData[0].area)
          }
          
          this.produceRenderData()
          this.calUnknown()
          this.update = getDateFromTs(this.allData[0].ts)

          this.loaded = true

          this.getHistory(this.api_history)
        } else {
          this.error = true
        }
        
        
      })
    },

    calUnknown(){

      let all = 0
      if(this.renderArea){
        this.renderArea.forEach(el => {
          all = all + parseInt(el.number)
        })
      }

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

          // Push latest data as its not belong to the history
          confirmed.push(this.allData[0].confirmed)
          death.push(this.allData[0].death)

          // Push last one
          categories.push(getDateFromTs(Date.parse( new Date()), "datesimple"))

          this.chartOptions.xaxis.categories = categories
          this.chartData_trend[0].data = confirmed
          this.chartData_trend[1].data = death

        }

        
        this.getLocations(this.api_locations)

        this.chartData_growth[0].data = this.calGrowthRate(this.historyData)

        let testedOverall = this.calTested(this.historyData)
        this.chartData_tested[0].data = testedOverall.all
        this.chartData_tested[1].data = testedOverall.growth
        this.chartLoaded = true

        this.reCalCoTe()
        
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

    getColor(str){
      return putColor(str)
    },

    getLang(str){
      if(this.lang != "zh-CN"){
        return str
      } else {
        return putCN(str)
      }
      
    },

    calGrowthRate(data){
      var res = []

      let today = parseInt(this.allData[0].confirmed)

      data.forEach((el, index) => {

        // If first one
        if(index == 0){
          res.push(el.confirmed - 0)
        } 

        // If last one
        else if(index == data.length - 1){
          // Do nothing...
          res.push(today - el.confirmed)
        }
        
        //
        else {
          res.push(el.confirmed - data[index-1].confirmed)
        }
      })

      res.unshift(0)

      return res
    },

    calTested(data){
      var all = []
      var growth = []

      //let today = parseInt(this.allData[0].confirmed + this.allData[0].negative)


      data.forEach((el,index) => {
        if(el.confirmed == 0 || el.negative == 0){
          
          all.push(0)
          growth.push(0)
          
        } else {
          let tested = el.confirmed + el.negative
          all.push(tested)

          if(index - 1 > 0){
            growth.push(tested - (data[index-1].confirmed + data[index-1].negative))
          } else {
            growth.push(0)
          }
        }

        // Today
        if(index == data.length - 1){
          let today = this.allData[0].confirmed + this.allData[0].negative
          let lastDay = (data[data.length-1].confirmed + data[data.length-1].negative)
          all.push(today)
          growth.push(today - lastDay)
        }
        
      })
      
      return {all: all, growth: growth}
    },

    produceRenderData(){
      const all = this.allData[this.selected]
      let data = {
        confirmed: all.confirmed,
        death: all.death,
        tested: all.negative != 0 ? all.confirmed + all.negative : "---",
        negative: all.negative == 0 ? "---" : all.negative,
        "D Co./Te.": all.negative != 0 ? Number.parseFloat(((all.confirmed / (all.confirmed + all.negative))).toFixed(2) * 100) + "%" : "---",
        cured: all.cured == 0 ? "---" : all.cured,
        serious: all.serious == 0 ? "---" : all.serious,
        suspected: all.suspected == 0 ? "---" : all.suspected,
      }

      this.renderData = data

    },

    reCalCoTe(){
      if(this.historyData){
        // All tested incresment
        let testAll = this.chartData_tested[1].data
        let confirmAll = this.chartData_growth[0].data
        let testGrowth = testAll[testAll.length - 1] != 0 ? testAll[testAll.length - 1] : testAll[testAll.length - 2]
        let confirmed = confirmAll[testAll.length - 1] != 0 ? confirmAll[testAll.length - 1] : confirmAll[testAll.length - 2]
        this.renderData["D Co./Te."]= Number.parseFloat(((confirmed / testGrowth)).toFixed(4) * 100) + "%" 
      }
    },

    switchData(idx){
      this.selected = idx
      this.produceRenderData()
      if(idx == 0){
        this.reCalCoTe()
      }
      
    },

    switchAreaView(idx){
      this.currentAreaView = idx
    },

    compare(value, name){

      if(this.historyData.length > 0){
        let res = parseInt(value - this.historyData[this.historyData.length - 1][name])

        // HARD FIX
        if(name == "tested"){
          res = parseInt(value - (this.historyData[this.historyData.length - 1].confirmed + this.historyData[this.historyData.length - 1].negative))
        }

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

    openDonate(bol){
      this.donate = bol
    }

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#home{
  color: #CED3D6;
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


#update{
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding-bottom: 20px;
  color: #CED3D6;
  opacity: 0.2;
  margin-top: -10px;
}

.tab-switcher{
  width: 100%;
  display: flex;
  color: #CED3D6;
  text-align: center;
  margin-bottom: 0px;
  font-size: 18px;
  background: #1D1F21;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.ds-single{
  padding-top: 14px;
  padding-bottom: 0px;
  cursor: pointer;
  text-align: center;
}

.ds-single:active{
  background: rgba(0,0,0,0.1);
}

.ds-ids{
  height: 4px;
  width: 5%;
  background: #46DEFF;
  border-radius: 100px;
  margin-top: 8px;
  margin-left: auto;
  margin-right:auto;
}

#overall{
  width: 100%;
  
}

#overall-inner{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: #1D1F21;
  border-radius: 0px 0px 36px 36px;
}

#overall-more{
  display: flex;
  width: 100%;
}

#overall-show{
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
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
  font-size: 12px;
  font-weight: bold;
  opacity: 0.6;
  z-index:2;
}

.overall-single-value{
  font-size: 20px;
  font-weight: bold;
  z-index:2;
}

.overall-source{
  width: 92%;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.overall-source-inner{
  width: 100%;
  color: #51606A;
  font-size: 16px;
  font-weight: bold;
  opacity: 0.6;
  cursor: pointer;
}

.overall-source img{
  width: 20px;
  height: 20px;
}

.chart{
  width: 90%;
  margin-left:auto;
  margin-right: auto;
  font-size: 12px;
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

.title{
  width: 90%;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: auto;
}

#area table{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

#d-title{
  font-size: 24px; 
  font-weight: bold;
}

#donation{
  width: 100%; 
  height: 100px;
  margin-top: 40px;
  color: #111;
}

#d-inner{
  width: 100%; 
  height: 100%;
  background: #FFC634;
  border-bottom: 8px solid #152DFF;
  margin-left: auto;
  margin-right:auto; 
  display: flex;
}

#d-cont{
  width: 90%;
}

#d-title{
  font-size: 24px;
  font-weight: bold;
  margin-top: 24px;
  margin-left: 24px;
}

#d-sub{
  font-size: 16px; 
  font-weight: bold;
  margin-top: 4px; 
  margin-left: 24px;
}

#d-btn{
  width: 10%; 
  margin-top: 28px;
}

#d-btn button{
  position: relative; 
  background: #FFC634; 
  border: 2px solid #000; 
  border-radius: 100px; 
  cursor:pointer; 
  padding: 12px;
  color: #000;
  font-weight: bold;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#d-btn button:hover{
  background: #000; 
  color: #fff;
}

#more{
  width: 32%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}

#more img{
  width: 100%;
}

#sources{
  width: 90%;
  margin-top: 40px;
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

  .overall-source-inner{
    right: 10px;
  }

  .ds-ids{
    width: 20%;
  }

  #donation{
    height: 240px;
  }

  #d-cont{
    width: 100%;
    padding-top: 2px;
  }

  #d-btn{
    width: auto;
    margin-left: 20px;
  }

  #d-inner{
    display: block;
  }

  #more{
    width: 92%;
  }

  #more img{
    width: 100%;
  }
}

</style>
