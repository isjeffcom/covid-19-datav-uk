<template>
    <div id="slots">
        <div id="slots-input">
            <div id="slots-store">
                <div id="sl-select">
                    <select v-model="selected" @change="changed()">
                        <option v-for="(item, index) in stores" :key="index">{{item}}</option>
                    </select>
                </div>

                <div id="sl-sinput">
                
                    <div id="sl-sinput-box">
                        <input type="text" v-model="searchInput" placeholder="UK Postcode">
                    </div>

                    <div id="sl-sinput-check">
                        <button v-on:click="getData()">Search</button>
                    </div>
                    
                </div>

                <div id="sl-list" :style="'height:' + (screenHeight > 0 ? screenHeight - 365 : 300) + 'px;'">

                    <div 
                    class="sl-s"
                    v-for="(item, index) in slotRes" 
                    :key="index">

                        <div class="sl-s-info">
                            <div class="sl-s-name">
                                {{ item.start }}
                            </div>
                                
                            <div class="sl-s-add">
                                Delivery Fee: £{{ item.price }}
                            </div>

                        </div>
                        
                    </div>

                    <div v-if="slotRes.length < 1" style="margin-top: 30px; opacity: 0.2;">
                        <span>Search Available By Postcode</span>
                    </div>

                    
                </div>
            </div>
        </div>

        <div id="slots-sub" v-on:click="openSub = !openSub">
            <div id="slots-sub-inner">Subscribe</div>
        </div>

        <div id="slots-form" v-if="openSub">

            <div id="slots-form-close">
                <img :src="'./img/close.svg'" width="30px" alt="close slots" v-on:click="openSub = false">
            </div>

            <div id="slots-form-inner">
                <h2>Subscribe</h2>
                <div>
                    <div class="slots-form-s">
                        <select v-model="form.store" @change="changed()">
                            <option v-for="(item, index) in stores" :key="index">{{item}}</option>
                        </select>
                    </div>
                    
                    <div class="slots-form-s">
                        Email: <input type="text" v-model="form.email">
                    </div>

                    <div class="slots-form-s">
                        Postcode: <input type="text" v-model="form.pc">
                    </div>

                    <input type="submit" v-on:click="sub()">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { genPost, genPostJSON, genGet } from '../../request'
export default {
    name: "slots",
    data(){
        return{
            api: "https://delislot.ml/qs",
            api_sub: "https://delislot.ml/subs",
            stores: [
                "ASDA"
            ],
            openSub: false,
            selected: "ASDA",
            searchInput: "",
            slotRes: [],
            screenHeight: 0,
            form:{
                store: "ASDA",
                email: "",
                pc: ""
            }
        }
    },
    mounted(){
        this.screenHeight = screen.height

        window.addEventListener("resize", ()=>{
            this.screenHeight = screen.height
        })
    },
    methods:{
        getData(){
            if(this.searchInput.length > 3){

                let postReady = {
                    pc: this.searchInput
                }

                genPost(this.api, postReady, true, (res)=>{
                    this.slotRes = res.data
                })

            } else {
                alert("Please input vaild UK postcode")
            }
            
        },

        sub(){
            let postReady = {
                email: this.form.email,
                pc: this.form.pc,
                src: 0,
                sleep: false
            }

            genPostJSON(this.api_sub, postReady, true, (res)=>{
                if(res.status){
                    this.openSub = false
                    alert("Success. We will notify you when slot available.")
                }
            })
        }
    }
}
</script>

<style scoped>

select{
    height: 50px;
}

#slots-input{
    padding: 8px;
}

#sl-sinput{
    width: 100%;
    display: flex;
    margin-bottom:6px;
}

#sl-list{
    color: #fff;
    width: 92%;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
    overflow-y:scroll; 
    text-align: center;
}

#sl-sinput button{
    height: 32px;
    padding-top: 2px;
}

#sl-select{
    margin-top: 20px;
    margin-bottom: 20px;
}

#sl-sinput-check{
    width: 10%;
}

#sl-sinput-box{
    width: 80%;
}

.sl-s{
    width: 90%;
    margin-top: 12px;
    margin-bottom: 12px;
    background: #2C3134;
    border: 1px solid rgba(255,255,255,0);
    -webkit-transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 12px;
}

.sl-s-info{
    width: 100%;
}

.sl-s-name{
    font-size: 16px;
    font-weight: bold;
    margin-top: 4px;
}

.sl-s-add{
    font-size: 12px;
    font-weight: normal;
    opacity: 0.5;
}

#slots-sub{
    position: fixed;
    height: 40px;
    bottom: 0px;
    width: 100%;
    background: #FFD643;
    color: #222;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    padding-top: 20px;
}

#slots-sub-inner{
    width: 100%;
}

#slots-form{
    position: fixed;
    height: 70%;
    bottom: 0px;
    width: 100%;
    background: #FFD643;
    color: #222;
    font-weight: bold;
    text-align: center;
    padding-top:20px;
    text-align: left;
}

#slots-form-inner{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

#slots-form-close{
    position: absolute;
    bottom: 92%;
    right: 8px;
    cursor: pointer;
}

.slots-form-s{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>