import React, { useEffect, useState } from 'react'
import truck from './../../assets/icons/truck.svg'
import red from './../../assets/icons/colors/red.svg'
import seat from './../../assets/icons/seat.svg'
import RoundedIcon from '../atoms/RoundedIcon'
import Select from '../atoms/Select'
import { useVehicle } from '../../context/VehicleDetailProvider'


const VehicleDetail: React.FC = () => {

    /** Server Url */
    const serverUrl = import.meta.env.VITE_API_SERVER as string

    /** Vehicle hook declaration */
    const { vehicle } = useVehicle()

    /** State to store selected route */
    const [_selectedRoute, setSelectedRoute] = useState('')

    /** List of routes from api */
    const [routes, setRoutes] = useState<string[]>([])

    /** State to store loading status */
    const [isLoadingRoutes, setIsLoadingRoutes] = useState(true)

    /** Fetch routes available, only once time */
    useEffect(() => {
        if (routes && routes.length > 0)
            return
        setIsLoadingRoutes(true)
        fetchRoutesAvailable()
    })

    /**
     * Fetch routes available from api
     */
    const fetchRoutesAvailable = async () => {

        console.log('Fetching routes available');
        try {
            const url = `${serverUrl}/api/v1/route/available`
            const response = await fetch(url)
            const data = await response.json()
            setRoutes(data)
            setIsLoadingRoutes(false)

        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    return (
        <div className='container w-full h-full p-4'>
            <div className="w-full h-full rounded-xl p-4 bg-gray-shade-100
                grid grid-cols-[min-content,auto] grid-rows-[min-content,auto] gap-4">

                <div className='w-32 h-32  bg-base rounded-full p-3'>
                    <img src={truck} alt="Truck" className='w-auto' />
                </div>

                <div className='w-full h-full flex flex-row items-center justify-center'>
                    <div className='min-w-64 max-w-80'>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='text-base font-extralight'>Marca</h2>
                            <p className='font-medium'>
                                {vehicle.BRAND}
                            </p>
                        </div>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='text-base font-extralight'>Modelo</h2>
                            <p className='font-medium'>
                                {vehicle.BRAND}
                            </p>
                        </div>
                    </div>

                    <span className='w-2 h-full rounded-full bg-gray-shade-200'></span>

                    <div className='min-w-64 max-w-80'>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='text-base font-extralight'>Ano</h2>
                            <p className='font-medium'>
                                {vehicle.BRAND}
                            </p>
                        </div>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='text-base font-extralight'>Placa</h2>
                            <p className='font-medium'>
                                {vehicle.BRAND}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 row-start-2 h-fit">
                    <div className='w-full flex flex-col'>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Color</h2>
                                {/* circle with gradient of red */}
                                <div className='flex flex-row gap-4 items-center'>
                                    <RoundedIcon src={red} alt='Seat' className='w-8 bg-gray-shade-200 p-1' />
                                    <p className='font-medium'>
                                        {vehicle.BRAND}
                                    </p>
                                </div>
                            </div>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Asientos</h2>
                                <div className='flex flex-row gap-4 items-center'>
                                    <RoundedIcon src={seat} alt='Seat' className='w-8 bg-gray-shade-200 p-2' />
                                    <p className='font-medium'>
                                        {vehicle.BRAND}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Vim</h2>
                                {/* <div className='w-auto h-auto p-1 bg-metalic bg-cover rounded-lg contrast-150
                                flex items-center justify-center'>
                                    <p className='px-2 py-0 font-solway text-xl font-extralight text-white bg-gray-shade-100 rounded-lg contrast-75'>ASDFGHJKL-QWERTYUI-ZXCVBN</p>
                                </div> */}
                                <p className='px-2 py-0 font-solway text-xl font-extralight text-white bg-gray-shade-100 rounded-lg contrast-75'>
                                    {vehicle.BRAND}
                                </p>
                            </div>
                        </div>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight '>Numero economico</h2>
                                <p className='px-2 py-0 font-solway text-xl font-extralight text-white bg-gray-shade-100 rounded-lg contrast-75'>
                                    {vehicle.BRAND}
                                </p>
                            </div>
                        </div>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Seguro</h2>
                                <p className='font-medium'>
                                    {vehicle.BRAND}
                                </p>
                            </div>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Numero de Seguro</h2>
                                <p className='font-medium'>
                                    {vehicle.BRAND}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='col-span-2 row-start-3 w-full h-auto flex items-center'>
                    <span className='w-full h-2 rounded-full bg-gray-shade-200'></span>
                </div>

                <div className="col-span-2 row-start-4 h-full">
                    <h2 className='mb-4 text-base'>Assign Route</h2>
                    <Select caption='Select Route' options={routes} setSelected={setSelectedRoute} selected={vehicle.route} isLoading={isLoadingRoutes} />
                </div>
            </div>
        </div>
    )
}

export default VehicleDetail