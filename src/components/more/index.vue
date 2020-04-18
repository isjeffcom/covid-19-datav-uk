<template>
    <!-- MORE INFO BUTTON -->
    <div id="more">

      <div class="more-single">

        <router-link to="/store">
          <img src="https://i.ibb.co/4jKPx0N/sc.png" alt="go to store checker">
        </router-link>

      </div>

      <div class="more-single">

        <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/" target="_blank">
          <img src="https://i.ibb.co/RNJTwnx/btn2.png" alt="to NHS official website for more help and information">
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

.more-single{
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

@media only screen and (max-width: 800px) {
    #more{
        width: 92%;
        display: block;
    }

    #more img{
        width: 100%;
    }
}
</style>