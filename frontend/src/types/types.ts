export interface AWSDataPoints {
	Timestamp: string
	Average: number
	Unit: string
}

export interface SuccessResponse {
	success: boolean
	message: AWSDataPoints[]
}

export interface ErrorResponse {
	success: false
	message: string
}

export interface AwsForm {
	ipAddress: string
	timePeriod: string
	intervals: string
}

export interface ChartDataPayload {
	chartData: AWSDataPoints[]
	timeIntervals: string
}
