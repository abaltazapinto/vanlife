import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
    const { currentVan } = useOutletContext()
    return (
        <h2>${currentVan.price} Pricing info goes here</h2>
    )
}