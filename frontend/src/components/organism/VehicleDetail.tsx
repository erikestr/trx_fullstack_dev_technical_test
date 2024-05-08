import React from 'react'
import truck from './../../assets/icons/truck.svg'
import seat from './../../assets/icons/seat.svg'
import { Vehicle } from '../atoms/VehicleItem'

const VehicleDetail: React.FC = () => {

    const vehicle: Vehicle = {
        BRAND: '',
        MODEL: '',

        YEAR: 0,
        placa: '',

        COLOR: '',
        asientos: 0,

        vim: '',

        'numero economico': '',

        seguro: '',
        'segure numebr': '',

        sys_row_created: 0,
    }

    return (
        <div className='container w-full h-full p-4'>
            <div className="w-full h-full rounded-xl p-4 bg-gray-shade-100
                grid grid-cols-[min-content,auto] grid-rows-[min-content,auto] gap-4">
                <div className='w-32 h-32 bg-base rounded-full p-3'>
                    <img src={truck} alt="Truck" className='w-auto' />
                </div>
                <div className='w-full h-full flex flex-row items-center justify-center'>
                    <div className='min-w-64 max-w-80'>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='font-bold'>Marca</h2>
                            <p>Hyundai</p>
                        </div>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='font-bold'>Modelo</h2>
                            <p>Trx</p>
                        </div>
                    </div>

                    <span className='w-2 h-full rounded-full bg-gray-shade-200'></span>

                    <div className='min-w-64 max-w-80'>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='font-bold'>Ano</h2>
                            <p>2024</p>
                        </div>
                        <div className='w-full m-2 flex flex-col items-center'>
                            <h2 className='font-bold'>Placa</h2>
                            <p>ABC-01-D</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 row-start-2">
                    <div className='w-full flex flex-col'>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='font-bold'>Color</h2>
                                {/* circle with gradient of red */}
                                <div className='flex flex-row gap-4 items-center'>
                                    <div className='w-8 h-8 p-[0.25rem] rounded-full bg-gray-shade-200 flex flex-col justify-center items-center pb-[4px]'>
                                        <div className='w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-600'></div>
                                    </div>
                                    <p>Rojo</p>
                                </div>
                            </div>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='font-bold'>Asientos</h2>
                                <div className='flex flex-row gap-4 items-center'>
                                    <div className='w-8 h-8 p-2 rounded-full bg-gray-shade-200'>
                                        <img src={seat} alt="Seat" />
                                    </div>
                                    <p>4</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='font-bold'>Vim</h2>
                                <p>ASDFGHJKL-QWERTYUI-ZXCVBN</p>
                            </div>
                        </div>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='font-bold'>Numero economico</h2>
                                <p>ASDFGHJKL-QWERTYUI-ZXCVBN</p>
                            </div>
                        </div>

                        <div className='w-full flex flex-row'>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='font-bold'>Seguro</h2>
                                <p>Metlife</p>
                            </div>
                            <div className='w-full m-2 flex flex-col items-center'>
                                <h2 className='font-bold'>Numero de Seguro</h2>
                                <p>1234567</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-span-2 row-start-3">
                    <h2>Asignar</h2>

                    <div>
                        <select name="driver" id="driver" className='w-full p-2 my-2 rounded-lg'>
                            <option value="1">Driver 1</option>
                            <option value="2">Driver 2</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleDetail