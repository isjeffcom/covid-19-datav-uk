<template>
    <div id="overall">

        <!-- current figure container -->
        <div id="overall">
            <div id="overall-inner">

                <div class="overall-show">
                    <div 
                        class="overall-single" 
                        v-for="(value, name) in renderData" 
                        :key="name">

                        <div>
                            <!-- PC View -->
                            <div class="overall-single-title" v-if="mode == 'pc'">
                                <span>{{getLang(name)}}</span>
                                <hr style="width:50%;opacity: 0.1;line-width:1px;">
                            </div>

                            <div class="overall-single-value" :style="value=='---' ? 'opacity: 0.2;font-weight:bold;' : 'opacity: 1;font-weight:bold;color:' + getColor(name)">
                                <span>{{value.toLocaleString()}}</span>
                            
                            </div>

                            <!-- Mobile View -->
                            <div class="overall-single-title" v-if="mode == 'phone'">
                                <span>{{getLang(name)}}</span>
                            </div>

                            <div class="overall-single-compare">
                                <span :style="'color:' + getColor(name) + ';font-weight: bold; font-size: 14px;opacity: 0.8;'">{{  compare(value, name) }}</span>
                            </div>

                        </div>

                    </div>

                </div>

                <div v-if="hiddenShow" style="position: absolute; opacity: 0.05; width: 100%; margin-top: -40px; max-width: 700px;">
                    <hr>
                </div>

                

                <div class="overall-show overall-hidden" v-if="hiddenShow" style="margin-top: -10px;padding-top: 0px;">
                    
                    <div 
                        class="overall-single" 
                        v-for="(value, name) in hiddenData" 
                        :key="name">

                        <div>
                            <div class="overall-single-value" :style="value=='---' ? 'opacity: 0.2;font-weight:bold;' : 'opacity: 1;font-weight:bold;color:' + getColor(name)">
                                <span>{{value.toLocaleString()}}</span>
                            
                            </div>

                            <div class="overall-single-title">
                                <span>{{getLang(name)}}</span>
                            </div>

                            <div class="overall-single-compare">
                                <span :style="'color:' + getColor(name) + ';font-weight: bold; font-size: 14px;opacity: 0.8;'">{{  compare(value, name) }}</span>
                            </div>

                        </div>

                    </div>

                    <div style="width: 100%;opacity: 0.3;font-size: 14px;text-align:center;">{{ getLang('Countries data might have delay from the cases data') }}</div>

                </div>

                <div class="overall-expand" v-on:click="hiddenShow = !hiddenShow" v-if="mode == 'phone'">
                    <div><img :src="'./img/arrow.svg'" :style="'transform: rotate(' + (hiddenShow ? 180 : 0) + 'deg);'"></div>
                </div>

                <!-- update date -->
                <div id="update" :style="'margin-top:' + (hiddenShow ? 30 : 10) + 'px;'">
                    <div>{{getLang("Update")}}: {{update}}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { getDateFromTs } from '../../utils'

import { putCN } from '../../translate'
import { putColor } from './color'

