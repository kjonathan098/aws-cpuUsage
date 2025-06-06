import { Box, Center, Image, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import CpuChart from '../components/CpuChart/CpuChart'
import AWSInputFields from '../components/AWSInputs/AwsInputFields'
import axios from 'axios'
import type { AWSDataPoints, AwsForm, ChartDataPayload, ErrorResponse } from '@/types/types'
import { fetchCpuUsage } from '../api/cpuService'
import faddomLogo from '../assets/faddom-main-logo.svg'
import ErrorMessage from '../components/Error/ErrorMessage'
import PageTitle from '../components/HomeTitlle/HomeTittle'

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
		<Stack h={'100vh'}>
			<Box bg={'blue.400'} h={'50px'} p={2}>
				<Image src={faddomLogo} height={'40px'} />
			</Box>
			<Box>
				<AWSInputFields handleFetch={handleFetch} isLoading={loading} />
			</Box>
			<Box>
				{error && (
					<Center>
						<ErrorMessage error={error} />
					</Center>
				)}
				{!chartData && !error && !loading && <PageTitle />}
				{chartData && <CpuChart chartData={chartData} />}
			</Box>
		</Stack>
	)
}

export default Home
