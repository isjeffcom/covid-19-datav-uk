<template>
  <div id="home">

    <div v-if="error">
      Fail to connect API, please report ISSUE to:
      <li>https://github.com/isjeffcom/coronvirusFigureUK</li>
      <li>https://spectrum.chat/covid-19-uk-update?tab=posts</li>
    </div>

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
        </div>

      </div>

      <div id="chart" v-if="chartLoaded">

        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;margin-top:2px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Data")}}</span><br>
            <div style="font-size: 12px; opacity: 0.5;">* {{getLang("Data might be incompleted")}}</div>
          </div>
          
        </div>

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

        <div id="chart-notice" v-if="isMobile()" style="width: 100%;text-align:center;opacity:0.5;margin-top:20px;font-size:10px;">
          <div id="chart-notice">
            <img src="https://i.ibb.co/jW1mJZd/rotate.png" alt="rotate for better view" style="width: 24px;">
            <div>{{getLang('Try Rotate')}}</div>
          </div>
          
        </div>

      </div>

      <div id="herd" style="margin-top:40px;margin-bottom:40px;" v-if="loaded">
        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Herd Immunity")}}</span><br>
            <div style="font-size: 12px; opacity: 0.5;">{{getLang("UK Population")}}: 66.44 {{getLang("Million")}} | {{getLang("Immunity Point")}}: 60%</div>
          </div>
        </div>

        <ptg :mData="[allData[0].confirmed, 66440000]" style="margin-top:20px;margin-bottom:20px;"></ptg>

      </div>

      <div id="area" v-if="areaLoaded">

        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Regions")}}</span><br>
            <div style="font-size: 16px;"><b style="color: #7DA5B5;">{{unknown}}</b> {{getLang("Unknown Locations")}}</div>
            <div style="font-size: 12px; opacity: 0.5;">* {{getLang("At least 1 day in arrears")}}</div>
          </div>
          
        </div>

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

        <div id="area-map" v-if="currentAreaView == 'map'">
          <ccmap :mapData="mapData"></ccmap>
        </div>

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

    <div id="sources">
      <span>{{getLang("Group Up")}}</span>
      <li><a href="https://spectrum.chat/covid-19-uk-update" target="_blank">{{getLang("By")}} Spectrum.chat</a></li>
      <li><a href="https://jq.qq.com/?_wv=1027&k=5Ajnx1w" target="_blank">{{getLang("By")}} QQ</a></li>
    </div>

    

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

    <div id="author">
      <div id="author-inner">
        <a href="https://www.isjeff.com" target="_blank">@Jeff Wu</a>
      </div>
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
// Utils
import { genGet } from '../../request'
import { getDateFromTs, indexOfObjArr, deepCopy } from '../../utils'

// Components
import charts from '../../components/charts'
import ptg from '../../components/ptg'
import alert from '../../components/widgets/alert'
import donate from '../../components/widgets/donate'
import ccmap from '../../components/widgets/ccmap'
import ICountUp from 'vue-countup-v2'
import { EventBus } from '../../bus'

// Custom
import { putColor } from './color'
import { putCN } from '../../translate'

import { ConfirmCategories, ConfirmOverallTrend, ConfirmIncrement, ConfirmDaily } from './confirmed'
import { DeathIncrement, DeathRate } from './death'
import { Tested, TestedDRate } from './tested'


