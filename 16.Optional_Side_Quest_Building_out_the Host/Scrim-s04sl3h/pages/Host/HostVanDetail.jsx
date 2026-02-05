import React from "react"
import { Link, useParams } from "react-router-dom"

export default function HostVanDetail() {
    const params = useParams()
    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans[0]))
    }, [params.id])

    return (
        <section className="host-van-detail-section">
            <Link to=".." relative="path" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>

            {van ? (
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                        <div className="host-van-detail-info-text">
                            <i className={`van-type ${van.type} selected`}>{van.type}</i>
                            <h3>{van.name}</h3>
                            <h4>${van.price}/day</h4>
                        </div>
                    </div>

                    <div className="host-van-detail-info">
                        <p><span>Name:</span> {van.name}</p>
                        <p><span>Category:</span> {van.type}</p>
                        <p><span>Description:</span> {van.description}</p>
                        <p><span>Visibility:</span> Public</p>
                    </div>
                </div>
            ) : <h2>Loading...</h2>}
        </section>
    )
}
