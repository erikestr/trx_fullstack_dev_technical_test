import React, { useState, useEffect } from 'react'
import VehicleItem, { Vehicle } from '../atoms/VehicleItem'
import { useSearch } from '../../context/SearchProvider'
import { useWebSocket } from '../../context/WebsocketProvider'
import { blobToString } from '../../utils/Converters'
import { useVehicle } from '../../context/VehicleDetailProvider'

const VehicleList: React.FC = () => {
    
    /** Server Url */
    const serverUrl = import.meta.env.VITE_API_SERVER as string

    /** Search hook declaration */
    const { searchTerm } = useSearch()

    /** Vehicle hook declaration */
    const { setVehicle } = useVehicle()

    /** WebSocket hook declaration */
    const { subscribe } = useWebSocket()

    /** States to store vehicles */
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    /** States to store filter vehicles */
    const [filter, setFilter] = useState<Vehicle[]>([])

    /** States to store pagination parameters */
    const [currentPage, setCurrentPage] = useState(1)

    /** State to store total pages */
    const [totalPages, setTotalPages] = useState(0)

    /** State to store loading status */
    const [isLoading, setIsLoading] = useState(true)

    /**
     * Effect to subscribe to add_vehicle channel
     */
    useEffect(() => {
        subscribe('add_vehicle', (message) => {
            blobToString(message).then(async (text: string) => {
                const newMessage = text
                if (newMessage == 'update_vehicle_list') {
                    setIsLoading(true)
                    await fetchVehiclesPaginated(currentPage, 7)
                }
                console.log('Received message:', newMessage)
            }).catch((error: any) => {
                console.error('Error converting Blob to text:', error)
            })
        })
    }, [subscribe])

    /**
     * Effect to filter vehicles using search term
     * 
     * Many fields are used to filter vehicles
     */
    useEffect(() => {
        if (searchTerm) {
            setFilter(
                [...vehicles].filter(vehicle =>
                    vehicle.BRAND.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vehicle.MODEL.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vehicle['numero economico'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vehicle.vim.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        }
        else
            setFilter(vehicles)
    }, [searchTerm])

    /**
     * Efect to fetch vehicles using current page as pagination parameter
     */
    useEffect(() => {
        setIsLoading(true)
        fetchVehiclesPaginated(currentPage, 7)
    }, [currentPage])

    /**
     * Fetch vehicles paginated using page number and page size
     * 
     * @param pageNumber number of fetched page
     * @param pageSize number of vehicles to show per page
     */
    const fetchVehiclesPaginated = async (pageNumber: number, pageSize: number) => {
        try {
            const url = `${serverUrl}/api/v1/vehicle/paginated?page=${pageNumber}&pageSize=${pageSize}`
            const response = await fetch(url)
            const data = await response.json()
            const lVehicles: Vehicle[] = data.data
            setVehicles(lVehicles)
            setFilter(lVehicles)
            setTotalPages(data.totalPages)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    /** Event to handle changes on page selector */
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleVehicle = (vehicle: Vehicle) => {
        setVehicle(vehicle)
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='flex-none'>
                {filter.map((vehicle: Vehicle) => (
                    <VehicleItem key={vehicle.vim} vehicle={vehicle} isLoading={isLoading} onVehicleClicked={handleVehicle} />
                ))}
            </div>
            <div className='flex-grow flex flex-row gap-2 justify-center mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (

                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                        className={`bg-gray-shade-100 text-white rounded-full mx-1 px-2 hover:ring-2 hover:ring-base-gray
                        ${currentPage == index + 1 ? 'bg-base text-gray-shade-400' : ''}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default VehicleList
