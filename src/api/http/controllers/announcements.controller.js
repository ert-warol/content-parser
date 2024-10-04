import { parsingContentByParamsService } from '../services/announcements.service.js'
import { getDashboardData, parsingContentByParamsService } from '../services/announcements.service.js'
import { isValidUrl } from '../helpers/helper.js'



export const dashboard = async (_request, _response) => {
	try {
		return {
			data: await getDashboardData(),
			errors: []
		}
	} catch (e) {
		return {
			error: e.message
		}
	}
}

export const parsingContentByParams = async (request, response) => {
	const params = Object.fromEntries(Object.entries(request.body).filter(([_key, value]) => value))

	try {
		if (!isValidUrl(params.url)) {
			throw new Error('Invalid domain')
		}

		if (!params.productionYearFrom) {
			console.log("Invalid the parameter year. It'll be set to the -> 2017.")
		}

		const processedAnnouncements = await parsingContentByParamsService(params)

		response.status(201)

		return { success: true, errors: [] }
	} catch (e) {
		return {
			error: e.message
		}
	}
}