VanDetails.jsx

We are basicaly builting a "Host van details" page that:
    1. reads the van id from the URL
    2. fetches that van from an API
    3. renders the van header + nested tabs (details / pricing/ photos)
    4. renders the van header + nested tabs (Details / Pricing / Photos)
    5. uses <Outlet> to render the nested route component, and passes the van down via context.

    1) Imports

    *** import React from "react"
        import { Link, NavLink, Outlet, useParams } from "react-router-dom
        ***

        - React: needed for hooks like React.useState and React.useEffect.
        - Link: client-side navigation (no page reload).
        - Navlink: like Link, but it can itself differently when it mathces the current URL (active tab styling).
        - Outlet: placeholder where nested route components render (Details/Pricing/Photos)
        - useParams: reads dynamic URL params like /host/vans/:id.

2) Component + State

*** 
    export default function HostVanDetail() {
        const params = useParams()
        const [van, setVan] = React.useState(null)
        const [isLoading, setIsLoading] = React.useState(true)
        const [error, setError] = React.useState(null)
    }
    ***

useParams()
If your route is something like:

***
    <Route path="host/vans/:id" element={<HostVanDetail />}>
***

and the browser is at:
/host/vans/1

then:

    . params.id is "1" (usually a string)

State meanings
    . van: the fetched van object (starts as null until loaded)
    . isLoading: starts true, flips to false after the fetch finishes (sucess or error)
    . error: holds an error message string (or null if no error)

This is a standard "async data" state trio

3) Fetching data with useEffect

***
    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to load host van details")
                }
                return res.json()
            })
            .then(data => {
                const selectedVan = Array.isArray(data.vans) ? data.vans[0] : data.vans
                if (!selectedVan) {
                    throw new Error("Van not found for this host")
                }
                setVan(selectedVan)
            })
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false))
    }, [params.id])

Why useEffect here ? 

Because fetching is a side effect: you're calling an API after render.

The dependency array: [params.id]

This means:
    . run this effect on first mount
    . and run again if the URL id changes (example: user navigates from /host/vans/1 to /host/vans/2 without a full reload)

Fetch chain breakdown

    1. fetch(/api/host/vans/${params.id})
        Hits the endpoint for that van id.
    2. .then(res => { if (!res.ok) throw ...; return res.json() })
        . res.ok is false for HTTP errors like 404/500
        . if not ok -> throw an Error, which jumps to .catch()
        . if ok -> parse JSON
    3. .then(data => { ... })
        Here you're handling the API shape:
            . sometimes data.vans might be an array
            . sometimes it might be a single object
    
    So you do:

    const selectedVan = Array.isArray(data.vans) ? data.vans[0] : data.vans

Meaning: 
    . if it`s an array, take the first item.
    . else assume it`s already the van object

then:

    . If no van found -> throw an Error
    . else setVan(selectedVan) updates state and trigger a re-render
    4. .catch(err => setError(err.message))
        Any error (network, thrown error, JSON parse error) ends here and you store a guman-readable message
    5. .finally(() => setIsLoading(false))
        Runs no matter what: succes OR error, so loading spinner goes away.

4) Early returns for loading and error UI

    *** 
    if (isLoading) {
        return <h2 className="host-status-message"> Loading van details...</h2>
    }

    if (error) {
        return <h2 className="host-status-message">Error: {error}</h2>
    }

This is a common React pattern:
    . while loading -> return loading UI only
    . otherwise render the "real page"

    Because of these return, you never render van.imageUrl, etc. while van is still null, which avoids crashes like "cannot read property imageUrl of null".
