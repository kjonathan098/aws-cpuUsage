import express from 'express'
import dotenv from 'dotenv'
import cpuMetricsRouter from './routes/cpuMetrics.route'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use('/api/cpuMetric', cpuMetricsRouter)

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
