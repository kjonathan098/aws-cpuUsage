import { EC2Client } from '@aws-sdk/client-ec2'
import { AppError } from './appErrorClass'

const createEC2Client = () => {
	if (!process.env.AWS_ACCESS_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.REGION) throw new AppError('Missing AWS credentials', 500)

	const ec2: EC2Client = new EC2Client({
		region: process.env.REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		},
	})

	return ec2
}
export default createEC2Client
