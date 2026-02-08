import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()
    console.log("outletContext:", useOutletContext)
    
    console.log("currentVan:", currentVan)
    return ( 
        <h2>{currentVan.description} Detailed info goes here</h2>
    )
}