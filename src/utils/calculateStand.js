const standStats = require('../stand-stats.json')

export function calculateStand(scores){
    const score = scores.split('-')
    //define spectrum stats to make it easier for me
    
    const dep = parseInt(score[0])
    const fix = parseInt(score[1])
    const speech = parseInt( score[2])
    const noise = parseInt(score[3])
    const soc = parseInt(score[4])
    const anx = parseInt(score[5])
    const post = parseInt(score[6])
    const eye = parseInt(score[7])
    const tics = parseInt(score[8])
    const agg = parseInt(score[9])

    //user stand stats, averaging out the two spectrum scores that are on either side of the stand stat
    const power = (dep+fix)/2
    const speed = (speech+noise)/2
    const range = (soc+anx)/2
    const stamina = (anx+post)/2
    const precision = (post+eye)/2
    const potential = (tics+agg)/2

    
    const standsByDiff = []
    for (let stand of standStats){
        let totalDiff = 0
        totalDiff += Math.abs(stand.stats.power - power)
        totalDiff += Math.abs(stand.stats.speed - speed)
        totalDiff += Math.abs(stand.stats.range - range)
        totalDiff += Math.abs(stand.stats.stamina - stamina)
        totalDiff += Math.abs(stand.stats.precision - precision)
        totalDiff += Math.abs(stand.stats.potential - potential)

        let addedStand = false
        if (standsByDiff.length <= 0){
            standsByDiff.push([stand.name, totalDiff])
        } else {
            for (let [i,checkStand] of standsByDiff.entries()){
                if (checkStand[1] < totalDiff){
                    standsByDiff.splice(i,0, [stand.name, totalDiff])
                    addedStand = true
                    break
                }
            }
        }
        if (!addedStand){
            standsByDiff.push([stand.name, totalDiff])
        }
    }
    return standsByDiff.reverse()
}