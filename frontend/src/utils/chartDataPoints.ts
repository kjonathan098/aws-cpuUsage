import type { ChartDataPayload } from '@/pages/Home'

export const getChartDataPoints = (chartData: ChartDataPayload) => {
	const chartDataPoints = {
		labels: chartData.chartData.map((d) => new Date(d.Timestamp)), // x-axis values
		datasets: [
			{
				label: 'CPU Utilization (%)', // Name shown in legend / tooltip
				data: chartData.chartData.map((d) => d.Average * 100), // Y-axis values
				fill: false, // No fill under the line
				borderColor: '#3182CE', //  Line color
				tension: 0.1, //  Curve smoothness (0 = sharp lines)
			},
		],
	}
	return chartDataPoints
}
