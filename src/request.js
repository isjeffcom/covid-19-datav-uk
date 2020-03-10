const axios = require('axios')
const baseUrl = "https://coronauk.isjeff.com"

export function genGet (api, param, callback) {

    api = baseUrl + api
    
    axios.get(contParam(api, param)).then((response) => {

        callback({status: true, data: response.data})

    }).catch((err) => {
        callback({status: false, error: err})

    })
}
// Construct url with paramaters
function contParam (api, param) {
    
    // Assumble get url paramaters
    if(param.length > 0){
        api = api + "?"
        
        
        for(var i=0;i<param.length;i++){

            if(i == param.length - 1){
                
                api = api + param[i].name + "=" + param[i].val
            } else {
                api = api + param[i].name + "=" + param[i].val + "&"
            } 
        }    
    }

    return api
}