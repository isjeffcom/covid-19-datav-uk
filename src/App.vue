<template>
  <div id="app">
    <!-- Popup alert when user first enter -->
    <alert :title="firstAlert.title" :content="firstAlert.content" :submit="firstAlert.submit" v-if="needAlert"></alert>
    <chead></chead>
    <router-view></router-view>
    

    <!-- Github Link -->
    <div id="github" v-on:click="toGithub">
      <img src="https://i.ibb.co/27tC8pd/github.png" alt="to github">
    </div>

    <!-- Notice -->
    <div id="notice" v-if="noticed" v-on:click="toNotice">
      <div id="notice-inner">
          STAY AT HOME - INFO.
      </div>
    </div>
  </div>
</template>

<script>
import chead from './components/widgets/chead'
import alert from './components/widgets/alert'
import { EventBus } from './bus'
import { getAlert } from './translate'

const ls = require('local-storage')

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
        title: "You need to know",
        content: "<br>This is a data visualisation for <b>COVID-19</b> in the UK, but just <b>as a reference</b>. <br><br> You need to understand: <br><br> 1. These data might <b>NOT</b> be completely accurate or updated. <br> 2. All marker on the map represent an area, <b>NOT building or street</b>. <br> 3. The developer takes <b>NO responsibility</b> for data accuracy and service stability. <br><br> Please double check with <b>official channel</b> before act on it. Cookie in used for statistical purposes.",
        submit: "I consent"
      },
      needAlert: false
    }
  },

  created(){

    // Check browser localstorage if already clicked
    if(!ls.get("first") || ls.get("first") != "2"){
      this.needAlert = true
    }

    // Check browser localstorage if already clicked
    if(!ls.get("noticed") || ls.get("noticed") != "1"){
      setTimeout(()=>{
        this.noticed = true
      }, 1500)
      
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

    // Open github link
    toGithub(){
      window.open("https://github.com/isjeffcom/coronvirusFigureUK")
    },

    toNotice(){
      this.noticed = false
      ls.set("noticed", "1")
      this.$nextTick(()=>{
        window.open("https://www.gov.uk/coronavirus")
      })
    }
  }
}
</script>

<style>

*{
  padding: 0;
  margin: 0;
  
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

#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1F2224;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* TITLE */
.title{
  width: 90%;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: auto;
}

/* TAB */
.tab-switcher{
  width: 100%;
  display: flex;
  color: #CED3D6;
  text-align: center;
  margin-bottom: 0px;
  font-size: 16px;
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
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
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


#github{
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
}

#notice{
  position: fixed;
  bottom: 40px;
  height: 30px;
  width: 100%;
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

@media only screen and (max-width: 800px) {
  .ds-ids{
    width: 20%;
  }
}

</style>