export default {
    name: "overall",
    props:{
        allData:{
            type: Array,
            default(){
                return []
            }
        },
        historyData:{
            type: Array,
            default(){
                return []
            }
        },
        DPosi: {
            type: Number,
            default: 0
        },
        mode: {
            type: String,
            default: "phone"
        }
    },

    /*watch: {
        'DPosi' () {
            this.renderData["D. Posi."] = this.DPosi + "%"
        }
    },*/
    components:{
        //ICountUp,
    },

    data(){
        return{
            // Update time var
            update:"",
            more: false,
            // Selected data sources on figure section
            selected: 0,
            renderData: {},
            hiddenData: {},
            hiddenShow: this.mode == 'phone' ? false : true,
            // Render options Count-up package 
            countUpOptions:{
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.'
            },
        }
    },

    mounted(){
        this.renderFigure()

        // Get Update Time
        this.update = getDateFromTs(this.allData[0].ts)

    
    },
    methods:{
        
        // 顶上切换数据源tab切换时fire
        /*switchData(idx){
            this.selected = idx
            this.renderFigure()
        },*/

        // 从color.js获取各种颜色
        getColor(str){
            return putColor(str)
        },

        // Render figure data by data sources
        // 渲染数字（主要给切换数据源使用，每次切换调用这个方法）
        renderFigure(){

            // Process Current Selected Data For render
            const all = this.allData[this.selected]
            this.renderData = {
                confirmed: all.confirmed,
                death: all.death,
                "people tested": all.negative != 0 ? all.confirmed + all.negative : "---",
                "tests done": all.test_done != 0 ? all.test_done : "---",
                //negative: all.negative == 0 ? "---" : all.negative,
                hospital: all.hospital,
                "Posi. Rate": (((all.confirmed / all.test_done)*100).toFixed(2)) + "%",
                mortality: (((all.death / all.confirmed)*100).toFixed(2)) + "%"
            }

            this.hiddenData = {
                england: all.england,
                wales: all.wales,
                scotland: all.scotland,
                'n. ireland': all.nireland,
            }

            //this.renderData = this.formatNums(this.renderData)
            //this.historyData = this.formatNums(this.historyData)

        },

        formatNums(obj){
            let res = obj

            for(const p in res){

                if(!isNaN(res[p])){
                    res[p] = new Intl.NumberFormat().format(res[p])
                }
                
            }

            return res
        },

        showHidden(){
            this.hiddenShow = !this.hiddenShow
        },

        //  顶上八大金刚，对比昨日的数据，没有则显示---
        compare(value, name){

            if(this.historyData.length > 0){
                
                let res = parseInt(value - this.historyData[this.historyData.length - 1][name])

                // HARD FIX
                if(name == "people tested"){
                    res = parseInt(value - (this.historyData[this.historyData.length - 1].confirmed + this.historyData[this.historyData.length - 1].negative))
                }

                // HARD FIX
                /*if(name == "people tested"){
                    res = parseInt(value - this.historyData[this.historyData.length - 1].tested)
                }*/

                if(name == "n. ireland"){
                    res = parseInt(value - this.historyData[this.historyData.length - 1].nireland)
                }

                // HARD FIX
                if(name == "tests done"){
                    res = parseInt(value - (this.historyData[this.historyData.length - 1].test_done))
                }

                if(name == "serious"){
                    res = "---"
                }

                if(isNaN(res)){
                    return ''
                } else {
                    return res >= 0 ? '+' + res : '-' + res
                }
                
            } else {
                return '+0'
            }
        
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
#update{
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding-bottom: 20px;
    color: #CED3D6;
    opacity: 0.2;
}

#overall{
  width: 100%;
}

#overall-inner{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: #1D1F21;
  /*border-radius: 0 0 24px 24px;*/
}

#overall-more{
  display: flex;
  width: 100%;
}

.overall-show{
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 35px;
  margin-bottom: 20px;
}

.overall-hidden{
    padding-top: 65px;
}

.overall-expand{
    width: 100%;
    margin-top: -50px;
}

.overall-expand img{
    width: 18px;
    opacity: 0.65;
    cursor: pointer;
    transition: all 1.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.overall-single{
  height: 100px;
  margin-bottom: 16px;
  text-transform: uppercase;
  text-align:left;
  width: 50%;
}

.overall-single-bg{
  position: absolute;
  background: #2D3133;
  border-radius: 8px;
  width: calc(100%/12);
  height: 70px;
  margin-left: 160px;
  z-index:1;
}

.overall-single-title{
  font-size: 16px;
  font-weight: normal;
  opacity: 0.6;
  z-index:2;
  margin-bottom: 8px;
}

.overall-single-value{
  font-size: 26px;
  font-weight: bold;
  z-index:2;
}

.overall-source{
  width: 92%;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.overall-source-inner{
  width: 100%;
  color: #51606A;
  font-size: 16px;
  font-weight: bold;
  opacity: 0.6;
  cursor: pointer;
}

.overall-source img{
  width: 20px;
  height: 20px;
}


@media only screen and (max-width: 700px) {

    .overall-show{
        margin-bottom: 20px;
    }

    .overall-single{
        text-align: center;
        width: calc(100%/4);
        margin-bottom: 5px;
    }

    .overall-single-title{
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 0px;
    }

    .overall-single-value{
        font-size: 20px;
    }

    .overall-hidden{
        padding-top: 35px;
    }

    .overall-source-inner{
        right: 10px;
    }

    .overall-single-title{
        font-size: 10px;
    }

    .overall-single-value{
        font-size: 18px;
    }
}
</style>