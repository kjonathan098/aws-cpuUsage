import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/appErrorClass'
import { respondSuccess } from '../utils/respondSuccess'
import getEC2IdFromIp from '../helpers/getEc2IdFromIp'
import getCpuUsage from '../helpers/getCpuUssage'
import sortDataPoints from '../utils/sortDataPoints'

const getCpuMetrics = async (req: Request, res: Response, next: NextFunction) => {
	const ipAddress = req.body.ipAddress
	const timePeriod = req.body.timePeriod
	const intervals = req.body.intervals

	try {
		if (!ipAddress || !timePeriod || !intervals) throw new AppError('Missing required inputs: ipAddress, timePeriod, intervals', 400)

		// get ec2 instance id from Ip
		const ec2ID = await getEC2IdFromIp(ipAddress)

		if (!ec2ID) throw new AppError('EC2 ID not found', 404)

		const cpuUssage = await getCpuUsage(ec2ID, timePeriod, intervals)

		if (!cpuUssage.Datapoints?.length) {
			throw new AppError('No data points collected', 400)
		}

		const sortedDataPoints = sortDataPoints(cpuUssage.Datapoints)

		respondSuccess(res, sortedDataPoints)
	} catch (error: any) {
		next(new AppError(error.message || 'Error fetching metrics', error.status))
	}
}

const cpuMetricsController = { getCpuMetrics }

export default cpuMetricsController
