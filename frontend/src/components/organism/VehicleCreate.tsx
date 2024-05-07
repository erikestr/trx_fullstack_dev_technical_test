import React, { useState } from 'react'
import { Vehicle } from '../atoms/VehicleItem'
import { useWebSocket } from '../../context/WebsocketProvider'

const VehicleCreate: React.FC = () => {
    
    /** Server Url */
    const serverUrl = import.meta.env.VITE_API_SERVER as string

    /** WebSocket context to send message */
    const { sendMessage } = useWebSocket()

    /** Vehicle state declaration, use the Vehicle interface */
    const [vehicle, setVehicle] = useState<Vehicle>({
        seguro: '',
        'numero economico': '',
        YEAR: 0,
        asientos: 0,
        COLOR: '',
        vim: '',
        'segure numebr': '',
        MODEL: '',
        sys_row_created: 0,
        placa: '',
        BRAND: '',
    })

    /**
     * Handle change event to update vehicle state
     * 
     * @param e event handler to get input value
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value,
        })
    }

    /**
     * Handle submit event to create vehicle, fetch post to API
     * 
     * @param e event handler to prevent default form behavior
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${serverUrl}/api/v1/vehicle/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicle)
            })

            // TODO: Message to show error
            if (!response.ok) {
                throw new Error('Failed to add vehicle.')
            }

            // Reset vehicle state
            setVehicle({
                seguro: '',
                'numero economico': '',
                YEAR: 0,
                asientos: 0,
                COLOR: '',
                vim: '',
                'segure numebr': '',
                MODEL: '',
                sys_row_created: 0,
                placa: '',
                BRAND: '',
            })

            // call update list
            await handleUpdateList()
            
            // TODO: Message to show success
            console.log('Vehicle added successfully.', await response.json())
        } catch (error) {
            
            // TODO: Manage error
            console.error('Error adding vehicle:', error)
        }
    }

    /** Event to send update to Vehicle List */
    const handleUpdateList = async () => {
        sendMessage('update_vehicle_list')
    }

    return (
        <div className='container w-full p-4'>
            <h1 className='text-2xl font-bold mb-4'>Create Vehicle</h1>
            <form onSubmit={handleSubmit} className='w-full mx-auto'>

                <div className='mb-4'>
                    <label htmlFor='BRAND' className='block text-gray-700 font-bold mb-2'>
                        Marca
                    </label>
                    <input
                        type='text'
                        id='BRAND'
                        name='BRAND'
                        value={vehicle.BRAND}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='placa' className='block text-gray-700 font-bold mb-2'>
                        Placa
                    </label>
                    <input
                        type='text'
                        id='placa'
                        name='placa'
                        value={vehicle.placa}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='YEAR' className='block text-gray-700 font-bold mb-2'>
                        Año
                    </label>
                    <input
                        type='number'
                        id='YEAR'
                        name='YEAR'
                        value={vehicle.YEAR}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='vim' className='block text-gray-700 font-bold mb-2'>
                        Número Vim
                    </label>
                    <input
                        type='text'
                        id='vim'
                        name='vim'
                        value={vehicle.vim}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='MODEL' className='block text-gray-700 font-bold mb-2'>
                        Modelo
                    </label>
                    <input
                        type='text'
                        id='MODEL'
                        name='MODEL'
                        value={vehicle.MODEL}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='COLOR' className='block text-gray-700 font-bold mb-2'>
                        Color
                    </label>
                    <input
                        type='text'
                        id='COLOR'
                        name='COLOR'
                        value={vehicle.COLOR}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='asientos' className='block text-gray-700 font-bold mb-2'>
                        Asientos
                    </label>
                    <input
                        type='number'
                        id='asientos'
                        name='asientos'
                        value={vehicle.asientos}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='seguro' className='block text-gray-700 font-bold mb-2'>
                        Seguro
                    </label>
                    <input
                        type='vim'
                        id='seguro'
                        name='seguro'
                        value={vehicle.seguro}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='segure numebr' className='block text-gray-700 font-bold mb-2'>
                        Número de Seguro
                    </label>
                    <input
                        type='text'
                        id='segure numebr'
                        name='segure numebr'
                        value={vehicle['segure numebr']}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='numero economico' className='block text-gray-700 font-bold mb-2'>
                        Número Económico
                    </label>
                    <input
                        type='text'
                        id='numero economico'
                        name='numero economico'
                        value={vehicle['numero economico']}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-base bg-gray-shade-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default VehicleCreate