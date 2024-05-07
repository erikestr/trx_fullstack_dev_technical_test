import React, { useEffect, useState } from 'react'
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps'

import './MapAtom.css'

interface MapProps {
    latitude: number
    longitude: number
}

const MapAtom: React.FC<MapProps> = ({ latitude, longitude }) => {

    /** Api Key from G Cloud Javascript Maps, enable Directions Api is optional */
    const apiKey = import.meta.env.VITE_GMAPS_API as string

    /** Created at 'Administración de mapas' */
    const mapId = import.meta.env.VITE_GMAPS_MAPID as string

    /** Api Key from G Cloud Javascript Maps, enable Directions Api is optional */
    const serverUrl = import.meta.env.VITE_API_SERVER as string

    /** Config Maps Center position */
    const center = { lat: latitude, lng: longitude }

    // Hardcoded route name for testing
    const hard_routeName = 'r0'

    return (
        <div className='w-full h-full'>
            <APIProvider
                apiKey={apiKey}>
                <Map
                    className='w-full h-full rounded-xl border-1 border-base ring-1 ring-base'
                    mapId={mapId}
                    defaultCenter={center}
                    defaultZoom={15}
                    disableDefaultUI={true}>
                    {/* <AdvancedMarker position={position} /> */}
                    {/* <Directions /> */}
                    <GeojsonLayer routeName={hard_routeName} serverUrl={serverUrl} />
                </Map>
            </APIProvider>
        </div>
    )
}

/**
 * Component to display a GeoJSON layer on the map.
 * 
 * @returns GeojsonLayer component
 */
function GeojsonLayer({ routeName, serverUrl }: { routeName: string, serverUrl: string }) {
    const map
        = useMap()
    const maps
        = useMapsLibrary('maps')
    const [_geojson, setGeojson]
        = useState<google.maps.Data>()

    // Load GeoJSON data
    useEffect(() => {
        if (!maps || !map)
            return

        try {
            const data = new maps.Data()
            data.loadGeoJson(`${serverUrl}/api/v1/route/name?name=${routeName}`)
            data.setMap(map)
            setGeojson(data)
        } catch (error) {
            console.error('Error loading GeoJSON:', error)
        }
    }, [maps, map])

    return null
}

/**
 * @unstable
 * Component to display directions on the map.
 * 
 * @returns Directions component
 */
function Directions() {
    const map
        = useMap()
    const routesLibrary
        = useMapsLibrary('routes')
    const [directionsService, setDirectionsService]
        = useState<google.maps.DirectionsService>()
    const [directionsRenderer, setDirectionsRenderer]
        = useState<google.maps.DirectionsRenderer>()
    const [routes, setRoutes]
        = useState<google.maps.DirectionsRoute[]>([])
    const [routeIndex, setRouteIndex]
        = useState(0)
    const selected
        = routes[routeIndex]
    const leg
        = selected?.legs[0]

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map)
            return

        setDirectionsService(new routesLibrary.DirectionsService())
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
    }, [routesLibrary, map])

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer)
            return

        directionsService
            .route({
                origin: '100 Front St, Toronto ON',
                destination: '500 College St, Toronto ON',
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response)
                setRoutes(response.routes)
            })

        return () => directionsRenderer.setMap(null)
    }, [directionsService, directionsRenderer])

    // Update direction route
    useEffect(() => {
        if (!directionsRenderer)
            return

        directionsRenderer.setRouteIndex(routeIndex)
    }, [routeIndex, directionsRenderer])

    // Validate selected route
    if (!leg)
        return null

    // Display directions
    return (
        <div>
            <h2>{selected.summary}</h2>
            <p>
                {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
            </p>
            <p>Distance: {leg.distance?.text}</p>
            <p>Duration: {leg.duration?.text}</p>

            <h2>Other Routes</h2>
            <ul>
                {routes.map((route, index) => (
                    <li key={route.summary}>
                        <button onClick={() => setRouteIndex(index)}>
                            {route.summary}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MapAtom

