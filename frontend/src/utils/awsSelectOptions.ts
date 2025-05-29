import { createListCollection } from '@chakra-ui/react'

export const startingTime = createListCollection({
	items: [
		{ label: 'Last Hour', value: `${3600}` },
		{ label: 'Last 24 Hours', value: `${3600 * 24}` },
		{ label: 'Last 7 Days', value: `${3600 * 24 * 7}` },
		{ label: 'Last Month', value: `${3600 * 24 * 30}` },
		{ label: 'Last 3 Months', value: `${3600 * 24 * 90}` },
		{ label: 'Last 6 Months', value: `${3600 * 24 * 180}` },
		{ label: 'Last 1 Year', value: `${3600 * 24 * 365}` },
	],
})

export const timeIntervals = createListCollection({
	items: [
		{ label: 'Every 5 Minutes', value: `${300}` },
		{ label: 'Every Hour', value: `${3600}` },
		{ label: 'Every Day', value: `${86400}` },
		{ label: 'Every Month', value: `${2592000}` },
	],
})
