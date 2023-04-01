import { useEffect, useState } from "react"
import { calculateStand } from "../utils/calculateStand"
import { useLocation, useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom/dist"

export function Results(){
    const [standsByScore, setStandsByScore] = useState([])

    const location =  useLocation() 
    const navigate = useNavigate()


    function getGrade(stat){
        //using all if here becuase i'm lazy
        if (stat === 0){
            return '∅'
        }

        if (stat <= 16.6){
            return 'E'
        }

        if (stat >= 16.6 && stat < 33.3){
            return 'D'
        }

        if (stat >= 33.3 && stat < 50){
            return 'C'
        }

        if (stat >= 50 && stat < 66.6){
            return 'B'
        }

        if (stat >= 66.6 && stat < 83.3){
            return 'B'
        }

        if (stat === 100){
            return '∞'
        }

    }
    

    useEffect(() => {
        if (location.state){
            setStandsByScore(calculateStand(location.state.score))
            
            
        }
        
    }, [location.state])

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
                <p className="future">In the future i might generate the stand the users stat chart to compare on this page</p>
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