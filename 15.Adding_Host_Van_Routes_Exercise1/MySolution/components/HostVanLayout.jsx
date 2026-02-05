import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function HostVanLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <Outlet />
        </>
    )
}