import React from 'react'
import VehicleList from '../molecules/VehicleList'

interface VehicleListControllerProps {
    title: string
}

const VehicleListController: React.FC<VehicleListControllerProps> = ({ title }) => {

    return (
        <div className='p-4'>
            <h1>{title}</h1>
            <VehicleList />
        </div>
    )
}

export default VehicleListController
