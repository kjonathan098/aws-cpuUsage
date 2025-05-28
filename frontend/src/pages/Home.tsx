import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import { useState } from 'react'
import CpuChart from '../components/CpuChart/CpuChart'
import AWSInputFields from '../components/AWSInputs/AwsInputFields'
import axios from 'axios'
import type { AWSDataPoints, AwsForm, ErrorResponse } from '@/types/types'
import { fetchCpuUsage } from '../api/cpuService'

export interface ChartDataPayload {
	chartData: AWSDataPoints[]
	timeIntervals: string
}

const Home = () => {
	const [chartData, setChartData] = useState<ChartDataPayload | null>()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleFetch = async (form: AwsForm) => {
		setError(null)
		setLoading(true)
		setChartData(null)
		try {
			const res = await fetchCpuUsage(form)
			setChartData({ chartData: res.message, timeIntervals: form.intervals })
		} catch (error) {
			if (axios.isAxiosError<ErrorResponse>(error)) {
				setError(error.response?.data.message || 'Something went wrong')
			} else {
				setError('Unexpected error')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Box bg={'blue.400'} minH={'50px'}>
				Header
			</Box>
			<Box>
				<AWSInputFields handleFetch={handleFetch} />
			</Box>
			<Box>
				{loading && (
					<Center>
						<Spinner size="xl" />
					</Center>
				)}
				{error && <Text color="red.500">{error}</Text>}
				{chartData && <CpuChart chartData={chartData} />}
			</Box>
		</>
	)
}

export default Home
