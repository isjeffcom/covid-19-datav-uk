<template>
    <div id="addstore">
        <!--div id="form">
            <div id="map">
                <iframe id="mapifm" ref="mapifm" :src="iframeUrl" frameborder="0"></iframe>
            </div>
        </div-->
    </div>
</template>

<script>

export default {
    name: "addstore",
    data(){
        return{
            
        }
    },
    /*mounted(){

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
    }*/
}
</script>