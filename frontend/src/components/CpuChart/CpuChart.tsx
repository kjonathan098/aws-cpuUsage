import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale } from 'chart.js'
import { mockData } from '../../utils/mockData'
import { Box, Center } from '@chakra-ui/react'
import 'chartjs-adapter-date-fns'
import type { AWSDataPoints } from '@/types/types'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale)

const CpuChart = ({ chartData }: { chartData: AWSDataPoints[] }) => {
	const chartDataPoints = {
		labels: chartData.map((d) => new Date(d.Timestamp)),
		datasets: [
			{
				label: 'CPU Utilization (%)', // Name shown in legend / tooltip
				data: mockData.map((d) => d.Average * 100), // Y-axis values
				fill: false, // No fill under the line
				borderColor: '#3182CE', //  Line color
				tension: 0.1, //  Curve smoothness (0 = sharp lines)
			},
		],
	}

	const options = {
		responsive: true, //  Resizes chart with container
		scales: {
			x: {
				type: 'time' as const, // Tells Chart.js this axis is time-based
				time: {
					tooltipFormat: 'PPpp', //  Format for tooltips (uses date-fns)
					stepSize: 5, // show a tick every 5 minutes
				},
				title: {
					display: true,
					text: 'Timestamp', //  X-axis label
				},
				ticks: {
					autoSkip: true,
					maxTicksLimit: 12, // optional, prevent overcrowding
				},
			},
			y: {
				title: {
					display: true,
					text: 'CPU (%)', //  Y-axis label
				},
			},
		},
	}

	return (
		<Center>
			<Box width={'80%'}>
				<Line data={chartDataPoints} options={options} />
			</Box>
		</Center>
	)
}

export default CpuChart
