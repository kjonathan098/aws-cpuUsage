import type { ChartOptions } from 'chart.js'

const getTimeUnit = (interval: number) => {
	if (interval >= 86400) return 'day'
	if (interval >= 3600) return 'hour'
	return 'minute'
}

export const getOptions = (timeInterval: number) => {
	const options: ChartOptions<'line'> = {
		responsive: true, //  Resizes chart with container
		scales: {
			x: {
				type: 'time' as const, // Tells Chart.js this axis is time-based
				time: {
					tooltipFormat: 'PPpp', //  Format for tooltips (uses date-fns)
					unit: getTimeUnit(timeInterval), // disables aggregation
				},
				title: {
					display: true,
					text: 'Timestamp', //  X-axis label
				},
				ticks: {
					autoSkip: false,
					maxTicksLimit: 31, // optional, prevent overcrowding
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
	return options
}
