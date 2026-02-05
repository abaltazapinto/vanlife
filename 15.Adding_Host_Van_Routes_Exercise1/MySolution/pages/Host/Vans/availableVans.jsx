import React from "react"
import { Link } from "react-router-dom"

export default function AvailableVans() {
    return (
        <div className="van-list-container">
            <h1>Explore my van options</h1>
            <Link to="1">Detail</Link>
        </div>
    )
}