import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
    const { currentVan } = useOutletContext()
    return (
        <>
            <h2>Photos go here</h2>
            <img
                src={currentVan.imageUrl}
                slt={`Photo of ${currentVan.name}`}
                className="host-van-detail-image"
            />
        </>
    )
}