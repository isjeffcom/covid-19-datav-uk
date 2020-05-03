<template>
    <div id='forecast'>
        <div class="title" style="margin-bottom: 0px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("Analysis")}} <span style="font-size: 14px; opacity: 0.7;">[Beta]</span> </span><br>
            <div style="font-size: 12px; opacity: 0.5;">{{getLang("Data Source")}}: Johns Hopkins University</div>
            
          </div>
        </div>

        <!-- Charts tab switcher -->
        <div class="tab-switcher">
            <div 
                class="ds-single" 
                v-for="(item, index) in allCharts" 
                :key="index" :style="'width:calc(100%/' + allCharts.length + ');'" 
                v-on:click="switchChartView(index)">

                <div class="ds-text">
                <span>{{getLang(item)}}</span>
                </div>

                <div class="ds-ids" v-if="index == currentChartView"></div>
                
            </div>
        </div>

        <div style="width:92%; margin-left: auto; margin-right: auto;">
            <transition name="fade">
                <div v-if="currentChartView == 0">
                    <charts :datas="euData" :showRange="false" :mode="mode"></charts>
                    <div class="notice" style="font-size: 10px; width: 95%; margin-top: 20px; margin-bottom:20px; margin-left: auto;margin-right:auto;">
                        <span style="opacity: 0.5;"> {{getLang("@Jeff wu @vincent zhang")}}</span>
                        <br><br>
                        <a href="https://github.com/isjeffcom/coronavirusDataGlobal" target="_blank">COVID19-Global-API</a>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <div v-if="currentChartView == 1">
                    <charts :datas="preData" :showRange="false" :mode="mode"></charts>
                    <div class="notice" style="font-size: 10px; width: 95%; margin-top: 20px; margin-bottom:20px; margin-left: auto;margin-right:auto;">
                        <span style="opacity: 0.5;"> {{getLang("Prediction model based on ANN machine learning algorithm trained with Italy, Germany and France's data.")}} <br> {{getLang("Constantly Optimising by @Big-Tree, @Jimmy.")}}</span>
                        <br><br>
                        <a href="https://github.com/lamharrison/coronavirus-machine-learning" target="_blank">COVID19-ML-PREDICTION</a>
                    </div>
                </div>
            </transition>
        </div>

        

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
        
        euData: {
            type: Array,
            default(){
                return []
            }
        },
        preData: {
            type: Array,
            default(){
                return []
            }
        },

        mode: {
            type: String,
            default: "phone"
        }
    },

    data(){
        return{
            currentChartView: 0,
            allCharts: ["Europe", "UK Prediction"]
        }
    },

    mounted(){
        //this.chartData = this.series
    },

    methods:{
        // 切换图表
        switchChartView(idx){
            this.currentChartView = idx
        },
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
.fade-enter-active {
  transition: opacity 1.6s;
}

.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>