export default {
  name: 'home',
  components:{
    charts,
    ptg,
    ccmap,
    alert,
    donate,
    ICountUp
  },
  data(){
    return{
      error: false,
      loadCM: true,
      lang: "",
      loaded: false,
      chartLoaded: false,
      areaLoaded: false,
      listSearch: "",
      api: "/",
      api_history: "/historyfigures",
      api_locations: "/locations",
      selected: 0,
      allData: [],
      renderData: {},
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

      swiperOptions:{
        allowTouchMove: false
      },
      
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
      currentChartView: 0,
      confirmCharts:[],
      deathCharts:[],
      testedCharts:[],
      allCharts:["Case", "Death", "Test"],

      donate: false
    }
  },

  computed:{
    listFiltered: function(){
      return this.renderArea.filter(val => {
        //console.log(this.listSearch)
        return val.location.toLowerCase().includes(this.listSearch.toLowerCase())
      })
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
    onRefresh() {
      let that = this
      return new Promise(function (resolve, reject) {
          setTimeout(function () {
              resolve();
          }, 1000);
      });
    },
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

    renderFigure(){
      // Process Current Selected Data For render
      const all = this.allData[this.selected]
      this.renderData = {
        confirmed: all.confirmed,
        death: all.death,
        tested: all.negative != 0 ? all.confirmed + all.negative : "---",
        negative: all.negative == 0 ? "---" : all.negative,
        "D Co./Te.": "---",
        cured: all.cured == 0 ? "---" : all.cured,
        serious: all.serious == 0 ? "---" : all.serious,
        suspected: all.suspected == 0 ? "---" : all.suspected,
      }
    },
    

    // Calculate unknow location cases
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

    getHistory(api){

      genGet(api, {}, async (res)=>{

        if(res.status){

          // History data is
          this.historyData = res.data.data

          let categories = await ConfirmCategories(this.historyData)
          let oaConfirmTrend = await ConfirmOverallTrend(this.historyData, this.allData[0])
          let oaConfirmDaily = await ConfirmDaily(this.historyData, this.allData[0])
          let oaConfirmIncRate = await ConfirmIncrement(this.historyData, this.allData[0])
          let deathInc = await DeathIncrement(this.historyData, this.allData[0])
          let deathRate = await DeathRate(this.historyData, this.allData[0])
          let tested = await Tested(this.historyData, this.allData[0])
          let testedCOTE = await TestedDRate(this.historyData, this.allData[0])

          this.chartOptions.xaxis.categories = categories

          // Compute chart data
          this.confirmCharts.push(this.constChartData("C&D", "area", false, [
            "#F62E3A",
            "#949BB5",
          ], this.constChartSeries([
            ["Confirmed", oaConfirmTrend.confirmed], 
            ["Death", oaConfirmTrend.death]
          ])))


          this.confirmCharts.push(this.constChartData("Daily Increase", "bar", false, [
            "#F62E3A"
          ], this.constChartSeries([
            ["Cases", oaConfirmDaily]
          ])))

          this.confirmCharts.push(this.constChartData("Growth Rate", "line", true, [
            "#F62E3A"
          ], this.constChartSeries([
            ["Rate", oaConfirmIncRate]
          ])))

          this.deathCharts.push(this.constChartData("Death Increase", "bar", false, [
            "#FFC634"
          ], this.constChartSeries([
            ["Increase", deathInc], 
          ])))

          this.deathCharts.push(this.constChartData("Mortality Rate", "area", true, [
            "#FFC634"
          ], this.constChartSeries([
            ["Death Rate", deathRate], 
          ])))

          this.testedCharts.push(this.constChartData("Tested Number", "area", false, [
            "#46DEFF",
            "#31DA93"
          ], this.constChartSeries([
            ["All", tested.all],
            ["Increase", tested.growth],
          ])))

          this.testedCharts.push(this.constChartData("Positive Rate", "bar", true, [
            "#46DEFF"
          ], this.constChartSeries([
            ["Positive Rate", testedCOTE],
          ])))

          
          // Save for calculate CO./TE.
          this.dailyConfirmed = oaConfirmDaily

          // Call here because it relay on get history data
          if(isNaN(testedCOTE[testedCOTE.length-1])){
            this.renderData["D Co./Te."] = Number.parseFloat(testedCOTE[testedCOTE.length-2]) + "%"
          }else{
            this.renderData["D Co./Te."] = Number.parseFloat(testedCOTE[testedCOTE.length-1]) + "%"
          }

          this.chartLoaded = true

        }

        // Start Get Location
        this.getLocations(this.api_locations)

      })
    },

    constChartData(name, type, ptg, colors, data){

      let options = deepCopy(this.chartOptions)
      options.colors = colors

      if(ptg){
        
        options.dataLabels.formatter = (val)=>{
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
    



    getLocations(api){
      var that = this
      genGet(api, {}, (res)=>{
        let d = res.data.data
         
        var markers = []

        // Match area data and location data
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

    switchData(idx){
      this.selected = idx
      this.renderFigure()
    },

    switchAreaView(idx){
      this.currentAreaView = idx
    },

    switchChartView(idx){
      this.currentChartView = idx
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
    },

    isMobile(){
      return screen.width < 480 ? true : false
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
