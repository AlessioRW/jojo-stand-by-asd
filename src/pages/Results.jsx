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
                    <h2>Your most similar stand is: {standsByScore[0][0]}</h2>
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