import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
    const { currentVan } = useOutletContext()

    return (
        <h3 className="host-van-price">${currentVan.price}.00<span>/day</span></h3>
    )
}
