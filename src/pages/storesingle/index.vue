<template>
    <div id="storesingle" v-if="loaded">
        <div id="ss-title">
            <p>{{ sdata.sname }}</p>
        </div>

        <div id="ss-add">
            <p>{{ sdata.address }}</p>
        </div>

        <div v-if="need">
            <span>Data out dated. Update it!</span>
            <button>NEW</button>
        </div>

        <div id="ss-store-cont">
            <div class="ss-store-s">
                <p>Vegetable &amp; Fruit:</p> 
                <p>{{ checkAva(sdata.d_vegfru) }}</p>
            </div>

            <div class="ss-store-s">
                <p>Meat &amp; Fish:</p> 
                <p>{{ checkAva(sdata.d_meatfish) }}</p>
            </div>

            <div class="ss-store-s">
                <p>Bread &amp; Rice:</p> 
                <p>{{ checkAva(sdata.d_bread) }}</p>
            </div>

            <div class="ss-store-s">
                <p>Milk:</p> 
                <p>{{ checkAva(sdata.d_milk) }}</p>
            </div>

            <div class="ss-store-s">
                <p>Eggs:</p> 
                <p>{{ checkAva(sdata.d_egg) }}</p>
            </div>

            <div class="ss-store-s">
                <p>Toilet Paper: </p> 
                <p>{{ checkAva(sdata.d_paper) }}</p>
            </div>

            <div class="ss-store-s">
                <p>Hand sanitizer:</p> 
                <p>{{ checkAva(sdata.d_handgel) }}</p>
            </div>

        </div>


        <div class="ss-add">
            <button v-on:click="toUp()">UPDATE</button>
        </div>
    </div>
</template>

<script>
import { genGet } from '../../request'
export default {
    name: "storesingle",
    data(){
        return{
            loaded: false,
            api: "http://localhost:8020/storesingle/",
            sid: "",
            sname: "",
            store: "",
            sdata: {},
            need: false
        }
    },
    created(){
        this.sname = this.$route.query.n
        this.sid = this.$route.query.id
        this.store = this.$route.query.s
        this.getData(this.store, this.sid)
    },
    methods:{
        getData(name, id){

            genGet(this.api, [
                {
                    name: "n",
                    val: name
                },
                {
                    name: "sid",
                    val: id
                },
            ], true, (res)=>{
                this.sdata = res.data.data[0]
                this.loaded = true
                if(!this.sdata.ts || Math.floor(this.sdata.ts - Date.now()) > 1*24*60*60*1000){
                    this.need = true
                }
            })
        },

        toUp(){
            this.$router.push({ path: "/storeup", query: {
                sname: this.sdata.sname,
                sid: this.sdata.id,
                store: this.store,
                add: this.sdata.address
            }})
        },

        checkAva(val){
            return val ? val : "---"
        }
    }
}
</script>


<style scoped>
#storesingle{
    color: #fff;
}
</style>