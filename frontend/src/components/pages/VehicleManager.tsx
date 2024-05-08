import React from 'react'
import NavBar from '../organism/NavBar'
import VehicleCreate from '../organism/VehicleCreate'
import VehicleListController from '../organism/VehicleListController'
import { SearchProvider } from '../../context/SearchProvider'
import SearchBar from '../molecules/SearchBar'
import WebSocketProvider from '../../context/WebsocketProvider'

const VehicleManager: React.FC = () => {

    /** Server Url */
    const wsUrl = import.meta.env.VITE_WS_SERVER as string

    return (
        <div className='w-full h-full grid grid-cols-12 auto-rows-auto'>
            <div className='col-span-2'>
                <NavBar />
            </div>
            <div className='col-span-10 w-full h-full flex flex-row'>
                <SearchProvider>
                    <WebSocketProvider url={wsUrl}>
                        <div className='w-full  flex flex-col p-2 gap-2'>

                            <div className='h-16 w-full '>
                                <SearchBar />
                            </div>

                            <div className='h-full w-full '>
                                <VehicleCreate />
                            </div>

                        </div>
                        <div className='w-1/2 gap-2'>

                            <div className='h-16 w-full hidden'>
                                <p>stuff</p>
                            </div>

                            <div className='h-full w-full '>
                                <VehicleListController title='Vehicles' />
                            </div>

                        </div>
                    </WebSocketProvider>
                </SearchProvider>
                {/* </SearchProvider>
                <SearchProvider>
                    <div className='grid grid-cols-4 grid-rows-none auto-rows-auto h-full'>
                        <div className='col-start-1 col-end-4 min-h-4 h-4'>
                            <SearchBar />
                        </div>
                        <div className='col-start-4 col-end-5 min-h-4 h-4'>
                            <p>stuff</p>
                        </div>
                        <WebSocketProvider url={wsUrl}>
                            <div className='col-start-1 col-end-4 h-full'>
                                <VehicleCreate />
                            </div>
                            <div className='col-start-4 col-end-5 h-full'>
                                <VehicleListController title='Vehicles' />
                            </div>
                        </WebSocketProvider>
                    </div>
                </SearchProvider> */}
            </div>
        </div>
    )
}

export default VehicleManager
