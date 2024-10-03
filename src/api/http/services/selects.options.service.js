import OptionSite from '../helpers/OptionSite.js'
import OptionDb from '../helpers/OptionDb.js'

export async function getBrandsAndModels (option) {
	const optionList = await OptionDb.get(option)

	return {
		options: optionList.options
	}
}

export async function processingSelects (data) {
	const dataObj = {
		item: [],
		errors: [],
	}

	try {
		const optionFromDb = await OptionDb.get(data.value)
		const optionSite = new OptionSite(data)
		const optionCurrentValue = await optionSite.get()
		const areEqual = Object.keys(optionFromDb).length && optionFromDb.options.length === optionCurrentValue.length
			&& optionFromDb.options
				.every((value, index) => value === optionCurrentValue[index]) || false

		if (areEqual) {
			return { success: true }
		}

		if (optionFromDb.id) {
			optionCurrentValue.id = optionFromDb.id
		}

		const entitySaved = await OptionDb.upsert(entity)

		return { success: !!entitySaved }
	} catch (err) {
		console.error('An error occurred:', err)

		dataObj.errors.push(err.message)
	}
}

export async function processingAllSelects () {
	const rows = []
	const errors = []
	const optionSite = new OptionSite({ option: '', value: 'brands' })
	const brands = await optionSite.get()

	rows.push({ select: brands.select, options: brands.options})

	const promises = brands.options.map(brand => {
		const optionSite = new OptionSite({ option: brand, value: 'models' })

		return optionSite.get()
	})
	const optionCurrency = new OptionSite({ option: 'currency', value: '', goto: 'https://www.mobile.bg/search/avtomobili-dzhipove' })

	promises.push(optionCurrency.get())

	const items = await Promise.allSettled(promises)

	items.filter(item => item.status === 'fulfilled')
		.forEach(({ value }) => {
			rows.push({ select: value.select, options: value.options })
		})

	const saved = await OptionDb.bulkCreate(rows)

	if (items.length !== saved.length) {
		errors.push('Not all items were saved')
	}

	return {
		ids: saved.map(item => item.id),
		success: true
	}
}
