// Translate wording dict

const wording = [
    ["Update", "最近更新"],
    ["Regions", "地域"],
    ["Data", "数据"],
    ["Case", "确诊"],
    ["Death", "死亡"],
    ['Hospital', '在院'],
    ['hospital', '在院'],
    ["england", "英格兰"],
    ["scotland", "苏格兰"],
    ["wales", "威尔士"],
    ["n. ireland", "北爱尔兰"],
    ["Data might be incompleted", "数据有可能不完整"],
    ["Rotate your device", "旋转你的设备"],

    // Charts
    ["C&D", "确诊/死亡"],
    ["Daily Increase", "日增长"],
    ["Growth Rate", "增长率"],
    ["Death Increase", "死亡增量"],
    ["Mortality Rate", "死亡率"],
    ["Tested Number", "测试数"],
    ["Positive Rate", "确诊率"],
    ["Confirmed", "确诊"],
    ["Full Chart", "全屏查看"],
    

    // HI
    ["Herd Immunity", "群体免疫"],
    ["UK Population", "英国总人口"],
    ["Immunity Point", "生效人口比例"],
    ["Million", "百万"],
    ["Progress", "进度"],

    ["Test", "测试"],
    ["Unknown Locations", "位置未知"],
    ["At least 1 day in arrears", "相比确诊数据有至少一天的延迟"],
    ["Location", "位置"],
    ["Cases", "数量"],
    ["References", "数据参考"],
    ["Support Us", "支持我们"],
    ["SUPPORT", "捐赠资助"],
    
    [
        "We have collected more than enough donations for the basic need. Welcome to buy us a coffee.", 
        "我们已经收集到足够的捐赠，如果你依旧喜欢，可以给我们买一杯咖啡。"
    ],
    ["Map", "地图"],
    ["List", "列表"],
    ["Postcode", "邮编"],
    ["Search by place", "通过地区关键字搜索"],
    ["Search by Postcode", "通过邮编搜索"],
    ["Cases Near", "案例临近"],
    
    
    // World
    ["Analysis", "数据解析"],
    ["Europe", "欧洲主要"],
    ["UK Prediction", "英国预测"],
    [
        "Prediction model based on ANN machine learning algorithm trained with Italy, Germany and France's data.", 
        "预测模型基于ANN机器学习算法，参考意大利，德国和法国数据。"
    ],
    [
        "Constantly Optimising by @Big-Tree, @Jimmy.",
        "由 @林大树 和 @陆嘉铭 同学持续开发和优化"
    ],
    ["@Jeff wu @vincent zhang","@Jeff Wu @张盛伟"],

    // Full Chart
    ["BACK", "返回"],
    ["Built for PC", "使用PC查看以获得最佳体验"],

    // Figures
    ["confirmed", "确诊"],
    ["death", "死亡"],
    ["cured", "治愈"],
    ["negative", "阴性"],
    ["people tested", "测试人次"],
    ["D. Posi.", "日检出"],
    ["Posi. Rate", "检出率"],
    ["mortality", "死亡率"],
    ["serious", "危重"],
    ["suspected", "疑似"],
    ["tests done", "测试总量"],
    ["Countries data might have delay from the cases data", "各国数据可能有延迟"],
    
    // Cases Map
    ["Cases Map", "周边疫情"],
    ["Data Source", "数据来源"],

    // Area
    ["Timeline", "时间轴"],
    ["All", "全部"],
    ["BACK", "返回"],


    // Key data
    ["Key Data", "关键数据"],
    ["Global data has 1 Day Delay", "全球数据有1天延迟"],
    ["Global Cases", "全球感染"],
    ["Global Death", "全球死亡"],
    ["[UK]Cases to go until herd immunity(60%)", "英国距群体免疫还需(60%人口)"],


    // Group Up
    ["Group Up", "群组讨论"],
    ["By", "通过"],

    // Donation
    ["THANK YOU", "谢谢支持"],
    [
        "Donation will be use for server maintenance, pay for data services(eg. Map), and team members health protection.", 
        "捐赠将会被用于服务维护，支付第三方数据服务(如地图等)，和团队成员的自我卫生保护。"
    ],
    ["CLOSE", "关闭"],

    // Heatmap
    ["Data Release", "数据更新时间"],
    ["when gov.uk website was edited (some might not updating figures)", "显示官方信息何时被编辑过(部分行为可能不是更新数据)"],

    ["Author", "作者"],
    ["Contributor", "团队贡献"],
    ["Others", "其他国家"]
    
]

const alert = {
    en: "<br>This data is a visualization for COVID-19 in the UK. <b>For reference purposes only.</b>. <br><br> You need to be aware: <br><br> 1. This data may not be completely <b>accurate or up to date</b>. <br> 2. All the markers on the map represent an area and <b>not buildings or streets</b>. <br> 3. The developer takes <b>no</b> responsibility for the accuracy of the data nor the service's stability. <br><br> Please double check with the <b>official channels<b> before acting on it. Cookies are used for statistical purposes only.",
    cn: "<br>本页面展示<b>COVID-19</b>英国疫情实时数据可视化, 所有数据及内容<b>仅供参考</b>。 <br><br> 你必须了解以下条款: <br><br> 1. 这些数据可能 <b>不是</b> 最新的或者精确的。 <br> 2. 区域数据中的标记<b>表示区域，不代表街道或建筑</b>。 <br> 3. 开发者<b>没有义务</b>去保证数据的精确及服务的稳定性。 <br><br> 在您基于本数据采取任何行动之前，请参考 <b>官方渠道和指引</b>。 因统计原因浏览器Cookie将被使用。"
}


export function putCN(str){
    for(let i=0;i<wording.length;i++){
        if(str == wording[i][0]){
            return wording[i][1]
        }
    }

    return str
}

export function getAlert(lang){
    if(lang == "zh-CN"){
        return alert.cn
    } else {
        return alert.en
    }
    
}