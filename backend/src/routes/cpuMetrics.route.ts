import express from 'express'
import cpuMetricsController from '../controllers/cpuMetrics.controller'

const cpuMetricsRouter = express.Router()

cpuMetricsRouter.get('/', cpuMetricsController.getCpuMetrics)

export default cpuMetricsRouter
