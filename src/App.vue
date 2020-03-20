<template>
  <div id="app">
    <alert :title="firstAlert.title" :content="firstAlert.content" :submit="firstAlert.submit" v-if="needAlert"></alert>
    <chead></chead>
    <router-view></router-view>
    
    <div id="github" v-on:click="toGithub">
      <img src="https://i.ibb.co/27tC8pd/github.png" alt="to github">
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
      firstAlert:{
        title: "You need to know",
        content: "<br>This is a data visualisation for <b>COVID-19</b> in the UK, but just <b>as a reference</b>. <br><br> You need to understand: <br><br> 1. These data might <b>NOT</b> be completely accurate or updated. <br> 2. All marker on the map represent an area, <b>NOT building or street</b>. <br> 3. The developer takes <b>NO responsibility</b> for data accuracy and service stability. <br><br> Please double check with <b>official channel</b> before act on it. Cookie in used for statistical purposes.",
        submit: "I consent"
      },
      needAlert: false
    }
  },

  created(){
    if(!ls.get("first") || ls.get("first") != "2"){
      this.needAlert = true
    }

    this.firstAlert.content = getAlert(window.navigator.language)


    EventBus.$on("alert-clicked", (data)=>{
      if(data == "I consent"){
        ls.set("first", "2")
      }
    })
  },

  methods:{
    toGithub(){
      window.open("https://github.com/isjeffcom/coronvirusFigureUK");
    }
  }
}
</script>

<style>

*{
  padding: 0;
  margin: 0;
  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1F2224;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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
</style>
