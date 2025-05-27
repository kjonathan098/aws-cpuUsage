import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2'

const getEC2IdFromIp = async (ec2: EC2Client) => {
	const ip = process.env.IP_ADDRESS

	if (!ip) {
		throw Error('Missing AWS IP address')
	}

	const command = new DescribeInstancesCommand({
		Filters: [{ Name: 'private-ip-address', Values: [ip] }],
	})

	const response = await ec2.send(command)
	return response.Reservations?.[0]?.Instances?.[0]?.InstanceId
}

export default getEC2IdFromIp
