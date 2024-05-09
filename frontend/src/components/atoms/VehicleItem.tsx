import React from 'react'
import car from './../../assets/icons/car.svg'
import hatchback from './../../assets/icons/hatchback.svg'
import suv from './../../assets/icons/suv.svg'
import box_truck from './../../assets/icons/box-truck.svg'
import truck from './../../assets/icons/truck.svg'
import delivery_bike from './../../assets/icons/delivery-bike.svg'
import placeholder from './../../assets/icons/placeholder.svg'

export interface Vehicle {
    seguro: string
    'numero economico': string
    YEAR: number
    asientos: number
    COLOR: string
    vim: string
    'segure numebr': string
    MODEL: string
    sys_row_created: number
    placa: string
    BRAND: string
    route?: string
}


interface VehicleProps {
    vehicle: Vehicle
    isLoading: boolean
    onVehicleClicked: (vehicle: Vehicle) => void
}

const VehicleItem: React.FC<VehicleProps> = ({ vehicle, isLoading, onVehicleClicked }) => {
    const getIconByCapacity = (capacity: number) => {
        switch (true) {
            case capacity < 16:
                return car

            case capacity < 20:
                return hatchback

            case capacity < 35:
                return suv

            case capacity < 40:
                return box_truck

            case capacity > 40:
                return truck

            default:
                return delivery_bike
        }
    }
    // isLoading = true

    const handleVehicle = () => {
        onVehicleClicked(vehicle)
    }

    return (
        <div className='w-full flex flex-row gap-2 p-2 items-center bg-gray-shade-100 rounded-xl my-2 hover:bg-base
         hover:text-gray-shade-400 transition-transform duration-75 hover:scale-105 group'
            onClick={handleVehicle}>

            {isLoading && <div className='row w-12 h-10 rounded-full bg-gray-400 animate-pulse'></div>}
            {!isLoading &&
                <div className='row w-12 h-auto rounded-full bg-shade-400 p-1'>
                    <img src={getIconByCapacity(vehicle.asientos)} alt='Item Icon' className='' />
                </div>
            }


            <div className='row w-full flex flex-row text-xs gap-2'>

                <div className='row w-full leading-5'>
                    {isLoading && <p className='w-16 h-4 bg-gray-400 animate-pulse mb-2'></p>}
                    {!isLoading &&
                        <p>{vehicle.BRAND}</p>
                    }

                    {isLoading && <p className='w-24 h-4 bg-gray-400 animate-pulse mb-2'></p>}
                    {!isLoading &&
                        <p>{vehicle.placa}</p>
                    }

                    {isLoading && <p className='w-auto h-4 bg-gray-400 animate-pulse mb-2'></p>}
                    {!isLoading &&
                        <p> {vehicle.vim}</p>
                    }

                </div>

                <div className='col flex flex-col items-center'>
                    {isLoading && <p className='w-4 h-4 bg-gray-400 animate-pulse mt-1'></p>}
                    {!isLoading &&
                        <p className='mt-1'>{vehicle.asientos}</p>
                    }

                    {!isLoading &&
                        <button className='w-8 h-8 p-2 my-2 rounded-full group-hover:bg-gray-shade-100 transition-transform hover:scale-110 '>
                            <img src={placeholder} alt='Track' />
                        </button>
                    }
                </div>

            </div>

        </div>
    )
}

export default VehicleItem
