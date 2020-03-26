<template>
    <!-- Confirmed Charts -->
    <div class="charts-cont-s">
        <swiper :options="swiperOptions" ref="swiper">

            <swiper-slide v-for="(item,idx) in datas" :key="idx">

                 <div class="chart-range">
                    <div class="chart-inner" :style="'width:' + (rangeSelection.length * 54) + 'px;'">
                        <div 
                        class="chart-rs" 
                        v-for="(itm, idxx) in rangeSelection" 
                        :key="idxx"
                        v-on:click="toRs(item.name, itm, idxx)"
                        :style="'background:' + (idxx ==  rangeSelected ? '#CED3D6' : 'rgba(0,0,0,0)') + 
                                ';color:' + (idxx ==  rangeSelected ? '#000000' : '#CED3D6')">

                            <div class="chart-rs-txt">
                                {{isNaN(itm) ? itm : itm + 'd'}}
                            </div>
                        </div>
                    </div>
                    
                </div>

                <apexchart width="100%" height="280px" :ref="'chart-'+item.name" :type="item.type" :options="item.options" :series="item.data"></apexchart>
            </swiper-slide>

        </swiper>

        <div class="chart-switcher-cont" style="width: 100%; display: flex;">

            <div 
            class="chart-switcher" 
            v-for="(item, index) in datas" 
            :key="index"
            :style="'width: calc(100%/' + datas.length + ');border-color:' 
            + (chartIndexs == index ? '#46DEFF' : '#373D41') + ';color:' 
            + (chartIndexs == index ? '#46DEFF' : '#CED3D6') + ';background:'
            + (chartIndexs == index ? '#2D3133' : '#373D41')"
            v-on:click="chartSwitcher(index);toRs(item.name, rangeSelection[rangeSelected], rangeSelected);">
                {{ getLang(item.name) }}
            </div>
        </div>
    </div>
</template>

<script>

import { putCN } from '../../translate'
import { deepCopy, lightCopy } from '../../utils'

// Swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: "charts",
    components:{
        swiper,
        swiperSlide
    },
    props:{
        datas: {}
    },
    data(){
        return{
            lang: "",
            chartIndexs: 0,
            rangeSelection: [7, 14, 30, "ALL"],
            rangeSelected: 3,
            swiperOptions:{
                allowTouchMove: false
            }
        }
    },
    mounted(){
        this.lang = window.navigator.language
    },
    methods:{
        chartSwitcher(index){
            this.chartIndexs = index
            this.$refs['swiper'].swiper.slideTo(index)
        },

        toRs(target, days, idx){

            this.rangeSelected = idx


            if(this.$refs['chart-'+target]){

                const chart = this.$refs['chart-'+target][0]
                
                // If is new, recover to original
                if(days == "ALL"){
                    if(chart['original_data']){
                        let opt = deepCopy(chart["original_opts"])
                        opt.dataLabels.enabled = false
                        chart.updateSeries(deepCopy(chart["original_data"]))
                        chart.updateOptions(opt)
                        return
                    } else {
                        return
                    }
                }

                // If doesn't have original, save original
                if(!chart['original_data']){
                    let current = chart.series
                    let opts = this.$refs['chart-'+target][0].options

                    chart['original_data'] = deepCopy(current)
                    chart['original_opts'] = deepCopy(opts)
                }

                // Deep copy an original, deep copy mains it wouldnt effect on original
                let tmpData = deepCopy(chart['original_data'])
                let tmpOpts = deepCopy(chart['original_opts'])

                tmpOpts.dataLabels.enabled = true

                // Set new data
                chart.updateSeries(this.cutData(tmpData, days), false)
                chart.updateOptions(this.cutOpts(tmpOpts, days), false, false, false)

            }

        },

        cutData(data, days){
            
            let res = data
            for(let i=0;i<data.length;i++){
                let ds = this.cutArrToDays(data[i]['data'], days)
                res[i]['data'] = ds
            }

            return res
        },

        cutOpts(opts, days){
            
            let res = opts

            //console.log(opts['xaxis']['categories'])
            
            let os = this.cutArrToDays(opts['xaxis']['categories'], days) 
            res['xaxis']['categories'] = os

            //console.log(os)

            return res
        },

        cutArrToDays(arr, days){
            let res

            if(arr.length > days){
                let from = (arr.length-1)-days
                res = arr.slice(from, arr.length)
            }

            return res
        },

        getLang(str){
            if(this.lang != "zh-CN"){
                return str
            } else {
                return putCN(str)
            }
        },
    }
}
</script>

<style scoped>
.chart-range{
    width: 100%;
    margin-top: 30px;
}

.chart-inner{
    margin-left: auto;
    margin-right: auto;
    display: flex;
}

.chart-rs{
    width: 54px;
    height: 30px;
    border: 1px solid #CED3D6;
    text-align: center;
    margin-right: -1px;
    cursor: pointer;
}

.chart-rs-txt{
    margin-top: 8px;
    font-weight: bold;
}
</style>