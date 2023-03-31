import { useEffect, useState } from "react"
import { calculateStand } from "../utils/calculateStand"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom/dist"

export function Results(){
    const [standsByScore, setStandsByScore] = useState([])
    const location =  useLocation() 
    const navigate = useNavigate()
    

    useEffect(() => {
        if (location.state){
            setStandsByScore(calculateStand(location.state.score))
        }
        
    }, [location.state])

    if (standsByScore.length > 0){
        return (
            <div className="results page">
                <h1>Results</h1>
    
                <div className="most-similar">
                    <h2 className="main-stand">Your most similar stand is: <a href={`https://jojowiki.com/${(standsByScore[0][0]).split('(')[0]}`} >{standsByScore[0][0]}</a></h2>
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
                <h2 className="home-link"  onClick={() => {navigate('/')}} >Go to home</h2>
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