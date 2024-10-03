// import { isValidUrl, checkExistBrand } from '../../helpers/helper.js'
import { processingSelects, processingAllSelects, getBrandsAndModels } from '../services/selects.options.service.js'

export const get = async (request, _response) => {
	try {
		return await getBrandsAndModels(request.query.option)
	} catch (e) {
		return {
			error: e.message
		}
	}
}

export const upsert = async (request, response) => {
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

export const create = async (request, response) => {
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
