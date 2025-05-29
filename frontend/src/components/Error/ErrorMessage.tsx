import { Box, Alert } from '@chakra-ui/react'

const ErrorMessage = ({ error }: { error: string }) => {
	return (
		<Box width={'50%'}>
			<Alert.Root status="error">
				<Alert.Indicator />
				<Alert.Content>
					<Alert.Title>Oh Uh something went wrong </Alert.Title>
					<Alert.Description>{error}</Alert.Description>
				</Alert.Content>
			</Alert.Root>
		</Box>
	)
}

export default ErrorMessage
