import { useEffect, useState } from "react"
import { calculateStand } from "../utils/calculateStand"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom/dist"

export function Results(){
    const [standsByScore, setStandsByScore] = useState([])
    const [imgData, setImgData] = useState('')
    const location =  useLocation() 
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state){
            setStandsByScore(calculateStand(location.state.score))
        }
        
    }, [location.state])

    useEffect(() => {
        if (standsByScore.length > 0){
            const standStats = Object.values(standsByScore[0][2]).map((score) => {
                return getGrade(score)
            })

            const userStats = Object.values(standsByScore[standsByScore.length-1]).map((score) => {
                return getGrade(score)
            })

            console.log(standsByScore[0][2])
            console.log(standStats)
            fetch(`https://jojo-stand-by-asd-api-production.up.railway.app/graph/${userStats.join('-')}/${standStats.join('-')}/${standsByScore[0][0]}`, {method: 'POST'}).then(res => res.json()).then(data => setImgData(data[1].buffer))
        }
    }, [standsByScore])

    


    function getGrade(stat){
        //using all if here becuase i'm lazy
        if (stat === 0){
            return '∅'
        }

        if (stat <= 17){
            return 'E'
        }

        if (stat > 17 && stat < 33.3){
            return 'D'
        }

        if (stat >= 33.3 && stat <= 50){
            return 'C'
        }

        if (stat >= 50 && stat < 68){
            return 'B'
        }

        if (stat >= 66.6 && stat < 83.3){
            return 'A'
        }

        if (stat >= 83.3 && stat < 100){
            return '∞'
        }

    }
    

    

    if (standsByScore.length > 0){
        const userStats = standsByScore[standsByScore.length-1]
        return (
            <div className="results page">
                
                <h1>Results</h1>
    
                <div className="most-similar">
                    <h2 className="main-stand">Your most similar stand is: <a href={`https://jojowiki.com/${(standsByScore[0][0]).split('(')[0]}`} >{standsByScore[0][0]}</a></h2>
                </div>

                <h3 className="user-stats-title">Your Stats: </h3>
                <div className="user-stats">
                    
                    <div className="stat">
                        <h3>Power: </h3>
                        <h3> {getGrade(userStats.power)} ({userStats.power})</h3>
                    </div>

                    <div className="stat">
                        <h3>Speed: </h3>
                        <h3>{getGrade(userStats.speed)} ({userStats.speed})</h3>
                    </div>

                    <div className="stat">
                        <h3>Range: </h3>
                        <h3>{getGrade(userStats.range)} ({userStats.range})</h3>
                    </div>

                    <div className="stat">
                        <h3>Stamina: </h3>
                        <h3>{getGrade(userStats.stamina)} ({userStats.stamina})</h3>
                    </div>

                    <div className="stat">
                        <h3>Precision: </h3>
                        <h3>{getGrade(userStats.precision)} ({userStats.precision})</h3>
                    </div>

                    <div className="stat">
                        <h3>Potential: </h3>
                        <h3>{getGrade(userStats.potential)} ({userStats.potential})</h3>
                    </div>
                    
                </div>

                {imgData === '' ? 
                    <h3>Generating Graph Comparison...</h3>
                :
                <div className="image-div">
                    <img alt='stand-stats graph' className="stats-img" src={`data:image/jpeg;base64, ${imgData}`} />
                </div>
                }

                

                <div className="top-five">
                    <h2>Next cloesest stands:</h2>
                    {(standsByScore.slice(1,5)).map((stand) => {
                        return (
                            <div className="stand-container">
                                <h3 className="sub-stand"><a href={`https://jojowiki.com/${(stand[0]).split('(')[0]}`} >{stand[0]}</a></h3>
                            </div>
                        )
                    })}
                    
                </div>
                <h2 className="home-link"  onClick={() => {navigate('/')}} >back to home</h2>
            </div>
        )
    } else {
        return (
            <div className="results page">
                <h1>Results</h1>
    
                <div className="loading">
                    <h2>Your results are being loaded</h2>
                </div>
            </div>
        )
    }
    
    
}