import React from 'react'
import MapAtom from '../atoms/MapAtom'

const MapViewer: React.FC = () => {

    return (
        <div className='w-full h-full flex flex-col'>
            <MapAtom latitude={19.40} longitude={-99.14} />
        </div>
    )
}

export default MapViewer