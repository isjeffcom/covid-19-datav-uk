<template>
  <div id="app">
    <div id="end" v-if="noticeOpen">

      <div id="end-inner">
        <div>
            <p style="font-size: 24px; font-weight: bold;">End of service notice:</p><br>
        </div>
        <div>
            <p>
                This website started to provide COVID-19 UK information since the 6th of March 2020 at the very beginning of the lockdown. The COVID-19 epidemic has gradually eased. Unlike four months ago, the official channel now provides better quality and much more reliable data than most of the third-party trackers. 
            </p>
        </div>

        <br>

        <div>
            <p>
                I've made a hard decision: COVID19UK.LIVE website should soon stop maintaining. For API users, please try to find an alternative as quickly as possible or you can download my scaper source code from <a href="https://github.com/isjeffcom/coronvirusFigureUK">here</a>.
            </p>
        </div>

        <br>

        <div>
            <p>
                Thank you for your support. Stay safe.
            </p>
        </div>

        <br><br><br>

        <div>
            <p>The Offical Data Sources:</p><br>
        </div>

        <div>

            <div>
                <p><a href="https://coronavirus.data.gov.uk/">UK National Dashboard / England Dashboard</a></p>
            </div>

            <br>

            <div>
                <p><a href="https://public.tableau.com/profile/public.health.wales.health.protection#!/vizhome/RapidCOVID-19virology-Public/Headlinesummary">Wales Dashboard</a></p>
            </div>

            <br>

            <div>
                <p><a href="https://www.publichealthscotland.scot/our-areas-of-work/sharing-our-data-and-intelligence/coronavirus-covid-19-data/">Scotland Dashboards and Statistic Reports</a></p>
            </div>

            <br>

            <div>
                <p><a href="https://www.publichealthscotland.scot/our-areas-of-work/sharing-our-data-and-intelligence/coronavirus-covid-19-data/">North Ireland Dashboard</a></p>
            </div>

        </div>

        <br><br><br><br><br><br><br><br><br>

        <button v-if="noticeOpen" v-on:click="noticeOpen = false">CONTINUE</button>
      </div>

        

        
    </div>
    

    <!-- Popup alert when user first enter -->
    <alert :title="firstAlert.title" :content="firstAlert.content" :submit="firstAlert.submit" v-if="needAlert"></alert>
    <chead></chead>
    <router-view></router-view>
    
    <!-- Github Link -->
    <!--div id="github" v-on:click="toGithub">
      <img src="https://i.ibb.co/27tC8pd/github.png" alt="to github">
    </div-->

  </div>
</template>

<script>
import chead from './components/widgets/chead'
import alert from './components/widgets/alert'
import { EventBus } from './bus'
import { getAlert } from './translate'

import ls from 'local-storage'

export default {
  name: 'App',
  components: {
    chead,
    alert
  },
  data(){
    return{
      noticed: false,
      firstAlert:{
        title: "THINGS YOU NEED TO KNOW",
        content: "<br>This data is a visualization for COVID-19 in the UK. <b>For reference purposes only.</b>. <br><br> You need to be aware: <br><br> 1. This data may not be completely <b>accurate or up to date</b>. <br> 2. All the markers on the map represent an area and <b>not buildings or streets</b>. <br> 3. The developer takes <b>no</b> responsibility for the accuracy of the data nor the service's stability. <br><br> Please double check with the <b>official channels<b> before acting on it. Cookies are used for statistical purposes only.",
        submit: "I consent"
      },
      needAlert: false,
      noticeOpen: true,
    }
  },

  created(){

    // Check browser localstorage if already clicked
    if(!ls.get("first") || ls.get("first") != "2"){
      this.needAlert = true
    }
    

    // Get alert content by user language
    this.firstAlert.content = getAlert(window.navigator.language)

    // On user click close popup window
    EventBus.$on("alert-clicked", (data)=>{
      if(data == "I consent"){
        ls.set("first", "2")
      }
    })
  },

  methods:{

  }
}
</script>

<style>

#end{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 24px;
    background: rgba(0,0,0,0.95);
    color: #ffffff;
    z-index: 999999;
    word-wrap: break-word;
}

#end-inner{
  width: 90%;
}

#end-inner a{
  font-size: 18px;
}

