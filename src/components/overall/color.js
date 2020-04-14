const colors = [
    {
        txt: "confirmed",
        color: "#CD3C3C"
    },
    {
        txt: "death",
        color: "#E4BA25"
    },
    {
        txt: "mortality",
        color: "#FA7D55"
    },
    {
        txt: "cured",
        color: "#31DA93"
    },
    {
        txt: "tested",
        color: "#3DAFE0"
    },
    {
        txt: "negative",
        color: "#2CC585"
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
        color: "#9289FF"
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
        color: "#00AB39"
    },
    {
        txt: "scotland",
        color: "#0065BD"
    },
    {
        txt: "n. ireland",
        color: "#C60C30"
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
