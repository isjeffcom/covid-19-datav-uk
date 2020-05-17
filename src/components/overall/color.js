const colors = [
    {
        txt: "confirmed",
        color: "#FF535D"
    },
    {
        txt: "death",
        color: "#FFD076"
    },
    {
        txt: "mortality",
        color: "#E98565"
    },
    {
        txt: "hospital",
        color: "#FF7D95"
    },
    {
        txt: "people tested",
        color: "#65A3FF"
    },
    {
        txt: "tests done",
        color: "#AAD6FF"
    },
    {
        txt: "negative",
        color: "#51ECAB"
    },
    {
        txt: "serious",
        color: "#D21414"
    },
    /*{
        txt: "D. Posi.",
        color: "#9289FF"
    },*/
    {
        txt: "Posi. Rate",
        color: "#B592FF"
    },
    /*{
        txt: "suspected",
        color: "#A98AFF"
    },*/
    {
        txt: "england",
        color: ""
    },
    {
        txt: "wales",
        color: "#52B071"
    },
    {
        txt: "scotland",
        color: "#4198E4"
    },
    {
        txt: "n. ireland",
        color: "#EE5774"
    },
]

export function putColor(str){
      
    for(let i=0;i<colors.length;i++){
        if(str == colors[i].txt){
        return colors[i].color
        }
    }

    return ""
      
}