#end-inner button{
  position: absolute;
  bottom: 80px;
  background: #ffffff;
  color: #000;
  font-weight: bold;
  font-size: 18px;
  padding-top: 2px;
  height: 50px;
  width: 170px;
}

*{
  padding: 0;
  margin: 0;
}

body{
  background: #1C2024;
}

a{
  color: #3F8BBE;
  text-decoration: underline;
  font-size: 10px;
  font-weight: bold;
}

@keyframes noticeShow {
  0% {bottom: -30px}
  100% {bottom: 30px;}
}

@keyframes clickHere {
  0% {background: rgba(246, 46, 58, 1)}
  50% {background: rgb(197, 26, 38)}
  100% {background: rgba(246, 46, 58, 1)}
}


/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.3); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.16); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.4); 
}

select{
  width: 100%;
  height: 100%;
  background: #373D41;
  border: 1px solid rgba(255,255,255,0.05);
  padding-left: 2px;
  color: #ffffff;
  -webkit-appearance: none;
}

button{
  height: 100%;
  background: #373D41;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 4px;
  color: #ffffff;
  margin-left:10px;
  margin-right: 10px;
  text-align: center;
  padding-top: 20px;
  padding-left: 8px;
  padding-right: 8px;
  font-size:12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
  -webkit-appearance: none;
}

button:active{
  background: #2D3133;
}

button:focus {outline:0;}

progress[value]{
    border: 0;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
}

progress[value]::-webkit-progress-bar{
    background-color: #46545B;
    height: 6px;
    -webkit-appearance: none;
    border-radius: 100px;
}

progress[value]::-webkit-progress-value{
    border-radius: 100px;
    background-color: #36FFAB;
}

input{
  background: #373D41;
  border: 1px solid rgba(255,255,255,0.05);
  width: 100%;
  height: 32px;
  padding-left: 2px;
  color: #CED3D6;
  -webkit-appearance: none;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

input:focus {
  border: 1px solid rgba(70,222,255,1);
  outline: none;
}

#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1C2024;
  color: #CED3D6;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* TITLE */
.title{
  width: 100%;
  font-size: 20px;
  background: #24292D !important;
  margin-top: 24px;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  border-top: 1px solid rgba(255,255,255,0.05);
}

.title-right{
  float: right;
  margin-right: 24px;
  margin-top: -65px;
  font-size: 14px;
}

/* TAB */
.tab-switcher{
  width: 30%;
  display: flex;
  color: #CED3D6;
  text-align: center;
  margin-bottom: 0px;
  font-size: 16px;
  border-radius: 0px 0px 8px 0px;
  margin-top: -1px;
  background: #24292D;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.ds-single{
  padding-top: 14px;
  padding-bottom: 0px;
  cursor: pointer;
  text-align: center;
}

.ds-single:active{
  background: rgba(0,0,0,0.2);
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

/* Chart Swiper */
.chart-switcher{
  height: 36px;
  background: #373D41;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 4px;
  margin-left:10px;
  margin-right: 10px;
  text-align: center;
  padding-top: 20px;
  font-size:12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.chart-switcher:active{
  background: #2D3133;
}


.apexcharts-tooltip {
  color: #505C65;
}

.apexcharts-theme-light{
  color: #505C65;
}

.vue-slide-bar{
  background: #51606A !important;
}

/*#github{
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background: #373D41;
  box-shadow: 0px 8px 16px #181A1C;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#github:hover{
  background: #282D30;
  box-shadow: 0px 16px 32px #121313;
}

#github img{
  width: 75%;
  margin-top: 6px;
}*/

#notice{
  position: fixed;
  bottom: 40px;
  height: 30px;
  width: 100%;
  max-width: 700px;
  color: #FFEAEA;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 12px;
  z-index: 999;
  animation-name: noticeShow;
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  cursor: pointer;
}

#notice-inner{
  width: 40%;
  background: rgba(246, 46, 58, 1);
  box-shadow: 0px 4px 16px rgba(246, 46, 58, 0.3);
  border-radius: 100px;
  padding: 14px;
  margin-left: auto;
  margin-right: auto;
  animation-name: clickHere;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

@media only screen and (max-width: 700px) {
    /* TAB */
  .tab-switcher{
    width: 100%;
    font-size: 14px;
    border-radius: 0px;
  }

  .ds-ids{
    width: 20%;
  }
}

</style>
