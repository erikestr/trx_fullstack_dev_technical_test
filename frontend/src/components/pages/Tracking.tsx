import React from 'react'
import NavBar from '../organism/NavBar'
import MapController from '../organism/MapCotroller'

const Tracking: React.FC = () => {
    return (
        <div className='w-full h-full grid grid-cols-12 auto-rows-auto'>
            <div className='col-span-2'>
                <NavBar />
            </div>
            <div className='col-span-10'>
                    <div className='grid grid-cols-4 grid-rows-none auto-rows-auto h-full'>
                        <div className='col-start-1 col-end-4 min-h-4 h-4'>
                            <p>search_bar</p>
                        </div>
                        <div className='col-start-4 col-end-5 min-h-4 h-4'>
                            <p>stuff</p>
                        </div>
                        <div className='col-start-1 col-end-4 h-full'>
                            <MapController />
                        </div>
                        <div className='col-start-4 col-end-5 h-full'>
                            <p>vehicle_list</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Tracking
