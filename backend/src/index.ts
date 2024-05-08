import * as dotenv from 'dotenv'
import express from 'express'
import WebSocket from 'ws'
import cors from 'cors'
import https from 'https'
import fs from 'fs'

import vehicleRouter from './routes/vehicle'
import routesRouter from './routes/route'

dotenv.config()

const app = express()
const PORT = process.env.EXPRESS_SERVER_PORT || 3000

const httpOptions = {
    key: fs.readFileSync('./src/assets/ssl/private.pem'),
    cert: fs.readFileSync('./src/assets/ssl/public.pem')
}

const httpServer = https.createServer(httpOptions, app)

const wsServer = new WebSocket.Server({ noServer: true })

wsServer.on('connection', (ws: WebSocket) => {
    console.log('Client connected')
    ws.on('message', (message: string) => {
        console.log(`Received: ${message}`)

        // Echo message back to all clients
        wsServer.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log('Sending message to client');
                client.send(message as string)
            }
        })
    })
})

app.use(express.json())
app.use(cors())

app.get('/', (_req: any, res: any) => {
    res.send('<h1>Tracking Server</h1>')
})

app.use('/api/v1/vehicle', vehicleRouter)
app.use('/api/v1/route', routesRouter)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

httpServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request)
    })
})