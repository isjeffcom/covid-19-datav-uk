<template>
  <div id="home">

    <div v-if="error">
      Fail to connect API, please report ISSUE to:
      <li>https://github.com/isjeffcom/coronvirusFigureUK</li>
      <li>https://spectrum.chat/covid-19-uk-update?tab=posts</li>
    </div>

    <!-- CURRENT FIGURES -->
    <!-- current figure switcher -->
    <div class="tab-switcher">
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

    <!-- current figure container -->
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

              <!-- count up animation, provided by vue-countup package -->
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

        <!-- update date -->
        <div id="update">
          <div>{{getLang("Update")}}: {{update}}</div>
        </div>

      </div>

      <!-- CHARTS -->
      <!-- charts container -->
      <div id="chart" v-if="chartLoaded">

        <!-- Sector Title -->
        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;margin-top:2px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Data")}}</span><br>
            <div style="font-size: 12px; opacity: 0.5;">* {{getLang("Data might be incompleted")}}</div>
          </div>
          
        </div>

        <!-- Charts tab switcher -->
        <div class="tab-switcher">
          <div 
            class="ds-single" 
            v-for="(item, index) in allCharts" 
            :key="index" :style="'width:calc(100%/' + allCharts.length + ');'" 
            v-on:click="switchChartView(index)">

            <div class="ds-text">
              <span>{{getLang(item)}}</span>
            </div>

            <div class="ds-ids" v-if="index == currentChartView"></div>
            
          </div>
        </div>

        <!-- 3 charts, confirmed, death, tested -->
        <!-- use charts components in /src/components/charts -->
        <div id="chart-inner">

          <div v-show="currentChartView == 0">
            <charts :datas="confirmCharts"></charts>
          </div>

          <div v-show="currentChartView == 1">
            <charts :datas="deathCharts"></charts>
          </div>

          <div v-show="currentChartView == 2">
            <charts :datas="testedCharts"></charts>
          </div>

        </div>

      </div>

      <!-- HERD IMMUNITY -->
      <div id="herd" style="margin-top:40px;margin-bottom:40px;" v-if="loaded">
        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Herd Immunity")}}</span><br>
            <div style="font-size: 12px; opacity: 0.5;">{{getLang("UK Population")}}: 66.44 {{getLang("Million")}} | {{getLang("Immunity Point")}}: 60%</div>
          </div>
        </div>

        <!-- use progress bar component, not fully constructed, very poor code structure -->
        <ptg :mData="[allData[0].confirmed, 66440000]" style="margin-top:20px;margin-bottom:20px;"></ptg>

      </div>


      <!-- REGIONAL MAP -->
      <div id="area" v-if="areaLoaded">

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
            :style="'width:calc(100%/' + allData.length + ');'" 
            v-on:click="switchAreaView(item)">

            <div class="ds-text">
              <span>{{getLang(item)}}</span>
            </div>

            <div class="ds-ids" v-if="item == currentAreaView"></div>
            
          </div>
        </div>

        <!-- IF MAP -->
        <!-- use ccmap from /src/components/widgets/ccmap -->
        <div id="area-map" v-if="currentAreaView == 'map'">
          <ccmap :mapData="mapData"></ccmap>
        </div>

        <!-- IF LIST -->
        <div v-if="currentAreaView == 'list'" style="margin-top:20px;">

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
    </div>

    <!-- MORE INFO BUTTON -->
    <div id="more">
      <div style="margin-bottom:20px;">

        <a href="https://www.google.com/maps/d/u/0/embed?mid=1yCPR-ukAgE55sROnmBUFmtLN6riVLTu3&ll=54.019029244689136%2C-1.956174250177014&z=7" target="_blank">
          <img src="https://i.ibb.co/F3MSgQC/dsc1322122.png" alt="to NHS official website for more help and information">
        </a>

      </div>

      <div>

        <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/" target="_blank">
          <img src="https://i.ibb.co/RNJTwnx/btn2.png" alt="to NHS official website for more help and information">
        </a>

      </div>

    </div>

    <!-- GROUP INFO -->
    <div id="sources">
      <span>{{getLang("Group Up")}}</span>
      <li><a href="https://spectrum.chat/covid-19-uk-update" target="_blank">{{getLang("By")}} Spectrum.chat</a></li>
      <li><a href="https://jq.qq.com/?_wv=1027&k=5Ajnx1w" target="_blank">{{getLang("By")}} QQ</a></li>
    </div>

    
    <!-- DATA REFERENCES -->
    <div id="sources">
      <span>{{getLang("References")}}</span>
      <li><a href="https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public" target="_blank">[Gov]COVID-19: latest information and advice</a></li>
      <li><a href="https://www.gov.uk/government/publications/coronavirus-covid-19-number-of-cases-in-england/coronavirus-covid-19-number-of-cases-in-england" target="_blank">[Gov]COVID-19: number of cases in England</a></li>
      <li><a href="https://www.gov.scot/coronavirus-covid-19/" target="_blank">[Gov]Coronavirus in Scotland</a></li>
      <li><a href="https://www.publichealth.hscni.net/news/covid-19-coronavirus" target="_blank">[Gov]COVID-19 (coronavirus) Northern Ireland</a></li>
      <li><a href="https://gov.wales/written-statement-coronavirus-covid-19-1" target="_blank">[Gov]Written Statement: COVID-19 Wales</a></li>
      <li><a href="https://www.arcgis.com/apps/opsdashboard/index.html#/f94c3c90da5b4e9f9a0b19484dd4bb14" target="_blank">[Gov]UK GIS Dashboard</a></li>
      <li><a href="https://www.gov.uk/search/news-and-communications" target="_blank">[Gov]UK Gov Announcement (search CMO for history data)</a></li>
      <li><a href="https://twitter.com/DHSCgovuk" target="_blank">[Gov]DHSCgovuk Official Twitter</a></li>
      <li><a href="https://www.worldometers.info/coronavirus/" target="_blank">[Media]COVID-19 CORONAVIRUS OUTBREAK (Worldometers)</a></li>
    </div>

    <!-- AUTHOR INFO -->
    <div id="author">
      <div id="author-inner">
        <a href="https://www.isjeff.com" target="_blank">@Jeff Wu</a>
      </div>
    </div>

    <!-- DONATION FOOTER -->
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

    <!-- DONATION OVERLAP -->
    <!-- donation overlap from /src/components/widgets/donate -->
    <donate v-if="donate"></donate>

  </div>
