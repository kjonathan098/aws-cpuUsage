import { Box, Center, HStack, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CpuChart from '../components/CpuChart/CpuChart'
import AWSInputFields from '../components/AWSInputs/AwsInputFields'
import axios from 'axios'
import type { AWSDataPoints, AwsForm, ErrorResponse, SuccessResponse } from '@/types/types'

export interface testing {
	chartData: AWSDataPoints[]
	timeIntervals: string
}

const Home = () => {
	const [chartData, setChartData] = useState<testing | null>()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const fetchCpuUssage = async (form: AwsForm) => {
		setError(null)
		setLoading(true)
		try {
			const res = await axios.post<SuccessResponse>('http://localhost:4000/api/cpuMetric', form)

			console.log('🚀 ~ fetchCpuUssage ~ res:', res.data.message)

			setChartData({ chartData: res.data.message, timeIntervals: form.intervals })
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
				<AWSInputFields fetchCpuUssage={fetchCpuUssage} />
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
