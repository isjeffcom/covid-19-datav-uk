<template>
    <div id='forecast'>
        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Major Europe")}} <span style="font-size: 14px; opacity: 0.7;">[Beta]</span> </span><br>
            <div style="font-size: 12px; opacity: 0.5;">{{getLang("Data Source")}}: Johns Hopkins University</div>
            
          </div>
        </div>

        <charts :datas="chartData" :showRange="false"></charts>
        <!--div style="font-size: 12px; opacity: 0.5;margin-left:auto;marign-right:auto;">https://github.com/isjeffcom/coronavirusDataGlobal</div-->
    </div>
</template>


<script>
import { putCN } from '../../translate'
import charts from '../widgets/charts'
export default {
    name: "forecast",
    components:{
        charts
    },
    props:{
        chartData: {
            type: Array,
            default(){
                return []
            }
        }
    },

    data(){
        return{

        }
    },

    mounted(){
        //this.chartData = this.series
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

</style>