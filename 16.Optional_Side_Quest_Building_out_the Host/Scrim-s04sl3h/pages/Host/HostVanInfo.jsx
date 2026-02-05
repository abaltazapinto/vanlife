import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()

    return (
        <div className="host-van-detail-info">
            <p><span>Name:</span> {currentVan.name}</p>
            <p><span>Category:</span> {currentVan.type}</p>
            <p><span>Description:</span> {currentVan.description}</p>
            <p><span>Visibility:</span> Public</p>
        </div>
    )
}
