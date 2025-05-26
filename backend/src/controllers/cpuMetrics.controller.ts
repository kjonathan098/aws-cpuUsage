import { NextFunction, Request, Response } from 'express'
import { AppError } from '../appErrorClass'

const getCpuMetrics = async (req: Request, res: Response, next: NextFunction) => {
	try {
		throw new Error('testing error')
		res.send('hero')
	} catch (error: any) {
		next(new AppError(error.message || 'Error fetching metrics', error.status))
	}
}

const cpuMetricsController = { getCpuMetrics }

export default cpuMetricsController
