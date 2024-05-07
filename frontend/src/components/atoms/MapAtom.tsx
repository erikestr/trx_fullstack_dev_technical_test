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


export default MapAtom

