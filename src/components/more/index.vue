<template>
    <!-- MORE INFO BUTTON -->
    <div id="more">

      <div class="more-s" style="margin-bottom:20px;">

        <router-link to="/store">
          <img :src="'./img/stockchecker.png'" alt="go to store checker">
        </router-link>

      </div>

      <!--div style="margin-bottom:20px;">

        <a href="https://www.google.com/maps/d/u/0/embed?mid=1yCPR-ukAgE55sROnmBUFmtLN6riVLTu3&ll=54.019029244689136%2C-1.956174250177014&z=7" target="_blank">
          <img src="https://i.ibb.co/GnR4nCt/yessdg.png" alt="Cases explorer">
        </a>

      </div-->

      <div class="more-s" style="margin-bottom:20px;">

        <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/" target="_blank">
          <img :src="'./img/helpandinfo.png'" alt="to NHS official website for more help and information">
        </a>

      </div>

      <div class="more-s">

        <a href="https://playground.isjeff.com/relaxgame" target="_blank">
          <img :src="'./img/playgame.png'" alt="play stress release game">
        </a>

      </div>

      

    </div>
</template>


<script>
export default {
    name: "more",
    
}
</script>


<style scoped>

#more{
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  text-align: center;
  display: flex;
}

#more img{
  width: 400px;
}


.more-s{
  width: calc(100%/3);
}

@media only screen and (max-width: 800px) {
    #more{
      width: 92%;
      display: block;
    }

    #more img{
        width: 100%;
    }

    .more-s{
      width: 100%;
    }
}
</style>