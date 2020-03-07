<template>
  <div id="app">
    <chead/>
    <home/>

    <div id="github" v-on:click="toGithub">
      <img src="https://i.ibb.co/27tC8pd/github.png" alt="to github">
    </div>
  </div>
</template>

<script>
import chead from './components/widgets/chead'
import home from './components/home'

export default {
  name: 'App',
  components: {
    chead,
    home
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
