import * as dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (_req: any, res: any) => {
    res.send('<h1>Tracking Server</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})