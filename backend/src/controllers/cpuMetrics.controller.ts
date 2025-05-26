import { NextFunction, Request, Response } from 'express'
import { AppError } from '../appErrorClass'
import { respondSuccess } from '../utils/respondSuccess'

const getCpuMetrics = async (req: Request, res: Response, next: NextFunction) => {
	try {
		respondSuccess(res, 'hero')
	} catch (error: any) {
		next(new AppError(error.message || 'Error fetching metrics', error.status))
	}
}

const cpuMetricsController = { getCpuMetrics }

export default cpuMetricsController
