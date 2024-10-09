import puppeteer from 'puppeteer'
import { Readable } from 'stream'

import Announcements from './../models/announcements.model.js'
import OptionDb from '../helpers/OptionDb.js'
import { queries } from '../helpers/helper.js'
import { selectors } from '../helpers/selectors.js'
import { puppeteerConsoleFunctions } from '../helpers/puppeteer.console.functions.js'

export const getDashboardData = async () => {
	try {
		return await OptionDb.getByCustomQuery(Announcements, queries.dashboardData)
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
		const promises = brands.map(brand => processAnnouncements(
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

async function processAnnouncements ({ browser, url, brand, model, year }) {
	try {
		const stream = new Readable({
			read() {}
		})
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
		const filters = {
			year,
			priceFrom: 0,
			priceTo: 0,
		}

		await page.goto(url)
		await page.evaluate(puppeteerConsoleFunctions.goToFormPage)
		await page.waitForSelector('.searchForms')
		await page.evaluate(puppeteerConsoleFunctions.goToBrandPage, option)
		await page.waitForSelector('form[name="search"]')
		await page.evaluate(puppeteerConsoleFunctions.moreFilters, selectors.sortBy)
		await page.waitForSelector('.resultsInfoBox')
		const contentExist = await page.evaluate(puppeteerConsoleFunctions.validateForResults)
		const numberOfPages = await page.evaluate(puppeteerConsoleFunctions.getNumberOfPages)

		if (!contentExist) {
			await page.close()

			return 'There is no content to display.'
		}

		mapOfAnnouncements.currentListPage = page.url()

		while(mapOfAnnouncements.existNextPage) {
			const announcements = []
			const rejectedAnnouncementIds = []
			const data = { category: brand, announcementIds }
			const { listOfItems, nextPage , ids } = await page.evaluate(puppeteerConsoleFunctions.getMainDetails, data)

			if (!listOfItems.length) {
				await page.goto(nextPage)
				await wittingForSelectors(page)

				continue
			}

			mapOfAnnouncements.existNextPage = !!nextPage

			for (const item of listOfItems) {
				await page.goto(item.link)
				await page.waitForSelector('.mainCarParams')

				const mainItemParams = await page.evaluate(puppeteerConsoleFunctions.addNewProperties, item)

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

			stream.push(JSON.stringify({ numberOfPages, page: currentPage, counter: mapOfAnnouncements.counter, inProgress: true }))
		}
		stream.push(JSON.stringify({ numberOfPages, page: currentPage, counter: mapOfAnnouncements.counter, inProgress: false }))
		await page.close()

		return 'Parsing completed.'

	} catch (e) {
		console.error('An error occurred:', e)
	}
}
