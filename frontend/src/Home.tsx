import { Box, Center, HStack } from '@chakra-ui/react'
import React from 'react'
import CpuChart from './components/CpuChart/CpuChart'

const Home = () => {
	return (
		<>
			<Box bg={'blue.400'} minH={'50px'}>
				Header
			</Box>
			<Box>Input Fields</Box>
			<Box>
				<CpuChart />
			</Box>
		</>
	)
}

export default Home
