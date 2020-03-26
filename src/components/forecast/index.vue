<template>
    <div id='forecast'>
        <apexchart width="100%" height="320px" type="area" :options="chartOptions" :series="chartData_tested"></apexchart>
    </div>
</template>


<script>

export default {
    name: "forecast",
    props:{
        uk: {
            type: Array,
            default(){
                return []
            }
        },

        italy: {
            type: Array,
            default(){
                return []
            }
        }
    },

    methods:{
        
    }
}
</script>

<style scoped>

</style>