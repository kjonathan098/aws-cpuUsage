import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale } from 'chart.js'
import { mockData } from '../../utils/mockData'
import { Box, Center } from '@chakra-ui/react'
import 'chartjs-adapter-date-fns'
import type { AWSDataPoints } from '@/types/types'
import type { ChartDataPayload } from '@/pages/Home'
import type { ChartOptions } from 'chart.js'
import { getOptions } from '../../utils/chartOptions'
import { getChartDataPoints } from '../../utils/chartDataPoints'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale)

const CpuChart = ({ chartData }: { chartData: ChartDataPayload }) => {
	return (
		<Center>
			<Box width={'80%'}>
				<Line data={getChartDataPoints(chartData)} options={getOptions(Number(chartData.timeIntervals))} />
			</Box>
		</Center>
	)
}

export default CpuChart
