<template>
    <div id="notice">

        <div>
            <h1>End of service notice:</h1>
        </div>
        <div>
            <h2>
                This website started to provide COVID-19 UK information since the 6th of March 2020 at the very beginning of the lockdown. The COVID-19 epidemic has gradually eased. Unlike four months ago, the official channel now provides better quality and much more reliable data than most of the third-party tracker. 
            </h2>
        </div>

        <div>
            <h2>
                I've made a hard decision: COVID19UK.LIVE website should soon stop maintaining. For API users, please try to find an alternative as quickly as possible or you can download my scaper source code from <a href="https://github.com/isjeffcom/coronvirusFigureUK">here</a>.
            </h2>
        </div>

        <div>
            <h2>
                Thank you for your support. Stay safe.
            </h2>
        </div>

        <div>
            <h2>The Offical Data Sources:</h2>
        </div>

        <div>

            <li>
                <h3><a href="https://coronavirus.data.gov.uk/">UK National Dashboard / England Dashboard</a></h3>
            </li>

            <li>
                <h3><a href="https://public.tableau.com/profile/public.health.wales.health.protection#!/vizhome/RapidCOVID-19virology-Public/Headlinesummary">Wales Dashboard</a></h3>
            </li>

            <li>
                <h3><a href="https://www.publichealthscotland.scot/our-areas-of-work/sharing-our-data-and-intelligence/coronavirus-covid-19-data/">Scotland Dashboards and Statistic Reports</a></h3>
            </li>

            <li>
                <h3><a href="https://www.publichealthscotland.scot/our-areas-of-work/sharing-our-data-and-intelligence/coronavirus-covid-19-data/">North Ireland Dashboard</a></h3>
            </li>

        </div>
    </div>
</template>


<script>
export default {
    name: "notice"
}
</script>

<style scoped>
#notice{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0,0,0,0.9);
    color: #ffffff;
}
</style>