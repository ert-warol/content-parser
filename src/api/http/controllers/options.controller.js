// import { isValidUrl, checkExistBrand } from '../../helpers/helper.js'
import { processingSelects, processingAllSelects } from '../services/options.service.js'

export const upsertOptions = async (request, response) => {
	try {
		const processedSelect = await processingSelects({ option: request.body.option, value: request.body.value})

		response.status(201)

		return processedSelect
	} catch (e) {
		return {
			error: e.message
		}
	}
}

export const createOptions = async (_request, response) => {
	try {
		const processedSelect = await processingAllSelects()

		response.status(201)

		return processedSelect
	} catch (e) {
		return {
			error: e.message
		}
	}
}
