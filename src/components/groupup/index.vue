<template>
    <!-- GROUP INFO -->
    <div id="groupup">
      <span>{{getLang("Group Up")}}</span>
      <div style="margin-top: 15px; margin-bottom:10px;">
        <a href="https://spectrum.chat/covid-19-uk-update" target="_blank">
          <img src="https://i.ibb.co/QkvZQyM/nd.png" alt="join by spectrum.chat">
        </a>
        
      </div>

      <div style="margin-top: 10px; margin-bottom:10px;">
        <a href="https://jq.qq.com/?_wv=1027&k=5Ajnx1w" target="_blank">
          <img src="https://i.ibb.co/K0hK1rd/qqc.png" alt="join by tencent qq">
        </a>
      </div>
      
      <!--li><a href="https://spectrum.chat/covid-19-uk-update" target="_blank">{{getLang("By")}} Spectrum.chat</a></li>
      <li><a href="https://jq.qq.com/?_wv=1027&k=5Ajnx1w" target="_blank">{{getLang("By")}} QQ</a></li-->
    </div>
</template>

<script>
import { putCN } from '../../translate'
export default {
    name: "groupup",
    methods:{
        // 翻译，由translate.js提供字典
        getLang(str){
          if(window.navigator.language != "zh-CN"){
              return str
          } else {
              return putCN(str)
          }
        },
    }
}
</script>

<style scoped>
#groupup{
  width: 92%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  color: #CED3D6;
  line-height: 30px;
  font-weight: bold;
}

#groupup img{
  opacity: 0.8;
  width: 300px;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#groupup img:hover{
  opacity: 1;
}

#groupup img:active{
  opacity: 0.6;
}


#groupup a{
  color: #3F8BBE;
  text-decoration: underline;
  font-size: 10px;
  font-weight: bold;
}

#groupup a:active{
  background: #FEB547;
}

@media only screen and (max-width: 800px) {
    #groupup img{
        opacity: 1;
        width: 50%;
    }
}
</style>

