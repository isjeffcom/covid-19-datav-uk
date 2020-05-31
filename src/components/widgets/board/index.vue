<template>
    <div id="board" ref="board">
        <div id="board-inner">
            <h2>Annocement</h2>
            <p>{{ content }}</p>
        </div>

        <div id="board-close" v-on:click="close()">
            <img :src="'./img/close.svg'" alt="close" width="30px">
        </div>
    </div>
</template>

<script>
export default {
    name: "board",
    props:{
        content: {
            type: String,
            value: ""
        }
    },
    methods:{
        close(){
            if(this.$refs["board"]){
                this.$refs["board"].style.animationName = "gone"
            }
            
        }
    }
}
</script>


<style>

@keyframes appear {
    0% {transform: translateY(-200px)}
    100% {transform: translateY(0px)}
}

@keyframes gone {
    0% {transform: translateY(0px)}
    100% {transform: translateY(-200px)}
}

#board{
    position: absolute;
    width: 100%;
    height: 70px;
    top: 0px;
    z-index: 9999;
    background: #36FFAB;
    color: #000000;
    border-bottom: 6px solid rgb(39, 187, 125);
    font-weight: bold;
    animation-name: appear;
    animation-duration: 0.45s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}

#board-inner{
    margin-top: 0px;
    padding: 14px;
}

#board-close{
    position: absolute;
    top: 28px;
    right: 50px;
    cursor: pointer;
}

@media only screen and (max-width: 700px) {
    #board{
        height: 110px;
        font-size: 12px;
    }

    #board-inner{
        margin-top: 20px;
    }

    #board-close{
        position: absolute;
        top: 10px;
        cursor: pointer;
    }
}
</style>