import { GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch'
import createCloudWatchClient from '../utils/createCloudWatchClient'

const getCpuUsage = async (instanceId: string, timePeriod: number, intervals: number) => {
	const endTime = new Date()

	console.log('🚀 ~ getCpuUsage ~ endTime:', endTime)

	const startTime = new Date(Date.now() - timePeriod * 1000)

	console.log('🚀 ~ getCpuUsage ~ startTime:', startTime)

	const command = new GetMetricStatisticsCommand({
		Namespace: 'AWS/EC2',
		MetricName: 'CPUUtilization',
		Dimensions: [
			{
				Name: 'InstanceId',
				Value: instanceId,
			},
		],
		StartTime: startTime,
		EndTime: endTime,
		Period: intervals,
		Statistics: ['Average'],
		Unit: 'Percent',
	})
	const cloudwatch = createCloudWatchClient()
	const response = await cloudwatch.send(command)

	return response
}

export default getCpuUsage
