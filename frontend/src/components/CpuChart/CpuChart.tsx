import { Line } from 'react-chartjs-2'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale } from 'chart.js'
import { Box, Center } from '@chakra-ui/react'
import { getOptions } from '../../utils/chartOptions'
import { getChartDataPoints } from '../../utils/chartDataPoints'
import type { ChartDataPayload } from '@/types/types'
import 'chartjs-adapter-date-fns'

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale)

interface IProps {
	chartData: ChartDataPayload
}

const CpuChart = ({ chartData }: IProps) => {
	return (
		<Center>
			<Box width={'80%'}>
				<Line data={getChartDataPoints(chartData)} options={getOptions(Number(chartData.timeIntervals))} />
			</Box>
		</Center>
	)
}

export default CpuChart
