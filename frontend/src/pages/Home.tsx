import { Box, Center, HStack } from '@chakra-ui/react'
import React from 'react'
import CpuChart from '../components/CpuChart/CpuChart'
import AWSInputFields from '../components/AWSInputs/AwsInputFields'

const Home = () => {
	return (
		<>
			<Box bg={'blue.400'} minH={'50px'}>
				Header
			</Box>
			<Box>
				<AWSInputFields />
			</Box>
			<Box>
				<CpuChart />
			</Box>
		</>
	)
}

export default Home
