import React, { useState, useEffect } from 'react'
import VehicleItem, { Vehicle } from '../atoms/VehicleItem'
import { useSearch } from '../../context/SearchProvider'

const VehicleList: React.FC = () => {

    /** Search hook declaration */
    const { searchTerm } = useSearch()

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

    /** @unused State to store first doc of page */
    const [currentFirstDoc, setCurrentFirstDoc] = useState<string>()

    /** @unused State to store last doc of page */
    const [currentLastDoc, setCurrentLastDoc] = useState<string>()

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

    /** @unused 
     * 
     * Efect to fetch vehicles using last document as pagination parameter
    */
    // useEffect(() => {
    //     if (currentPage === 1)
    //         fetchVehiclesByLastDoc(5)
    //     else
    //         fetchVehiclesByLastDoc(5, currentLastDoc)
    // }, [currentPage])

    /**
     * @unused
     * 
     * Paginated fetch of vehicles using page size and last document
     * 
     * @param pageSize number of vehicles to show per page
     * @param lastDocument last document of the previous page
     */
    const fetchVehiclesByLastDoc = async (pageSize: number, lastDocument?: string) => {
        try {
            const url = `http://localhost:3000/api/v1/vehicle/list?pageSize=${pageSize}${lastDocument ? `&start=${lastDocument}` : ''}`
            const response = await fetch(url)
            const data = await response.json()
            const lVehicles: Vehicle[] = data.data
            setVehicles(lVehicles)
            setFilter(lVehicles)
            setTotalPages(data.totalPages)
            setCurrentLastDoc(lVehicles[lVehicles.length - 1].vim)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    /**
     * Fetch vehicles paginated using page number and page size
     * 
     * @param pageNumber number of fetched page
     * @param pageSize number of vehicles to show per page
     */
    const fetchVehiclesPaginated = async (pageNumber: number, pageSize: number) => {
        try {
            const url = `http://localhost:3000/api/v1/vehicle/paginated?page=${pageNumber}&pageSize=${pageSize}`
            const response = await fetch(url)
            const data = await response.json()
            const lVehicles: Vehicle[] = data.data
            setVehicles(lVehicles)
            setFilter(lVehicles)
            setTotalPages(data.totalPages)
            setCurrentLastDoc(lVehicles[lVehicles.length - 1].vim)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    /** Event to handle changes on page selector */
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='flex-none'>
                {filter.map((vehicle: Vehicle) => (
                    <VehicleItem key={vehicle.vim} vehicle={vehicle} isLoading={isLoading} />
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
