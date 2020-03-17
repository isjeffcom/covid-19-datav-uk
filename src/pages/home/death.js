export function DeathIncrement (history, today){
    return new Promise(resolve => {
        // Create Array for Fill in history data
       
        let death = []

        history.forEach((el, index) => {
            //death.push(el.death)
            let increse
            if(index == 0){
                increse = el.death-0
            }
            else{
                let last = history[index-1].death
                increse = el.death-last
            }

            death.push(increse)

        })

        // Push latest data as its not belong to the history
        death.push(today.death - history[history.length-1].death)
        
        resolve(death)

    })
}

export function DeathRate (history, today){
    return new Promise(resolve => {
        // Create Array for Fill in history data
       
        let dR = []

        history.forEach((el, index) => {
            
            let rate
            if(index == 0){
                rate = 0
            } else {
                rate = parseFloat((el.death)/el.confirmed).toFixed(4)*100
            }
            dR.push(rate.toFixed(4))
        })

        // Push latest data as its not belong to the history
        let res = parseFloat((today.death)/today.confirmed).toFixed(4)*100
        dR.push(res.toFixed(4))

        resolve(dR)

    })
}