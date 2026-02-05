import React from "react"
import { Link } from "react-router-dom"

export default function HostVans() {
    const [vans, setVans] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        fetch("/api/host/vans")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to load host vans")
                }
                return res.json()
            })
            .then(data => setVans(data.vans || []))
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <h2 className="host-status-message">Loading host vans...</h2>
    }

    if (error) {
        return <h2 className="host-status-message">Error: {error}</h2>
    }

    const hostVansElements = vans.map(van => (
        <Link to={van.id} key={van.id} className="host-van-link-wrapper">
            <div className="host-van-single">
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {hostVansElements.length > 0
                    ? hostVansElements
                    : <p className="host-status-message">No vans found for this host.</p>}
            </div>
        </section>
    )
}
