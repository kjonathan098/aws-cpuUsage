import { Center, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import sailBoat from '../../assets/sailBoat.gif'

const PageTitle = () => {
	return (
		<>
			<Center>
				<Image src={sailBoat} h={'auto'} w={'300px'} />
			</Center>
			<VStack gap={2} textAlign="center">
				<Heading as="h1" size="5xl" fontWeight="extrabold" letterSpacing="-1px" lineHeight="shorter" color={'#4290d5'}>
					Faddom Cloud Performance Visualized
				</Heading>
				<Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto" fontWeight="medium">
					Monitor and explore CPU usage of your AWS EC2 instance in real-time — clean, fast, and insightful.
				</Text>
			</VStack>
		</>
	)
}
export default PageTitle
