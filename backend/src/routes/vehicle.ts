import express from 'express'
import * as vehicleService from '../services/vehicle/vehicle-service'
const router = express.Router()

router.get('/list', async (req, res) => {
    const startAfterDoc = req.query.start as string
    const pageSize = parseInt(req.query.pageSize as string)
    
    console.log(startAfterDoc)
    
    const paginatedVehicles = await vehicleService.getPaginatedVehicles(pageSize, startAfterDoc)

    const totalPages = Math.ceil(await vehicleService.getTotalVehicles() / pageSize)

    res.json({ data: paginatedVehicles, totalPages })
})

router.get('/paginated', async (req, res) => {
    const pageNumber = parseInt(req.query.page as string)
    const pageSize = parseInt(req.query.pageSize as string)
    
    const paginatedVehicles = await vehicleService.getPaginatedVehiclesByPageNumber(pageSize, pageNumber)

    const totalPages = Math.ceil(await vehicleService.getTotalVehicles() / pageSize)

    res.json({ data: paginatedVehicles, totalPages })
})

router.post('/add', async (req, res) => {
    const vehicle = req.body
    const newVehicle = await vehicleService.addVehicle(vehicle)
    res.json(newVehicle)
})

router.post('/bulk', async (req, res) => {
    const vehicles: any[] = req.body
    const newVehicle = await vehicleService.bulkVehicles(vehicles)
    res.json(newVehicle)
})

router.get('/last', async (_req, res) => {
    const last = await vehicleService.getLastId()

    if(!last) res.status(404).send()
    res.json(last)
})

export default router