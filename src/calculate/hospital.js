export function hospitalCal (history, today) {
    return new Promise(resolve => {
        let res = {
            trend: []
        }

        // Loop
        history.forEach((el, index) => {

            res.trend.push(el.hospital)

        })

        // The Last One
        res.trend.push(today.hospital)

        resolve(res)
    })
}
