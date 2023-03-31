import { useEffect } from "react"
import { calculateStand } from "../utils/calculateStand"
import { useLocation } from "react-router-dom"

export function Results(){

    const score = useLocation().state.score

    useEffect(() => {
        calculateStand(score)
    })

    return (
        <div className="results page">
            <h1>Results</h1>
        </div>
    )
}