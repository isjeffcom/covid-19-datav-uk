const colors = [
    {
        txt: "confirmed",
        color: "#F62E3A"
    },
    {
        txt: "death",
        color: "#B9A53C"
    },
    {
        txt: "cured",
        color: "#31DA93"
    },
    {
        txt: "tested",
        color: "#A4C2D2"
    },
    {
        txt: "negative",
        color: "#46DEFF"
    },
    {
        txt: "serious",
        color: "#D21414"
    },
    {
        txt: "suspected",
        color: "#A98AFF"
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
