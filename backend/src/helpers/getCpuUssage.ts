import { GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch'
import createCloudWatchClient from '../utils/createCloudWatchClient'

const getCpuUsage = async (instanceId: string) => {
	// TODO - change start date to users req
	const now = new Date()
	const start = new Date(now.getTime() - 1000 * 60 * 60) // 1 hour ago

	const command = new GetMetricStatisticsCommand({
		Namespace: 'AWS/EC2',
		MetricName: 'CPUUtilization',
		Dimensions: [
			{
				Name: 'InstanceId',
				Value: instanceId,
			},
		],
		StartTime: start,
		EndTime: now,
		Period: 300, // 5 minutes
		Statistics: ['Average'],
		Unit: 'Percent',
	})
	const cloudwatch = createCloudWatchClient()
	const response = await cloudwatch.send(command)

	return response
}

export default getCpuUsage
