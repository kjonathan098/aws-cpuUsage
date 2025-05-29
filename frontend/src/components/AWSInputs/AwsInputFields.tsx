import { useState } from 'react'
import { Box, Button, Field, HStack, Input } from '@chakra-ui/react'
import { Portal, Select, createListCollection } from '@chakra-ui/react'
import type { AwsForm } from '@/types/types'
import { validateIP } from '../../utils/validateIP'

interface IProps {
	handleFetch: (form: AwsForm) => Promise<void>
	isLoading: boolean
}
const AWSInputFields = ({ handleFetch, isLoading }: IProps) => {
	const [form, setForm] = useState({
		ipAddress: '',
		timePeriod: '',
		intervals: '',
	})
	const [validIP, setValidIP] = useState(false)

	const handleChange = (key: string, value: string) => {
		setForm((prev) => ({
			...prev,
			[key]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setValidIP(false)
		e.preventDefault()
		if (!form.ipAddress || !form.timePeriod || !form.intervals) {
			window.alert('Missing field')
			return
		}
		if (!validateIP(form.ipAddress)) {
			setValidIP(true)
			return
		}
		handleFetch(form)
	}

	return (
		<form onSubmit={handleSubmit}>
			<HStack p={4} justifyItems={'center'} align="end">
				<Field.Root required invalid={validIP}>
					<Field.Label>IP Address</Field.Label>
					<Box position="relative" w={'100%'}>
						<Input size="sm" placeholder="Enter your IP address" onChange={(e) => handleChange('ipAddress', e.target.value)} value={form.ipAddress} />

						<Field.ErrorText position="absolute" top="100%" left={0} fontSize="xs" color="red.500">
							Invalid IP Address
						</Field.ErrorText>
					</Box>
				</Field.Root>

				{/* STARTING TIME SELECTOR  */}
				<Select.Root collection={startingTime} size="sm" onValueChange={(val) => handleChange('timePeriod', val.value[0])} required>
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
				<Select.Root collection={timeIntervals} size="sm" onValueChange={(val) => handleChange('intervals', val.value[0])} required>
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

				<Button type="submit" size={'sm'} bg={'#f9b509'} loading={isLoading}>
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
		{ label: 'Every Month', value: `${2592000}` },
	],
})

export default AWSInputFields
