export function numAddZero(num){

    num = String(num)
    return num.length < 2 ? '0' + num : num
}

export function getDateFromTs(ts, mode){
    var res
    const d = new Date(ts)
    if(mode == "date"){
        res = d.getFullYear() + '-' + numAddZero(d.getMonth() + 1) + '-' + numAddZero(d.getDate())
    } 

    else if(mode == "datesimple"){
        res = numAddZero(d.getMonth() + 1) + '-' + numAddZero(d.getDate())
    }

    else if(mode == "time"){
        res = numAddZero(d.getHours()) + ':' + numAddZero(d.getMinutes()) + ':' + numAddZero(d.getSeconds())
    }

    else{
        res = d.getFullYear() + '-' + numAddZero(d.getMonth() + 1) + '-' + numAddZero(d.getDate()) + ' ' + numAddZero(d.getHours()) + ':' + numAddZero(d.getMinutes()) + ':' + numAddZero(d.getSeconds())
    }
    return res
}

export function indexOfObjArr(target, arr, id){
    var res = -1
    for(let i=0;i<arr.length;i++){
        if(target == arr[i][id]){
            res = i
        }
    }

    return res
}
