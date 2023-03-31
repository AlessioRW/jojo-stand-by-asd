import { useEffect, useState } from "react"
import { calculateStand } from "../utils/calculateStand"
import { useLocation } from "react-router-dom"

export function Results(){
    const [standsByScore, setStandsByScore] = useState([])
    const location =  useLocation() 
    const score = location.state.score

    useEffect(() => {
        setStandsByScore(calculateStand(score))
    }, [])

    if (standsByScore.length > 0){
        return (
            <div className="results page">
                <h1>Results</h1>
    
                <div className="most-similar">
                    <h2 className="main-stand">Your most similar stand is: {standsByScore[0][0]}</h2>
                </div>

                <div className="top-five">
                    <h2>Next cloesest stands:</h2>
                    {(standsByScore.slice(1,5)).map((stand) => {
                        return (
                            <div className="stand-container">
                                <h3 className="sub-stand">{stand[0]}</h3>
                            </div>
                        )
                    })}
                    
                </div>
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