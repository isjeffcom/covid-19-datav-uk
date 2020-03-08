<template>
  <div id="app">
    <alert :title="firstAlert.title" :content="firstAlert.content" :submit="firstAlert.submit" v-if="needAlert"></alert>
    <chead></chead>
    <home></home>
    

    <div id="github" v-on:click="toGithub">
      <img src="https://i.ibb.co/27tC8pd/github.png" alt="to github">
    </div>
  </div>
</template>

<script>
import chead from './components/widgets/chead'
import home from './components/home'
import alert from './components/widgets/alert'
import { EventBus } from './bus'

const ls = require('local-storage')

export default {
  name: 'App',
  components: {
    chead,
    home,
    alert
  },
  data(){
    return{
      firstAlert:{
        title: "You need to know",
        content: "<br>This is a data visualisation for <b>COVID-19</b> in the UK, but just <b>as a reference</b>. <br><br> Here is a couple of things you need to understand: <br><br> 1. These data might <b>NOT</b> be completely accurate or updated. <br> 2. All centre points on the 'Regional Map' represent an area, <b>NOT building or street</b>. <br> 3. The website developer takes <b>NO responsibility</b> for data accuracy and service stability. <br><br> Please double check with <b>official channel</b> before act on it.",
        submit: "I consent"
      },
      needAlert: false
    }
  },

  created(){
    if(!ls.get("first")){
      this.needAlert = true
    }


    EventBus.$on("alert-clicked", (data)=>{
      if(data == "I consent"){
        ls.set("first", "1")
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
}

#home{
  margin-top: 40px;
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
