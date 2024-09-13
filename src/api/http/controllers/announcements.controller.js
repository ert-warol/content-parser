import { processingAnnouncements, getProcessedAnnouncements } from '../services/announcements.service.js'
import { isValidUrl } from '../../helpers/helper.js'

export const list = (request, _response) => {
	return getProcessedAnnouncements
}

export const proceed = async (request, response) => {
	const { domain, year } = request.body

	try {
		if (!isValidUrl(domain)) {
			throw new Error('Invalid domain')
		}

		if (!year || typeof year !== 'number') {
			console.log("Invalid the parameter year. It'll be set to the -> 2017.")
		}

		const processedAnnouncements = await processingAnnouncements({ domain, year })

		response.status(201)

		// return processedAnnouncements
	} catch (e) {
		return {
			error: e.message
		}
	}
}