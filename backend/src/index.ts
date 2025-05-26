import express from 'express'
import dotenv from 'dotenv'
import cpuMetricsRouter from './routes/cpuMetrics.route'
import errorHandler from './errorHandler'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use('/api/cpuMetric', cpuMetricsRouter)

// error middleware 
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
