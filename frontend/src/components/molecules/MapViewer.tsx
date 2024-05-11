import React, { useEffect, useState } from 'react'
import MapAtom from '../atoms/MapAtom'
import { useVehicle } from '../../context/VehicleDetailProvider'
import { Vehicle } from '../atoms/VehicleItem'

const MapViewer: React.FC = () => {

    /** Vehicle hook declaration */
    const { vehicle } = useVehicle()
    const [actualVehicle, setActualVehicle] = useState<Vehicle>()
    const [showComp, setShowComp] = useState<boolean>()

    /**
     * Compare if the vehicle has changed
     */
    useEffect(() => {
        actualVehicle !== vehicle && setActualVehicle(vehicle)
    }, [vehicle])


    /** If exist chage on selected vehicle, clean component an load again */
    useEffect(() => {
        setShowComp(false)
        setTimeout(() => setShowComp(true), 100)
    }, [actualVehicle])

    return (
        <div className='w-full h-full flex flex-col'>

            {showComp && vehicle?.route &&
                <MapAtom latitude={19.40} longitude={-99.14} vehicle={vehicle} />
            }
            {showComp && !vehicle?.route &&
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <p className='text-2xl font-bold text-base'>This vehicle don't have route</p>
                    <p className='text-lg font-light text-base'>Please select another vehicle from the list</p>
                </div>
            }
        </div>
    )
}

export default MapViewer