</template>

<script>
// Utils
import { genGet } from '../../request'
import { getDateFromTs, indexOfObjArr, deepCopy } from '../../utils'

// Components
import charts from '../../components/charts'
import ptg from '../../components/ptg'
import donate from '../../components/widgets/donate'
import ccmap from '../../components/widgets/ccmap'
import ICountUp from 'vue-countup-v2'
import { EventBus } from '../../bus'

// Custom
import { putColor } from './color'
import { putCN } from '../../translate'

// Charts calculation functions
import { confirmCal } from './confirmed'
import { deathCal } from './death'
import { testCal } from './tested'


export default {
  name: 'home',
  components:{
    charts,
    ptg,
    ccmap,
    donate,
    ICountUp,
  },
  data(){
    return{
      // If couldn't get data from API, display error info
      error: false,

      // Language
      lang: "",

      // Loaded status for different section, render only if data ready
      loaded: false,
      chartLoaded: false,
      areaLoaded: false,

      // List search input var
      listSearch: "",

      // API URLs
      api: "/",
      api_history: "/historyfigures",
      api_locations: "/locations",

      // Selected data sources on figure section
      selected: 0,

      // Data storage variable
      allData: [],
      renderData: {},
      renderArea: {},
      mapData: [],
      historyData: [],

      // Update time var
      update:"",

      // Unknow location cases count var
      unknown: 0,

      // Area tab switcher and current status
      areaViews: ["map", "list"],
      currentAreaView: "map",

      // Render options Count-up package 
      countUpOptions:{
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      },

      // Render options for swiper package
      swiperOptions:{
        allowTouchMove: false
      },
      
      // Charts render options for APEXCHART package
      chartOptions: {
        chart: {
          foreColor: '#8D9EAA',
          toolbar:{
            show: false,
          },
          zoom:{
            enabled: false
          },
        },
        tooltip:{
          y:{}
        },
        dataLabels:{
          enabled: false,
           style: {
                fontSize: '8px',
                borderWidth: 0,
                padding: 2,
                fontWeight: "normal"
            },
        },
        colors:["#F62E3A", "#949BB5"],
        xaxis: {
          categories: [0, 0, 0, 0, 0, 0, 0, 0],
          labels:{
            hideOverlappingLabels: true,
            style: {
              fontSize:  '8px',
            },
          },
        },
        yaxis:{
          abels:{
            style: {
              fontSize:  '8px',
            },
          },
        }
      },

      // Save current chart view
      currentChartView: 0,

      // Charts data storages
      confirmCharts:[],
      deathCharts:[],
      testedCharts:[],

      // Charts switcher
      allCharts:["Case", "Death", "Test"],

      // Donation popup open or close
      donate: false
    }
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

  mounted(){

    // On start get data
    this.getData(this.api)
    this.lang = window.navigator.language

  },

  created(){

    EventBus.$on("donate-close", ()=>{
      this.donate = false
    })

  },
  methods:{

    // Get Figure Data from API
    // 从API获取基本数字数据
    getData(api){

      genGet(api, {}, (res)=>{

        if(res.status){
          this.allData = res.data.data

          this.renderFigure()

          // Get Update Time
          this.update = getDateFromTs(this.allData[0].ts)

          // Process Area Data
          if(this.allData[0].area && this.allData[0].area != ""){
            this.renderArea = JSON.parse(this.allData[0].area)
          }

          // Display
          this.loaded = true
          
          this.getHistory(this.api_history)

          
        } else {
          this.error = true
        }
        
        
      })
    },

    
    
    // Get history data from api and generate charts
    // 从API获取历史数据，生成图表
    getHistory(api){

      genGet(api, {}, async (res)=>{

        if(res.status){

          // History data is
          this.historyData = res.data.data

          let co = await confirmCal(this.historyData, this.allData[0])
          let de = await deathCal(this.historyData, this.allData[0])
          let te = await testCal(this.historyData, this.allData[0])

          this.chartOptions.xaxis.categories = co.cates

          // Compute chart data
          this.confirmCharts.push(this.constChartData("C&D", "area", false, [
            "#F62E3A",
            "#949BB5",
          ], this.constChartSeries([
            ["Confirmed", co.co], 
            ["Death", co.death]
          ])))

          this.confirmCharts.push(this.constChartData("Daily Increase", "bar", false, [
            "#F62E3A"
          ], this.constChartSeries([
            ["Cases", co.coDaily]
          ])))

          this.confirmCharts.push(this.constChartData("Growth Rate", "area", true, [
            "#F62E3A"
          ], this.constChartSeries([
            ["Rate", co.coInc]
          ])))

          this.deathCharts.push(this.constChartData("Death Increase", "bar", false, [
            "#FFC634"
          ], this.constChartSeries([
            ["Increase", de.inc], 
          ])))

          this.deathCharts.push(this.constChartData("Mortality Rate", "area", true, [
            "#FFC634"
          ], this.constChartSeries([
            ["Death Rate", de.rate], 
          ])))

          this.testedCharts.push(this.constChartData("Tested Number", "area", false, [
            "#46DEFF",
            "#31DA93"
          ], this.constChartSeries([
            ["All", te.all],
            ["Increase", te.growth],
          ])))

          this.testedCharts.push(this.constChartData("Positive Rate", "area", true, [
            "#46DEFF"
          ], this.constChartSeries([
            ["Positive Rate", te.pRate],
          ])))

          // Save for calculate CO./TE.
          this.dailyConfirmed = co.coDaily

          // Call here because it relay on get history data
          if(isNaN(te.pRate[te.pRate.length-1])){
            this.renderData["D. Posi."] = Number.parseFloat(te.pRate[te.pRate.length-2]) + "%"
          }else{
            this.renderData["D. Posi."] = Number.parseFloat(te.pRate[te.pRate.length-1]) + "%"
          }

          this.chartLoaded = true

        }

        // Start Get Location
        this.getLocations(this.api_locations)

      })
    },


    // Get all location center point from api
    // 获取所有的地理位置中心点数据
    getLocations(api){
      var that = this
      genGet(api, {}, (res)=>{
        let d = res.data.data
         
        var markers = []

        // Match area data and location data
        // 整合地理位置中心点和区域确诊数据
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

        // Process Data For Unknown Location
        this.unknown = this.calUnknown(this.renderArea, this.allData[0].confirmed)
        this.$nextTick(()=>{
          that.areaLoaded = true
        })

      })
    },

    // Render figure data by data sources
    // 渲染数字（主要给切换数据源使用，每次切换调用这个方法）
    renderFigure(){
      // Process Current Selected Data For render
      const all = this.allData[this.selected]
      this.renderData = {
        confirmed: all.confirmed,
        death: all.death,
        tested: all.negative != 0 ? all.confirmed + all.negative : "---",
        negative: all.negative == 0 ? "---" : all.negative,
        "D. Posi.": "---",
        mortality: (((all.death / all.confirmed)*100).toFixed(2)) + "%",
        cured: all.cured == 0 ? "---" : all.cured,
        serious: all.serious == 0 ? "---" : all.serious,
        //suspected: all.suspected == 0 ? "---" : all.suspected,
      }
    },

    // Calculate unknow location cases
    // 辅助方法：计算未知地理位置
    calUnknown(areaData, confirmed){

      let all = 0
      if(areaData){
        areaData.forEach(el => {
          if(!isNaN(el.number)){
            all = all + parseInt(el.number)
          }
        })
      }


      return confirmed - all
      

    },

    // Construct chart data
    // 辅助方法：组合图标整体数据
    constChartData(name, type, ptg, colors, data){

      let options = deepCopy(this.chartOptions)
      options.colors = colors

      if(ptg){
        
        options.dataLabels.formatter = (val)=>{
          return val == 0 ? "" : val + "%"
        }

        options['tooltip']['y'].formatter = (val)=>{
          return val == 0 ? "" : val + "%"
        }
      }

      return {
        name: name,
        type: type,
        options: options,
        data: data
      }
    },


    // Construct Chart Data Series
    // 辅助方法：组合图标纯数组数据
    constChartSeries(arr){

      let res = []
      for(let i=0;i<arr.length;i++){
        res.push({
          name: arr[i][0],
          data: arr[i][1]
        })
      }

      return res
    },
    
    // 从color.js获取各种颜色
    getColor(str){
      return putColor(str)
    },

    // 翻译，由translate.js提供字典
    getLang(str){
      if(this.lang != "zh-CN"){
        return str
      } else {
        return putCN(str)
      }
      
    },

    // 顶上切换数据源tab切换时fire
    switchData(idx){
      this.selected = idx
      this.renderFigure()
    },

    // 更换区域，地图<->列表
    switchAreaView(idx){
      this.currentAreaView = idx
    },

    // 切换图表
    switchChartView(idx){
      this.currentChartView = idx
    },

    //  顶上八大金刚，对比昨日的数据，没有显示---
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

    // 打开捐赠浮层
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


#update{
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding-bottom: 20px;
  color: #CED3D6;
  opacity: 0.2;
  margin-top: -10px;
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
  /*border-radius: 0 0 24px 24px;*/
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

#chart{
  width: 100%;
  font-size: 12px;
}

#chart-inner{
  width: 92%;
  margin-left:auto;
  margin-right: auto;
}



#area{
  width: 100%;
}

#area-map{
  width: 92%;
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

#cases-map{
  width: 92%; 
  height: 500px; 
  margin-left: auto; 
  margin-right: auto;
}

#sources{
  width: 92%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  color: #CED3D6;
  font-size: 20px;
  line-height: 36px;
  font-weight: bold;
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

#author{
  width: 92%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  color: #CED3D6;
  font-size: 14px;
  opacity: 0.5;
}

#author a{
  color: rgb(255, 255, 255);
  text-decoration: underline;
  font-size: 16px;
}




@media only screen and (max-width: 800px) {


  #area-map{
    width: 100%;
    height: 450px;
  }

  
  #cases-map{
    width: 100%;
  }

  .overall-source-inner{
    right: 10px;
  }

  .overall-single-title{
    font-size: 10px;
  }

  .overall-single-value{
    font-size: 18px;
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
