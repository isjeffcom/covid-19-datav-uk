<template>
    <div id="fullchart" v-if="loaded">

        <div class="scroll-notice" v-if="scrollNotice">
            <div class="sn-inner">
                <div class="sn-inner-img">
                    <img :src="'./img/cscroll.gif'" alt="scroll your phone" width="80px">
                </div>

                <div class="sn-inner-txt">
                    <span>{{getLang("Rotate your device")}}</span>
                </div>

                <div class="fc-back" style="margin-top: 10px;">
                    <span v-on:click="back()">{{getLang("BACK")}}</span>
                </div>
            </div>
            
        </div>

        <apexchart width="100%" :height="ch + 'px'" :ref="'chart-'+d.name" :type="d.type" :options="d.options" :series="d.data"></apexchart>
        <div class="fc-notice">({{getLang("Built for PC")}})</div>
        <div class="fc-back">
            <span v-on:click="back()">{{getLang("BACK")}}</span>
        </div>
    </div>
</template>


<script>
import { putCN } from '../../translate'

export default {
    name: "fullchart",
    data(){
        return{
            d: {},
            ch: 0,
            loaded: false,
            scrollNotice: false
        }
    },

    mounted(){

        this.screenCheck()

        this.ch = Math.floor(window.innerHeight) - 110

        // Display datalabel
        if(this.d.options){
            this.d.options.dataLabels.enabled = true
        }
        

        window.addEventListener('resize', ()=>{
            this.screenCheck()
            //this.ch = Math.floor(window.innerHeight) - 110
        })
    },
    created(){
        
        if(this.$route){


            if(typeof this.$route.query.d == "string"){
                this.$router.push({path:'/'})
                return
            } else {
                this.d = this.$route.query.d
                this.d.options.chart.toolbar.show = true
                this.d.options.chart.zoom.enabled = true
                this.loaded = true
            }

        } else {
            console.log("no data")
        }
        
    },
    methods:{
        back(){
            this.$router.go(-1)
        },

        screenCheck(){
            if(window.innerHeight > window.innerWidth && window.innerWidth < 800){
                this.scrollNotice = true
            } else {
                this.ch = Math.floor(window.innerHeight) - 110
                this.scrollNotice = false
            }
        },

        // 翻译，由translate.js提供字典
        getLang(str){
            if(navigator.language != "zh-CN"){
                return str
            } else {
                return putCN(str)
            }
        },
    }
}
</script>

<style scoped>

.scroll-notice{
    position: fixed;
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 999;
}

.sn-inner{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 60%;
    transform: translateY(-40%);
}

#fullchart{
    position: absolute;
    left:0px;
    width: 100%;
    height: 100%;
}

.fc-notice{
    width:100%;
    height: 40px; 
    text-align:center; 
    cursor:pointer; 
    color:#ffffff; 
    opacity: 0.4;
    font-size: 14px;
}

.fc-back{
    width:100%;
    height: 140px; 
    text-align:center; 
    cursor:pointer; 
    color:#3F8BBE; 
}
</style>