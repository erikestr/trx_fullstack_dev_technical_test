import React, { useEffect, useState } from 'react'
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps'

import './MapAtom.css'
import { Vehicle } from './VehicleItem'

interface MapProps {
    latitude: number
    longitude: number
    vehicle?: Vehicle
}

const MapAtom: React.FC<MapProps> = ({ latitude, longitude, vehicle }) => {

    /** Api Key from G Cloud Javascript Maps, enable Directions Api is optional */
    const apiKey = import.meta.env.VITE_GMAPS_API as string

    /** Created at 'Administración de mapas' */
    const mapId = import.meta.env.VITE_GMAPS_MAPID as string

    /** Api Key from G Cloud Javascript Maps, enable Directions Api is optional */
    const serverUrl = import.meta.env.VITE_API_SERVER as string

    /** Config Maps Center position */
    const center = { lat: latitude, lng: longitude }

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
                    {vehicle?.route &&
                        <GeojsonLayer routeName={vehicle?.route} serverUrl={serverUrl} />
                    }
                </Map>
            </APIProvider>
        </div>
    )

    /**
     * Component to display a GeoJSON layer on the map.
     * 
     * @returns GeojsonLayer component
     */
    function GeojsonLayer({ serverUrl, routeName }: { routeName?: string, serverUrl: string }) {
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
                map.data.forEach((feature) => map.data.remove(feature))
                const data1 = new google.maps.Data();
                data1.loadGeoJson(`${serverUrl}/api/v1/route/name?name=${routeName}`);
                data1.setMap(map)
                setGeojson(data1)
            } catch (error) {
                console.error('Error loading GeoJSON:', error)
            }
        }, [maps, map])

        return null
    }
}

export default MapAtom

