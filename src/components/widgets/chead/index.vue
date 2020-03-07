<template>
    <div id="chead">
        <div id="chead-inner">
            <div id="chead-logo">
                <img src="https://i.ibb.co/ssYj6L8/ccc.png" alt="">
            </div>

            <div id="chead-right">
                <div class="circle" style="margin-right: 8px; margin-top: 3px;"></div>
                <div>Live</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "chead",
    props:{
        update: {
            type: String,
            default: "Unknown"
        }
    }
}
</script>

<style scoped>

@keyframes flashing {
    0% {opacity: 0}
    50% {opacity: 1}
    100% {opacity: 0}
}

.circle{
    width: 14px;
    height: 14px;
    border-radius: 100px;
    background:#CED3D6;
    animation-name: flashing;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
}

#chead{
    position: relative;
    height: 110px;
    width: 100%;
    background-color: #17181A;
    color: #CED3D6;
}

#chead-inner{
    width: 100%;
    display: flex;
}

#chead-logo{
    margin-top: 12px;
    margin-left: 24px;
}

#chead-right{
    position: absolute;
    right: 44px;
    display: flex;
    font-size: 18px;
    font-weight: bold;
    margin-top: 44px;
}

#chead-logo img{
    width: 200px;
}

@media only screen and (max-width: 800px) {

    #chead{
        height: 100%;
    }

    #chead-logo {
        margin-top: 16px;
        margin-left: 14px;
    }

    #chead-logo img {
        width: 160px;
    }

    
    #chead-right{
        right: 24px;
        margin-top: 40px;
    }
}
</style>