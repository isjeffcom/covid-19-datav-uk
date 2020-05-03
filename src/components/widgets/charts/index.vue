<template>
    <!-- Confirmed Charts -->
    <div class="charts-cont-s">
        <!-- Mobile View -->
        <div v-if="mode == 'phone'">
            <swiper :options="swiperOptions" ref="swiper">
                <swiper-slide v-for="(item,idx) in datas" :key="idx">

                    <div class="chart-range" v-if="showRange">

                        <div class="chart-inner" :style="'width:' + (rangeSelection.length * 54) + 'px;'">
                            <div 
                            class="chart-rs" 
                            v-for="(itm, idxx) in rangeSelection" 
                            :key="idxx"
                            v-on:click="toRs(item.name, itm, idxx, idx)"
                            :style="'background:' + (idxx ==  rangeSelected[idx] ? '#CED3D6' : 'rgba(0,0,0,0)') + 
                                    ';color:' + (idxx ==  rangeSelected[idx] ? '#000000' : '#CED3D6')">

                                <div class="chart-rs-txt">
                                    {{isNaN(itm) ? itm : itm + 'd'}}
                                </div>

                                
                            </div>

                        </div>

                    </div>

                    <apexchart width="100%" :height="mode == 'phone' ? '280px' : '480px'" :ref="'chart-'+item.name" :type="item.type" :options="item.options" :series="item.data"></apexchart>
                    <div class="chart-full" v-on:click="toFc(item.data, item.options, item.name, item.type)">{{ getLang("Full Chart")}} </div>
                
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
                v-on:click="chartSwitcher(index); toRs(item.name, rangeSelection[rangeSelected[index]], rangeSelected[index], index);">
                    {{ getLang(item.name) }}
                </div>
            </div>
        </div>

        <!-- PC View -->
        <div class="charts-pc-cont" v-else>
            <div class="charts-pc-s" v-for="(item, idx) in datas" :key="idx" :style="'width:calc(100%/' + datas.length + ');'">

                <div class="charts-pc-title">
                    <h2 style="font-size: 20px;">{{ getLang(item.name) }}</h2>
                    <hr style="margin-top:4px; width: 5%; opacity: 0.5;">
                    
                </div>

                <div class="charts-pc-main">
                    <div class="chart-range" v-if="showRange">

                        <div class="chart-inner" :style="'width:' + (rangeSelection.length * 54) + 'px;'">
                            <div 
                            class="chart-rs" 
                            v-for="(itm, idxx) in rangeSelection" 
                            :key="idxx"
                            v-on:click="toRs(item.name, itm, idxx, idx)"
                            :style="'background:' + (idxx ==  rangeSelected[idx] ? '#CED3D6' : 'rgba(0,0,0,0)') + 
                                    ';color:' + (idxx ==  rangeSelected[idx] ? '#000000' : '#CED3D6')">

                                <div class="chart-rs-txt">
                                    {{isNaN(itm) ? itm : itm + 'd'}}
                                </div>

                                
                            </div>

                        </div>

                    </div>

                    <apexchart width="100%" :height="mode == 'phone' ? '280px' : '380px'" :ref="'chart-'+item.name" :type="item.type" :options="item.options" :series="item.data"></apexchart>
                    <div class="chart-full chart-full-pc" v-on:click="toFc(item.data, item.options, item.name, item.type)">{{ getLang("Full Chart")}} </div>
                
                </div>

                
            </div>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import { putCN } from '../../../translate'
import { deepCopy } from '../../../utils'

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
        datas: {},
        showRange: {
            type: Boolean,
            default: true
        },
        mode: {
            type: String,
            default:"phone"
        }
    },
    data(){
        return{
            chartIndexs: 0,
            rangeSelection: [7, 14, 30, "ALL"],
            rangeSelected: [],
            swiperOptions:{
                allowTouchMove: false
            }
        }
    },

    created(){
        // Create array for range selection by datas length(how many charts)
        if(this.datas.length > 0){
            for(let i=0;i<this.datas.length;i++){
                this.rangeSelected.push(this.rangeSelection.length-1)
            }
        }
    },

    methods:{
        chartSwitcher(index){
            this.chartIndexs = index
            this.$refs['swiper'].swiper.slideTo(index)
        },

        toRs(target, days, idx, cidx){
            Vue.set(this.rangeSelected, cidx, idx)

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

                let cutRes = this.cutData(tmpData, tmpOpts, days)

                if(!chart['cd_'+days]){
                    chart['cd_'+days] = cutRes.data
                }

                if(!chart['co_'+days]){
                    chart['co_'+days] = cutRes.options
                }

                // Set new data
                chart.updateSeries(chart['cd_'+days], false)
                chart.updateOptions(chart['co_'+days], false, false, false)

            }

        },

        cutData(data, opts, days){
            
            let d = data
            let o = opts
            let cateLen = opts['xaxis']['categories'].length
            
            for(let i=0;i<data.length;i++){
                let ds = this.cutArrToDays(data[i]['data'], days)
                d[i]['data'] = ds
            }

            let os = this.cutArrToDays(opts['xaxis']['categories'], days) 
            o['xaxis']['categories'] = os

            return {data: d, options: o}
        },

        cutArrToDays(arr, days){
            let res

            if(arr.length > days){

                let from = (arr.length-1)-days
                res = arr.slice(from, arr.length)

            }

            return res
        },

        toFc(data, options, name, type){
            const to = {
                data: data,
                options: options,
                name: name,
                type: type
            }

            this.$router.push({path: '/fullchart', query: {d: to}})
        },

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
.charts-cont-s{
    margin-left: auto;
    margin-right: auto;
}
.chart-range{
    width: 100%;
    margin-top: 30px;
}

.chart-inner{
    margin-left: auto;
    margin-right: auto;
    display: flex;
}

.chart-full{
    width: 100%;
    margin-top: -6px;
    margin-bottom: 24px;
    font-size: 12px;
    color: #ffffff;
    opacity: 0.5;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
}

.chart-full-pc{
    width: 105.4%;
    height: 38px;
    margin-left: -3%;
    background: #232729;
    padding-top: 18px;
    margin-bottom: -13px;
    margin-top: 10px;
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
    font-size: 12px;
    margin-top: 8px;
    font-weight: bold;
}

.charts-pc-cont{
    display: flex;
    width: 100%;
}

.charts-pc-s{
    margin-top: 40px;
    overflow: hidden;
}

.charts-pc-title{
    margin-bottom: 20px;
}

.charts-pc-main{
    background: #292E31;
    box-shadow: 0px 4px 24px rgba(18, 19, 20, 0.5);
    border-radius: 4px;
    padding: 12px;
    margin-right: 40px;
}
</style>