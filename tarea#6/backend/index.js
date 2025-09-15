import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { db } from './config/db.js'
import serviceRoutes from './routes/servicesRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

db()

app.use('/api/services', serviceRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(colors.blue('Servidor ejecutándose en puerto:'), PORT)
})
