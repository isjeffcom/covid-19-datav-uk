<template>
    <div id="store">
        <storelist></storelist>
        <alert :title="alt.tit" :content="alt.content" :submit="alt.submit"></alert>
    </div>
</template>


<script>
import storelist from '../../components/widgets/storelist'
import { EventBus } from '../../bus'

import alert from '../../components/widgets/alert'

export default {
    name: "store",
    components: {
        storelist,
        alert
    },
    data(){
        return{
            alt: {
                tit: "What is stock checker?",
                content: "This is a testing function that allows you to share and check your nearby local store's stock situation. We encourage everyone to share the stock information to avoid the mass flow in the shipping area and unnecessary exposure. Be aware that these data are not provided by the official. We have no resource to check every submission so we can only hope one can be honest.",
                submit: "Agree"
            }
        }
    },
    created(){
        EventBus.$on("slclick", (res)=>{
            //console.log(res)
            this.$router.push({path: "/storesingle", query: {n: res.sname, id: res.id, s: res.store}})
        })
    }
}
</script>