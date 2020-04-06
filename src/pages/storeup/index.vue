<template>
    <div id="storeup">
        <div id="su-title">
            <h2>{{ this.sname }}</h2>
            <h3>{{ this.add }}</h3>
        </div>

        <div id="su-subtitle">
            <h4>Update stock informaton</h4>
        </div>

        <div id="su-ques">
            <div class="su-ques-s" v-for="(item, index) in ques" :key="index">
                <div>
                    <p>{{item.name}}</p>
                </div>

                <div class="su-ques-s-m">
                    <star-rating v-model="item.val" :star-size="30" inactive-color="#333" active-color="#fff"></star-rating>
                </div>
            </div>

            <div class="su-ques-user">
                <div>Contributor: </div>
                <input type="text" placeholder="Anonymous" v-model="user">
            </div>
        </div>


        <button v-on:click="submit()">Submit</button>
    </div>
</template>


<script> 

import StarRating from 'vue-star-rating'
import { genPost } from '../../request'
// https://www.npmjs.com/package/vue-star-rating

export default {
    name: "storeup",
    components:{
        StarRating
    },
    data(){
        return{
            api: "http://localhost:8020/up/",
            sid: null,
            sname: null,
            add: null,
            store: null,
            markUp: true,
            user: "",
            ques: [
                {
                    name: "Vegetable & Fruit",
                    key: "d_vegfru",
                    val: 1,
                },
                {
                    name: "Meat & Fish",
                    key: "d_meatfish",
                    val: 1,
                },
                {
                    name: "Bread & Rice",
                    key: "d_bread",
                    val: 1,
                },
                {
                    name: "Milk",
                    key: "d_milk",
                    val: 1,
                },
                {
                    name: "Eggs",
                    key: "d_egg",
                    val: 1,
                },
                {
                    name: "Toilet Paper",
                    key: "d_paper",
                    val: 1,
                },
                {
                    name: "Hand sanitizer",
                    key: "d_handgel",
                    val: 1,
                }
            ],
            marks: [1,3,5]
        }
    },
    created(){

        if(!this.$route.query.sid && !this.$route.query.sname){
            return
        }

        this.sid = this.$route.query.sid
        this.sname = this.$route.query.sname
        this.store = this.$route.query.store
        this.add = this.$route.query.add
    },

    methods:{

        submit(){
            let postReady = {
                sname: this.store,
                sid: this.sid,
                data: this.constPD(),
            }

            postReady.data.user = this.user ? this.user : "Anonymous" 

            genPost(this.api, postReady, true, (res)=>{
                if(res.status){
                    alert("Successfully updated. You've done a grate help!")
                    this.$router.replace({path: "/store"})
                } else {
                    alert("unknow error")
                }
            })
        },

        constPD(){
            let res = {}
            for(let i=0;i<this.ques.length;i++){
                console.log(this.ques[i]["key"])
                res[this.ques[i]["key"]] = this.ques[i]["val"]
            }

            return res
        }
        /*makeMark(){
            console.log(this.ques)
        }*/
    }
}
</script>

<style scoped>

.su-ques-s-m{
    display: flex;
}

.su-ques-s-m-s{
    width: 30px;
    height: 30px;
    border-radius: 100px;
    border: 2px solid #fff;
}
</style>