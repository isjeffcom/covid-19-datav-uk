<template>
  <div id="app">
    <chead/>
    <home/>
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
}

#home{
  margin-top: 40px;
}
</style>
