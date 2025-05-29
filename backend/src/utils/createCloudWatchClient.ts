import { CloudWatchClient } from '@aws-sdk/client-cloudwatch'
import { AppError } from './appErrorClass'

const createCloudWatchClient = () => {
	if (!process.env.REGION || !process.env.AWS_ACCESS_ID || !process.env.AWS_SECRET_ACCESS_KEY) throw new AppError('Missing Cloud Watch Credentials', 500)

	const cloudwatch = new CloudWatchClient({
		region: process.env.REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_ID!,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		},
	})

	return cloudwatch
}

export default createCloudWatchClient
