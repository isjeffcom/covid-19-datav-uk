<template>
    <div id="cdata">
        <!-- CHARTS -->
        <!-- charts container -->
        <div id="chart">

            <!-- Sector Title -->
            <div class="title" style="margin-bottom: 0px;margin-top:2px;">
                <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
                    <span>{{getLang("Data")}}</span><br>
                    <div style="font-size: 12px; opacity: 0.5;">* {{getLang("Data might be incompleted")}}</div>
                </div>
            
            </div>

            <!-- Charts tab switcher -->
            <div class="tab-switcher">
                <div 
                    class="ds-single" 
                    v-for="(item, index) in allCharts" 
                    :key="index" :style="'width:' + 'calc(100%/' + allCharts.length + ');'" 
                    v-on:click="switchChartView(index)">

                    <div class="ds-text">
                        <span>{{getLang(item)}}</span>
                    </div>

                    <div class="ds-ids" v-if="index == currentChartView"></div>
                    
                </div>
            </div>

            <!-- 4 charts, confirmed, death, tested， hospital -->
            <!-- use charts components in /src/components/charts -->
            <div id="chart-inner">
                <transition name="fade">
                    <div v-show="currentChartView == 0">
                        <charts :datas="confirmCharts" :mode="mode"></charts>
                    </div>
                </transition>
                
                <transition name="fade">
                    <div v-show="currentChartView == 1">
                        <charts :datas="deathCharts" :mode="mode"></charts>
                    </div>
                </transition>

                <transition name="fade">
                    <div v-show="currentChartView == 2">
                        <charts :datas="testedCharts" :mode="mode"></charts>
                    </div>
                </transition>

                <transition name="fade">
                    <div v-show="currentChartView == 3">
                        <charts :datas="hospitalCharts" :mode="mode"></charts>
                        <div style="margin-top:10px; font-size: 14px;">Current: {{ allData.hospital }}, England: {{ hospitalArea.england }}, Scotland: {{ hospitalArea.scotland }}, Wales: {{ hospitalArea.wales }}, Northern Ireland: {{ hospitalArea.nIreland }}</div>
                    </div>
                </transition>

            </div>

        </div>
    </div>
</template>


<script>
import charts from '../widgets/charts'
import { putCN } from '../../translate'
import { stripSlashes } from '../../utils'

export default {
    name: "cdata",
    components:{
        charts
    },
    props:{
        allData:{
            type: Object,
            value: {}
        },

        allCharts: {
            type: Array,
            default(){
                return []
            }
        },
        confirmCharts: {
            type: Array,
            default(){
                return []
            }
        },
        deathCharts: {
            type: Array,
            default(){
                return []
            }
        },
        testedCharts: {
            type: Array,
            default(){
                return []
            }
        },
        hospitalCharts:{
            type: Array,
            default(){
                return []
            }
        },

        mode: {
            type: String,
            default:"phone"
        }
    },

    created(){
        this.hospitalArea = JSON.parse(stripSlashes(this.allData.hospitalArea))
    },

    data(){
        return{
            currentChartView: 0,
            // Render options for swiper package
            swiperOptions:{
                allowTouchMove: false
            },
            hospitalArea: {}
        }
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

.fade-enter {
  opacity: 0;
}

#chart{
  width: 100%;
  font-size: 12px;
}

#chart-inner{
  width: 92%;
  margin-left:auto;
  margin-right: auto;
}

</style>