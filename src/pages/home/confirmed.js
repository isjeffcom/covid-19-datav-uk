import { getDateFromTs } from '../../utils'

export function ConfirmCategories(history){
    return new Promise(resolve => {

        let categories = [] // Chart's categories

        history.forEach(el => {    
            el.date = getDateFromTs(el.date, "datesimple")
            categories.push(el.date)
        })

        // Push last one
        categories.push(getDateFromTs(Date.parse( new Date()), "datesimple"))

        resolve(categories)
    })
}

export function ConfirmOverallTrend(history, today) {

    return new Promise(resolve => {
        // Create Array for Fill in history data
       
        let confirmed = []
        let death = []

        history.forEach(el => {    
            confirmed.push(el.confirmed)
            death.push(el.death)
        })

        // Push latest data as its not belong to the history
        confirmed.push(today.confirmed)
        death.push(today.death)

        let res = { confirmed: confirmed, death: death }

        resolve(res)

    })
    
}

export function ConfirmDaily (history, today) {
    return new Promise(resolve => {
        var res = []

        let tc = parseInt(today.confirmed)

        history.forEach((el, index) => {

            // If first one
            if(index == 0){
                res.push(el.confirmed - 0)
            } 
            
            else {
                res.push(el.confirmed - history[index-1].confirmed)
            }
        })

        res.push(today.confirmed - history[history.length-1].confirmed )

        res.unshift(0)

        resolve(res)
    })
}


export function ConfirmIncrement(history, today) {
    return new Promise(resolve => {
        let inc = [] // Chart's categories
    
        history.forEach((el, index) => {

            let increse
            if(index == 0){
                increse = parseFloat((el.confirmed-0)/10).toFixed(4)
            }
            else{
                let last = history[index-1].confirmed
                increse = parseFloat((el.confirmed-last)/last).toFixed(4)
            }
            

            inc.push((increse*100).toFixed(4))
        })

        // Push latest data as its not belong to the history
        let todayLast = history[history.length-1].confirmed
        let todayInc = (Number.parseFloat((today.confirmed - todayLast) / todayLast).toFixed(4))
        inc.push((todayInc*100).toFixed(4))

        resolve(inc)

    })
    
}