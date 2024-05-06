import express from 'express'
import * as routeService from '../services/route/route-service'
const router = express.Router()

router.get('/name', (req, res) => {
    const name = req.query.name as string
    res.send(JSON.parse(routeService.getRoute(name)))
})

export default router