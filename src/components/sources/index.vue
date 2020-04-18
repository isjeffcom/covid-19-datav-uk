<template>

    <div id="sources">
        <div class="source-single">
            <h4>{{getLang("References")}}</h4>
            <li v-for="(item, index) in list" :key="index">
                <a :href="item.url" target="_blank">{{ item.name }}</a>
            </li>
        </div>

        <div>
            <h4>Licence</h4>
            <span><a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank">Open Government Licence v3.0 (UK)</a></span>
        </div>


        <!-- AUTHOR INFO -->
        <div class="source-single">
            <h4>{{getLang("Author")}}: </h4>
            <a href="https://www.isjeff.com" target="_blank">@Jeff Wu</a>
        </div>

        <div class="source-single">
            <h4>{{getLang("Contributor")}}: </h4>
            <li><a href="https://github.com/lamharrison" target="_blank">@Big Tree</a></li>
            <li><a href="https://github.com/lujiammy" target="_blank">@Jimmy Lu</a></li>
            <li><a href="https://github.com/VincentNevermore" target="_blank">@Vincent Zhang</a></li>
            <li><a href="https://github.com/commmathree" target="_blank">@commathree</a></li>
        </div>

        <div class="source-single">
            <h4>{{getLang("Others")}}: </h4>
            <li><a href="https://covid19nz.live" target="_blank">New Zealand</a></li>
        </div>


    </div>

</template>


<script>
import { putCN } from '../../translate'
export default {
    name: "sources",
    data(){
        return{
            list:[
                {
                    name: "[API] Coronvirus Figure UK - isjeffcom",
                    url: "https://github.com/isjeffcom/coronvirusFigureUK"
                },
                {
                    name: "[Gov]COVID-19: latest information and advice",
                    url: "https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public"
                },
                {
                    name: "[Gov]COVID-19: track coronavirus cases",
                    url: "https://www.gov.uk/government/publications/covid-19-track-coronavirus-cases"
                },
                {
                    name: "[Gov]Coronavirus in Scotland",
                    url: "https://www.gov.scot/publications/coronavirus-covid-19-tests-and-cases-in-scotland/"
                },
                {
                    name: "[Gov]COVID-19 (coronavirus) Northern Ireland",
                    url: "https://www.publichealth.hscni.net/news/covid-19-coronavirus"
                },
                {
                    name: "[Gov]Written Statement: COVID-19 Wales",
                    url: "https://gov.wales/written-statement-coronavirus-covid-19-1"
                },
                {
                    name: "[Gov]DHSCgovuk Official Twitter",
                    url: "https://twitter.com/DHSCgovuk"
                },
                {
                    name: "[Media]COVID-19 CORONAVIRUS OUTBREAK (Worldometers)",
                    url: "https://www.worldometers.info/coronavirus/"
                }
            ]
        }
    },
    methods:{
        // 翻译，由translate.js提供字典
        getLang(str){
            if(window.navigator.language != "zh-CN"){
                return str
            } else {
                return putCN(str)
            }
        }
    }
}
</script>

<style scoped>
#sources{
  width: 92%;
  display:flex;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  color: #CED3D6;
  line-height: 30px;
  font-weight: bold;
}

#sources img{
  opacity: 0.8;
  width: 300px;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#sources img:hover{
  opacity: 1;
}

#sources img:active{
  opacity: 0.6;
}


.source-single{
    width: calc(100%/5);
    margin-left: 20px;
    margin-right: 20px;
}

#sources a:active{
  background: #FEB547;
}

@media only screen and (max-width: 800px) {
    #sources{
        display: block;
    }
    #sources img{
        opacity: 1;
        width: 50%;
    }

    .source-single{
        width: auto;
        margin-left: 0px;
        margin-right: 0px;
    }
}
</style>