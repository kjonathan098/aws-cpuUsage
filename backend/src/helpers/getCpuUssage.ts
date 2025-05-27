import { GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch'
import createCloudWatchClient from '../utils/createCloudWatchClient'

const getCpuUsage = async (instanceId: string, timePeriod: number, intervals: number) => {
	// TODO - change start date and period to users req
	const endTime = new Date()
	const startTime = new Date(endTime.getTime() - timePeriod)

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
