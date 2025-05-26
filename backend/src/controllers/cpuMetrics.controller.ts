import { Request, Response } from 'express'

const getCpuMetrics = async (req: Request, res: Response) => {
	res.send('hero')
}

const cpuMetricsController = {getCpuMetrics}

export default cpuMetricsController