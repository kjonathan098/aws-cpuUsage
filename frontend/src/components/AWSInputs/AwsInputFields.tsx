import { useEffect, useState } from 'react'
import { Box, Button, Center, Field, HStack, Input } from '@chakra-ui/react'
import { Portal, Select, createListCollection } from '@chakra-ui/react'
import axios from 'axios'
import type { AwsForm } from '@/types/types'

interface IProps {
	handleFetch: (form: AwsForm) => Promise<void>
}
const AWSInputFields = ({ handleFetch }: IProps) => {
	const [form, setForm] = useState({
		ipAddress: '172.31.88.161',
		timePeriod: '',
		intervals: '',
	})

	const handleChange = (key: string, value: string) => {
		setForm((prev) => ({
			...prev,
			[key]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!form.ipAddress || !form.timePeriod || !form.intervals) {
			window.alert('Missing field')
			return
		}
		handleFetch(form)
	}

	return (
		<form onSubmit={handleSubmit}>
			<HStack p={4} justifyItems={'center'}>
				<Field.Root invalid={!form.ipAddress.length}>
					<Field.Label>IP Address</Field.Label>
					<Input placeholder="Enter your IP address" onChange={(e) => handleChange('ipAddress', e.target.value)} value={form.ipAddress} />
					<Field.ErrorText>This field is required</Field.ErrorText>
				</Field.Root>

				{/* STARTING TIME SELECTOR  */}
				<Select.Root collection={startingTime} size="sm" onValueChange={(val) => handleChange('timePeriod', val.value[0])}>
					<Select.HiddenSelect />
					<Select.Label>Starting Time</Select.Label>
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Select Starting Time" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{startingTime.items.map((time) => (
									<Select.Item item={time} key={time.value}>
										{time.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>

				{/* TIME INTERVAL SELECTOR */}
				<Select.Root collection={timeIntervals} size="sm" onValueChange={(val) => handleChange('intervals', val.value[0])}>
					<Select.HiddenSelect />
					<Select.Label>Time Intervals</Select.Label>
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Select Time Intervals" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{timeIntervals.items.map((interval) => (
									<Select.Item item={interval} key={interval.value}>
										{interval.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>

				<Button type="submit" size={'sm'}>
					Fetch CPU Usage
				</Button>
			</HStack>
		</form>
	)
}

const startingTime = createListCollection({
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

const timeIntervals = createListCollection({
	items: [
		{ label: 'Every 5 Minutes', value: `${300}` },
		{ label: 'Every Hour', value: `${3600}` },
		{ label: 'Every Day', value: `${86400}` },
	],
})

export default AWSInputFields
