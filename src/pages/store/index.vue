<template>
    <div id="store">
        <storelist></storelist>
    </div>
</template>


<script>
import storelist from '../../components/widgets/storelist'
import { EventBus } from '../../bus'
export default {
    name: "store",
    components: {
        storelist
    },
    created(){
        EventBus.$on("slclick", (res)=>{
            //console.log(res)
            this.$router.push({path: "/storesingle", query: {n: res.sname, id: res.id, s: res.store}})
        })
    }
}
</script>