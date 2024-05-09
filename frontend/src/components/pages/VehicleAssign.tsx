import React from 'react'
import NavBar from '../organism/NavBar'
import VehicleListController from '../organism/VehicleListController'
import { SearchProvider } from '../../context/SearchProvider'
import SearchBar from '../molecules/SearchBar'
import WebSocketProvider from '../../context/WebsocketProvider'
import VehicleDetail from '../organism/VehicleDetail'
import { VehicleDetailContextTypeProvider } from '../../context/VehicleDetailProvider'

const VehicleAssign: React.FC = () => {

    /** Server Url */
    const wsUrl = import.meta.env.VITE_WS_SERVER as string

    return (
        <div className='w-full h-full grid grid-cols-12 auto-rows-auto'>
            <div className='col-span-2'>
                <NavBar />
            </div>
            <div className='col-span-10 w-full h-full flex flex-row'>
                <SearchProvider>
                    <VehicleDetailContextTypeProvider>
                        <WebSocketProvider url={wsUrl}>
                            <div className='w-full  flex flex-col p-2 gap-2'>

                                <div className='h-16 w-full '>
                                    <SearchBar />
                                </div>

                                <div className='h-full w-full '>
                                    <VehicleDetail/>
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

                    </VehicleDetailContextTypeProvider>
                </SearchProvider>
            </div>
        </div>
    )
}

export default VehicleAssign
