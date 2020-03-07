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
              <span>{{value}}</span>
              
            </div>

            <div class="overall-single-title">
              <span>{{name}}</span>
              <span style="opacity: 0.7;font-size: 12px;text-transform:lowercase;font-weight:normal;" v-if="name=='cured'"><br>Third-Party Data</span>
            </div>

              

          </div>
        </div>

        <div id="overall-more">
          <div
            class="overall-single" 
            v-for="(value, name) in hiddenData" 
            :key="name">

            <div class="overall-single-value" :style="value=='---' ? 'opacity: 0.2;font-weight:bold;' : 'opacity: 1;font-weight:bold;color:' + getColor(name)">
              <span>{{value}}</span>
            </div>

            <div class="overall-single-title">
              <span>{{name}}</span>
            </div>
            
          </div>
        </div>

      </div>

      <div id="chart">

        <apexchart width="100%" height="320px" type="area" :options="chartOptions" :series="chartData" v-if="chartLoaded"></apexchart>
      </div>


      <div id="area">
        <div id="area-title">
          <span>By Region</span><br>
          <span style="font-size: 12px; opacity: 0.5;">* Reginal data might not be update in real-time (at least 1 day in arrears) due to the local government data publish plan.</span><br>
          <span style="font-size: 12px; opacity: 0.5;">* England and Scotland only</span>
        </div>
        
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

    <div id="sources">
      <span>Sources</span>
      <li v-for="(item,idx) in sourceList" :key="idx"><a :href="item" target="_blank">{{item}}</a></li>
    </div>

    
  </div>
</template>

<script>
import { genGet } from '../../request'
import { numAddZero, getDateFromTs } from '../../utils'

export default {
  name: 'home',
  props: {
    msg: String
  },
  data(){
    return{
      loaded: false,
      chartLoaded: false,
      api: "/",
      api_history: "/history",
      selected: 0,
      selectedChart: "confirm",
      allData: [],
      renderData: {},
      hiddenData: {},
      renderArea: {},
      historyData: [],
      update:"",
      sourceList: [],
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
          txt: "nagative",
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
      wording:[
        ["confirmed", "确诊"],
        ["death", "死亡"],
        ["cured", "治愈"],
        ["icu", "重症"],
        ["suspect", "疑似"],
        ["area", "区域"],
      ],
      chartOptions: {
        chart: {
          id: 'main-chart'
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
  created(){
    this.getData(this.api)
    this.getHistory(this.api_history)
  },
  methods:{
    getData(api){
      genGet(api, {}, (res)=>{
        this.allData = res.data.data
        this.renderArea = JSON.parse(this.allData[0].area)
        this.produceRenderData()
        this.update = getDateFromTs(this.allData[0].ts)

        this.allData.forEach(el => {
          this.sourceList.push(el.link)
        })

        this.loaded = true
      })
    },

    getHistory(api){
      genGet(api, {}, (res)=>{

        let confirm = []
        let death = []

        this.historyData = res.data.data

        this.historyData.forEach(el => {
          el.date = getDateFromTs(el.date, "datesimple")
          confirm.push(el.confirm)
          death.push(el.death)
        })

        this.chartData[0].data = confirm
        this.chartData[1].data = death
        this.chartLoaded = true
      })
    },

    produceRenderData(){
      const all = this.allData[this.selected]
      this.renderData = {
        confirmed: all.confirm,
        death: all.death,
        cured: all.cured == 0 ? this.allData[1].cured : all.cured,
        nagative: all.nagative == 0 ? "---" : all.nagative,
      }

      this.hiddenData = {
        serious: all.icu == 0 ? "---" : all.icu,
        suspected: all.suspect == 0 ? "---" : all.suspect,
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

    /*getDateFromTs(ts){
      const d = new Date(ts)
      return d.getFullYear() + '-' + numAddZero(d.getMonth() + 1) + '-' + numAddZero(d.getDate()) + ' ' + numAddZero(d.getHours()) + ':' + numAddZero(d.getMinutes()) + ':' + numAddZero(d.getSeconds())
    },*/

    
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
  margin-bottom: 20px;
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

#chart{
  width: 90%;
  margin-left:auto;
  margin-right: auto;
}

#area{
  width: 100%;
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
  font-weight: bold;
  font-size: 16px;
}


#sources a{
  color: #3F8BBE;
  text-decoration: underline;
  font-size: 16px;
}

#sources a:active{
  background: #FEB547;
}

</style>
