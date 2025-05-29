import { Datapoint } from '@aws-sdk/client-cloudwatch'

const sortDataPoints = (datapoints: Datapoint[]) => {
	const sorted = datapoints.sort((a, b) => {
		if (!a.Timestamp || !b.Timestamp) return 0
		return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
	})
	return sorted
}
export default sortDataPoints
