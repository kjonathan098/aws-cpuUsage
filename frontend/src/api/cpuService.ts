import axios from 'axios'
import type { AwsForm, SuccessResponse } from '../types/types'

const BASE_URL = 'http://localhost:4000'

export const fetchCpuUsage = async (form: AwsForm) => {
	const res = await axios.post<SuccessResponse>(`${BASE_URL}/api/cpuMetric`, form)
	return res.data
}
