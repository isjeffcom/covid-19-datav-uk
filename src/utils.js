export function numAddZero(num){

    num = String(num)
    return num.length < 2 ? '0' + num : num
}