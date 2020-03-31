<template>
    <div id="addstore">
        <div id="form">
            <div id="map">
                <iframe id="mapifm" ref="mapifm" :src="iframeUrl" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "addstore",
    data(){
        return{
            api:"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=55.9490576,-3.1836716&radius=1500&type=store&keyword=tesco&key=AIzaSyBQDwsA6PES3fCvEAzHeKP5f50XdbDR1WI",
            storeName: "tesco/",
            storeList: [
                "Tesco",
                "Co-op",
                "Asda",
                "Lidl",
                "Aldi",
                "Sainsbury's",
                "Marks & Spencer",
                "Farmfoods",
                "Waitrose",
                "Booths",
                "Boots",
                "Ocado",
                "Budgens",
                "Jacks",
                "Iceland",
                "Morrisons",
                "Heron Foods",
                "Fulton's Foods"
            ]
        }
    },
    mounted(){

        //url变化监听器
        if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
            // 浏览器支持onhashchange事件
            window.onhashchange = this.hashChange()  // TODO，对应新的hash执行的操作函数
        }

    },
    created(){
        //this.updateIframe(this.gmap + this.storeName)
        console.log(this.gmap + this.storeName)
    },
    methods:{
        updateIframe(url){
            this.iframeUrl = url
            console.log(this.$refs["mapifm"])
            //this.$refs["mapifm"].contentWindow.location.reload(true)
        },
        hashChange(){
            console.log("url changed")
        }
    }
}
</script>