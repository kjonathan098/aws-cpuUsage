import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2'
import createEC2Client from '../utils/createEc2Client'

const getEC2IdFromIp = async (ipAddress: string) => {
	// create ec2 client
	const ec2 = createEC2Client()

	const command = new DescribeInstancesCommand({
		Filters: [{ Name: 'private-ip-address', Values: [ipAddress] }],
	})

	const response = await ec2.send(command)
	return response.Reservations?.[0]?.Instances?.[0]?.InstanceId
}

export default getEC2IdFromIp
