<template>
    <div id='forecast'>
        <div class="title" style="background: #1D1F21; width: 100%; margin-bottom: 0px;">
          <div class="title-area inner" style="width: 92%; padding-top: 20px; padding-bottom:20px; margin-left:auto; margin-right: auto;">
            <span>{{getLang("World")}}</span><br>
            <div style="font-size: 12px; opacity: 0.5;">{{getLang("Data from Johns Hopkins University CSSE ")}}</div>
          </div>
        </div>

        <apexchart width="100%" height="320px" type="area" :options="chartOptions" :series="chartData"></apexchart>
    </div>
</template>


<script>
import { putCN } from '../../translate'
export default {
    name: "forecast",
    props:{
        chartData: {
            type: Array,
            default(){
                return [{
                    name: "UK",
                    data: [28, 29, 33, 36, 32, 32, 33]
                },
                {
                    name: "Italy",
                    data: [12, 11, 14, 18, 17, 13, 13]
                }]
            }
        }
    },

    data(){
        return{


            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                    stacked: false,
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                grid: {
                    borderColor: 'rgba(255,255,255,0.15)',
                },
                markers: {
                    size: 1
                },

                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                },
                yaxis: {
                    min: 5,
                    max: 40
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            },
        }
    },

    mounted(){
        //this.chartData = this.series
    },

    methods:{
        // 翻译，由translate.js提供字典
        getLang(str){
            if(this.lang != "zh-CN"){
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