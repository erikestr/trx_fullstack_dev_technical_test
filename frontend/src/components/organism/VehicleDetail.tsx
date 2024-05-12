import React, { useEffect, useState } from 'react'
import truck from './../../assets/icons/truck.svg'
import red from './../../assets/icons/colors/red.svg'
import seat from './../../assets/icons/seat.svg'
import RoundedIcon from '../atoms/RoundedIcon'
import Select from '../atoms/Select'
import { useVehicle } from '../../context/VehicleDetailProvider'
import { useWebSocket } from '../../context/WebsocketProvider'
import Button from '../atoms/Button'


const VehicleDetail: React.FC = () => {

    /** Server Url */
    const serverUrl = import.meta.env.VITE_API_SERVER as string

    /** Vehicle hook declaration */
    const { vehicle } = useVehicle()

    /** WebSocket context to send message */
    const { sendMessage } = useWebSocket()

    /** State to store selected route */
    const [selectedRoute, setSelectedRoute] = useState('')

    /** List of routes from api */
    const [routes, setRoutes] = useState<string[]>([])

    /** State to store loading status */
    const [isLoadingRoutes, setIsLoadingRoutes] = useState(true)

    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    useEffect(() => {
        setSelectedRoute(vehicle.route ?? '')
    }, [vehicle])

    /** Fetch routes available, only once time */
    useEffect(() => {
        if (routes && routes.length > 0)
            return
        setIsLoadingRoutes(true)
        fetchRoutesAvailable()
    })

    /**
     * Effect to update route in vehicle
     */
    useEffect(() => {
        if (selectedRoute == '' || vehicle.route)
            return

        vehicle.route = selectedRoute
        fetchAssignRoute()
    }, [selectedRoute])

    /**
     * Fetch to update route in vehicle
     */
    const fetchAssignRoute = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/v1/vehicle/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicle)
            })

            // TODO: Message to show error
            if (!response.ok) {
                throw new Error('Failed to update vehicle.')
            }

            // call update list
            await handleUpdateList()

            vehicle.route = selectedRoute


            // TODO: Message to show success
            console.log('Vehicle was update successfully.', await response.json())
        } catch (error) {

            // TODO: Manage error
            console.error('Error updating vehicle:', error)
        }
    }

    /** Event to send update to Vehicle List */
    const handleUpdateList = async () => {
        sendMessage('update_vehicle_list')
    }

    /**
     * Fetch routes available from api
     */
    const fetchRoutesAvailable = async () => {
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

    /**
     * Handle update vehicle
     */
    const handleUpdate = async () => {
        console.log('Update vehicle');

    }

    /**
     * Handle delete vehicle
     */
    const handleDelete = async () => {
        console.log('Delete vehicle');
        setIsLoadingDelete(true)
        fetchDeleteVehicle()
    }

    /**
     * Fetch to update route in vehicle
     */
    const fetchDeleteVehicle = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/v1/vehicle/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicle)
            })

            // TODO: Message to show error
            if (!response.ok) {
                throw new Error('Failed to delete vehicle.')
            }

            // call update list
            await handleUpdateList()

            vehicle.route = selectedRoute


            // TODO: Message to show success
            console.log('Vehicle deleted successfully.', await response.json())
        } catch (error) {

            // TODO: Manage error
            console.error('Error delete vehicle:', error)
        }
        setIsLoadingDelete(false)
    }

    return (
        <div className='container w-full h-auto p-4'>

            <p className='text-2xl py-2'>Detail</p>

            {vehicle && !vehicle.vim &&
                <div className='w-full h-full flex flex-col items-center justify-center p-4'>
                    <p className='text-2xl font-bold text-base'>No selected vehicle</p>
                    <p className='text-lg font-light text-base'>Please select a vehicle from the list</p>
                </div>
            }
            {vehicle && vehicle.vim &&
                <div className="w-full h-min rounded-xl p-4 bg-gray-shade-100
                grid grid-cols-[min-content,auto] grid-rows-[min-content,auto] gap-2">

                    <div className='w-32 h-32 bg-base rounded-full p-3'>
                        <img src={truck} alt="Truck" className='w-full' />
                    </div>

                    <div className='w-full h-max flex flex-row items-center justify-center'>
                        <div className='min-w-64 max-w-72'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Brand</h2>
                                <p className='font-medium'>
                                    {vehicle.BRAND}
                                </p>
                            </div>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Model</h2>
                                <p className='font-medium'>
                                    {vehicle.MODEL}
                                </p>
                            </div>
                        </div>

                        <div className='w-2 h-5/6 rounded-full bg-gray-shade-200'></div>

                        <div className='min-w-64 max-w-72'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Year</h2>
                                <p className='font-medium'>
                                    {vehicle.YEAR}
                                </p>
                            </div>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='text-base font-extralight'>Plate</h2>
                                <p className='font-medium'>
                                    {vehicle.placa}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 row-start-2 h-min">
                        <div className='w-full flex flex-col'>

                            <div className='w-full h-min flex flex-row'>
                                <div className='w-full m-2 flex flex-col items-center'>
                                    <h2 className='text-base font-extralight'>Color</h2>
                                    {/* circle with gradient of red */}
                                    <div className='flex flex-row gap-4 items-center'>
                                        <RoundedIcon src={red} alt='Seat' className='w-8 bg-gray-shade-200 p-1' />
                                        <p className='font-medium'>
                                            {vehicle.COLOR}
                                        </p>
                                    </div>
                                </div>
                                <div className='w-full h-min m-2 flex flex-col items-center'>
                                    <h2 className='text-base font-extralight'>Capacity</h2>
                                    <div className='flex flex-row gap-4 items-center'>
                                        <RoundedIcon src={seat} alt='Seat' className='w-8 bg-gray-shade-200 p-2' />
                                        <p className='font-medium'>
                                            {vehicle.asientos}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full h-min flex flex-row'>
                                <div className='w-full m-2 flex flex-col items-center'>
                                    <h2 className='text-base font-extralight'>Vim</h2>
                                    {/* <div className='w-auto h-auto p-1 bg-metalic bg-cover rounded-lg contrast-150
                                flex items-center justify-center'>
                                    <p className='px-2 py-0 font-solway text-xl font-extralight text-white bg-gray-shade-100 rounded-lg contrast-75'>ASDFGHJKL-QWERTYUI-ZXCVBN</p>
                                </div> */}
                                    <p className='px-2 py-0 font-solway text-xl font-extralight text-white bg-gray-shade-100 rounded-lg contrast-75'>
                                        {vehicle.vim}
                                    </p>
                                </div>
                            </div>

                            <div className='w-full h-min flex flex-row'>
                                <div className='w-full m-2 flex flex-col items-center'>
                                    <h2 className='text-base font-extralight '>Economic Number</h2>
                                    <p className='px-2 py-0 font-solway text-xl font-extralight text-white bg-gray-shade-100 rounded-lg contrast-75'>
                                        {vehicle['numero economico']}
                                    </p>
                                </div>
                            </div>

                            <div className='w-full h-min flex flex-row'>
                                <div className='w-full m-2 flex flex-col items-center'>
                                    <h2 className='text-base font-extralight'>Insurance</h2>
                                    <p className='font-medium'>
                                        {vehicle.seguro}
                                    </p>
                                </div>
                                <div className='w-full m-2 flex flex-col items-center'>
                                    <h2 className='text-base font-extralight'>Insurance Number</h2>
                                    <p className='font-medium'>
                                        {vehicle['segure numebr']}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='col-span-2 row-start-3 w-full h-min flex items-center'>
                        <span className='w-full h-2 rounded-full bg-gray-shade-200'></span>
                    </div>

                    <div className="col-span-2 row-start-4 h-min">
                        <h2 className='my-2 text-base'>Assign Route</h2>
                        <Select caption='Select Route' options={routes} setSelected={setSelectedRoute} selected={selectedRoute} isLoading={isLoadingRoutes} />
                    </div>

                    <div className="col-span-2 row-start-5 h-min">
                        <h2 className='my-2 text-base'>Actions</h2>
                        <div className='w-full flex flex-row justify-center gap-2'>
                            <Button caption='Update' colors='bg-blue-500 
                            transition-all hover:ring-4 hover:ring-blue-600 active:bg-blue-700'
                                isLoading={isLoadingUpdate}
                                onClick={handleUpdate} />
                            <Button caption='Delete' colors='bg-rose-500 
                            transition-all hover:ring-4 hover:ring-rose-600 active:bg-rose-700'
                                isLoading={isLoadingDelete}
                                onClick={handleDelete} />
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default VehicleDetail