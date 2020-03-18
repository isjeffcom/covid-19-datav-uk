export function Tested (history, today) {
    return new Promise(resolve => {

        let all = []
        let growth = []

        history.forEach((el,index) => {
            let tested = el.confirmed + el.negative
            
            all.push(tested)

            if(index == 0){
                growth.push(0)
            }else{
                growth.push(tested - (history[index-1].confirmed + history[index-1].negative))
            }

            // Today
            if(index == history.length - 1){
                let tod = today.confirmed + today.negative
                let lastDay = (history[history.length-1].confirmed + history[history.length-1].negative)
                all.push(tod)
                growth.push(tod - lastDay)
            }
            
        })
        
        resolve({all: all, growth: growth})

    })
}

export function TestedDRate(history, today){
    return new Promise(resolve => {

        var res = []
        history.forEach((el,index) => {
            if(index == 0){
                //res.push(0)
            }else{
                let co = el.confirmed - history[index-1].confirmed
                let te = (el.confirmed + el.negative) - (history[index-1].confirmed + history[index-1].negative)
                let cote = parseFloat((co/te).toFixed(4))*100
                res.push(cote.toFixed(4))
            }
            
        })

        let todCo = today.confirmed -history[history.length-1].confirmed
        let todTe = (today.confirmed + today.negative) - (history[history.length-1].confirmed + history[history.length-1].negative)
        let tod = parseFloat((todCo/todTe).toFixed(4))*100
        if(isNaN(tod)){
            tod = 0
        }

        res.push(tod.toFixed(4))

        
        resolve(res)

    })
}