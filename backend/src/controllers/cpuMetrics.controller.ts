import { NextFunction, Request, Response } from 'express'
import { AppError } from '../appErrorClass'
import { respondSuccess } from '../utils/respondSuccess'
import getEC2IdFromIp from '../helpers/getEc2IdFromIp'
import createEC2Client from '../utils/createEc2Client'
import getCpuUsage from '../helpers/getCpuUssage'

const getCpuMetrics = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// create ec2 client
		const ec2 = createEC2Client()

		// get ec2 instance id from Ip
		const ec2ID = await getEC2IdFromIp(ec2)

		if (!ec2ID) {
			throw new Error('EC2 id not found ')
		}

		const cpuUssage = await getCpuUsage(ec2ID)

		console.log('🚀 ~ getCpuMetrics ~ cpuUssage:', cpuUssage.Datapoints)

		respondSuccess(res, 'hero')
	} catch (error: any) {
		next(new AppError(error.message || 'Error fetching metrics', error.status))
	}
}

const cpuMetricsController = { getCpuMetrics }

export default cpuMetricsController
