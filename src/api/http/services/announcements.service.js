import puppeteer from 'puppeteer'

import Announcements from './../models/announcements.model.js'
import OptionDb from '../helpers/OptionDb.js'
import helper from '../helpers/helper.js'

import { selectors } from '../helpers/selectors.js'
import OptionDb from '../helpers/OptionDb.js'

export const getDashboardData = async params => {
	try {
		const query = `SELECT 
	    MAX(price) AS max_price,
	    MIN(price) AS min_price,
	    FLOOR(AVG(price)) AS avg_price
		FROM 
		  announcements
		WHERE 
  		price > 0;`

		return await OptionDb.getByCustomQuery(Announcements, query)
	} catch (err) {
		console.error(err)
	}
}

export const parsingContentByParamsService = async params => {
	const result = {
		status: 'in process',
		message: '',
		errors: [],
	}
	const brands = params.selectedBrand
		? [params.selectedBrand]
		: (await OptionDb.get('brands')).options
	const model = params.selectedBrand && params.selectedModel ? params.selectedModel : ''

	try {
		const browser = await puppeteer.launch()
		const promises = brands.map(brand => processAnnouncementsFromCategory(
			{ browser, url: params.url, brand, model, year: params.productionYearFrom }
		))
		const status = await Promise.allSettled(promises)

		await browser.close()

		result.status = 'completed'

		return result
	} catch (err) {
		await browser.close()
		console.error('An error occurred:', err)

		dataObj.errors.push(err.message)
	}
}

async function processAnnouncementsFromCategory ({ browser, url, brand, model, year }) {
	try {
		const [announcementsFromDb, page] = await Promise.all([
			Announcements.findAll({ where: { category: brand }, attributes: ['id'] }),
			browser.newPage()
		])
		const announcementIds = announcementsFromDb.length ? announcementsFromDb.map(item => item.id) : []
		const mapOfAnnouncements = {
			url,
			currentListPage: '',
			existNextPage: true,
			counter: 0
		}

		const option = {
			brand,
			year,
			model
		}

		await page.goto(url)
		await page.evaluate(helper.goToFormPage)
		await page.waitForSelector('.searchForms')
		await page.evaluate(helper.selectBrand, brand)
		await page.waitForSelector('.f7')
		await page.evaluate(helper.goToBrandPage, option)
		await page.goto(process.env.FILTERS_URL)
		await page.evaluate(helper.sortBy)
		await page.waitForSelector('.resultsInfoBox')

		const contentExist = await page.evaluate(helper.validateForResults)

		if (!contentExist) {
			await page.close()

			return 'There is no content to display.'
		}

		mapOfAnnouncements.currentListPage = page.url()

		while(mapOfAnnouncements.existNextPage) {
			const announcements = []
			const rejectedAnnouncementIds = []
			const data = { category, announcementIds }
			const { listOfItems, nextPage , ids } = await page.evaluate(helper.getMainDetails, data)

			if (!listOfItems.length) {
				await page.goto(nextPage)
				await wittingForSelectors(page)

				continue
			}

			mapOfAnnouncements.existNextPage = !!nextPage

			for (const item of listOfItems) {
				await page.goto(item.link)
				await page.waitForSelector('.mainCarParams')

				const mainItemParams = await page.evaluate(helper.addNewProperties, item)

				announcements.push(mainItemParams)
			}

			Promise.allSettled(announcements.map(item => Announcements.create(item)))
				.then(result => {
					const resolvedAnnouncementIds = result
						.filter(item => item.status === 'fulfilled')
						.map(item => item.value.id)

					announcementIds.push(...resolvedAnnouncementIds)
					rejectedAnnouncementIds.push(...ids.filter(id => !announcementIds.includes(id)))

					console.log(result)
				})

			await page.goto(nextPage)
			await wittingForSelectors(page)

			mapOfAnnouncements.counter += listOfItems.length
		}
		await page.close()

		return 'Parsing completed.'
	} catch (e) {
		console.error('An error occurred:', e)
	}
}
