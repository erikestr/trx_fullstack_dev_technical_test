import React from 'react'
import NavBar from '../organism/NavBar'
import MapController from '../organism/MapCotroller'
import VehicleListController from '../organism/VehicleListController'
import SearchBar from '../molecules/SearchBar'
import { SearchProvider } from '../../context/SearchProvider'
import WebSocketProvider from '../../context/WebsocketProvider'

const Tracking: React.FC = () => {

    /** Server Url */
    const wsUrl = import.meta.env.VITE_WS_SERVER as string

    return (
        <div className='w-full h-full grid grid-cols-12 auto-rows-auto'>
            <div className='col-span-2'>
                <NavBar />
            </div>
            <div className='col-span-10 w-full h-full flex flex-row'>
                <SearchProvider>
                    <div className='w-full  flex flex-col p-2 gap-2'>

                        <div className='h-16 w-full '>
                            <SearchBar />
                        </div>

                        <div className='h-full w-full '>
                            <MapController />
                        </div>

                    </div>
                    <div className='w-1/2 gap-2'>

                        <div className='h-16 w-full hidden'>
                            <p>stuff</p>
                        </div>

                        <div className='h-full w-full '>
                            <WebSocketProvider url={wsUrl}>
                                <VehicleListController title='Vehicles' />
                            </WebSocketProvider>
                        </div>

                    </div>
                </SearchProvider>
            </div>
        </div>
    )
}

export default Tracking
