import React, { useState } from 'react'
import { Vehicle } from '../atoms/VehicleItem'
import { useWebSocket } from '../../context/WebsocketProvider'
import InputCommon from '../atoms/InputCommon'
import ButtonCommon from '../atoms/ButtonCommon'

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
        const { name, value, type } = e.target
        const parsedValue = type === 'number' ? Number(value) : value

        setVehicle({
            ...vehicle,
            [name]: parsedValue,
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
        <div className='container max-w-2xl p-2 flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>Create Vehicle</h1>
            <form onSubmit={handleSubmit} className='w-full mx-auto flex flex-col gap-4'>

                <div className='w-full flex flex-row gap-6'>
                    <InputCommon
                        id='BRAND'
                        label='Marca'
                        name='BRAND'
                        value={vehicle.BRAND}
                        onChange={handleChange}
                        required
                        className='w-full'
                    />
                    <InputCommon
                        id='YEAR'
                        label='Año'
                        name='YEAR'
                        value={vehicle.YEAR}
                        onChange={handleChange}
                        type='number'
                        min={0}
                        required
                        className='w-full'
                        inputMode='numeric'
                    />
                    <InputCommon
                        id='MODEL'
                        label='Modelo'
                        name='MODEL'
                        value={vehicle.MODEL}
                        onChange={handleChange}
                        required
                        className='w-full'
                    />
                </div>

                <InputCommon
                    id='placa'
                    label='Placa'
                    name='placa'
                    value={vehicle.placa}
                    onChange={handleChange}
                    required
                    className='w-full'
                />

                <InputCommon
                    id='COLOR'
                    label='Color'
                    name='COLOR'
                    value={vehicle.COLOR}
                    onChange={handleChange}
                    required
                    className='w-full'
                />

                <InputCommon
                    id='vim'
                    label='Número Vim'
                    name='vim'
                    value={vehicle.vim}
                    onChange={handleChange}
                    required
                    className='w-full'
                />

                <div className='w-full flex flex-row gap-6'>
                    <InputCommon
                        id='seguro'
                        label='Seguro'
                        name='seguro'
                        value={vehicle.seguro}
                        onChange={handleChange}
                        required
                        className='w-full'
                    />

                    <InputCommon
                        id='segure numebr'
                        label='Número de Seguro'
                        name='segure numebr'
                        value={vehicle['segure numebr']}
                        onChange={handleChange}
                        required
                        className='w-full'
                    />
                </div>

                <InputCommon
                    id='numero economico'
                    label='Número Económico'
                    name='numero economico'
                    value={vehicle['numero economico']}
                    onChange={handleChange}
                    required
                    className='w-full'
                />

                <InputCommon
                    id='asientos'
                    label='Asientos'
                    name='asientos'
                    value={vehicle.asientos}
                    onChange={handleChange}
                    type='number'
                    min={0}
                    required
                    className='w-full'
                    inputMode='numeric'
                />

                <ButtonCommon label="Create" type="submit" />
            </form>
        </div>
    )
}

export default VehicleCreate