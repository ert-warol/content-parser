import puppeteer from 'puppeteer'

import Announcements from './../models/announcements.model.js'
import OptionDb from '../helpers/OptionDb.js'
import { selectors } from '../helpers/selectors.js'

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

// export const processingAnnouncements = async params => {
// 	const dataObj = {
// 		item: [],
// 		errors: [],
// 	}
//
// 	try {
// 		const browser = await puppeteer.launch()
// 		const page = await browser.newPage()
//
// 		await page.goto(params.url)
//
// 		const popularCategories = await OptionDb.get('brands')
//
// 		await page.close()
//
// 		const promises = popularCategories.map(category => processAnnouncementsFromCategory({ category, domain, browser }))
// 		const processedCategories = await Promise.allSettled(promises)
//
// 		await browser.close()
// 	} catch (err) {
// 		console.error('An error occurred:', err)
//
// 		dataObj.errors.push(err.message)
// 	}
// }

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
		await page.evaluate(goToFormPage)
		await page.waitForSelector('.searchForms')
		await page.evaluate(selectBrand, brand)
		await page.waitForSelector('.f7')
		await page.evaluate(goToBrandPage, option)
		await page.goto(process.env.FILTERS_URL)
		await page.evaluate(sortBy)
		await page.waitForSelector('.resultsInfoBox')

		const contentExist = await page.evaluate(validateForResults)

		if (!contentExist) {
			await page.close()

			return 'There is no content to display.'
		}

		mapOfAnnouncements.currentListPage = page.url()
// && mapOfAnnouncements.counter < 100
		while(mapOfAnnouncements.existNextPage) {
			const announcements = []
			const rejectedAnnouncementIds = []
			const data = { category, announcementIds }
			const { listOfItems, nextPage , ids } = await page.evaluate(getMainDetails, data)

			if (!listOfItems.length) {
				await page.goto(nextPage)
				await wittingForSelectors(page)

				continue
			}

			mapOfAnnouncements.existNextPage = !!nextPage

			for (const item of listOfItems) {
				await page.goto(item.link)
				await page.waitForSelector('.mainCarParams')

				const mainItemParams = await page.evaluate(addNewProperties, item)

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

function addNewProperties (item) {
	const getFirstArrItem = str => { return str.split(' ')[0]	}
	const getLastArrItem = str => {
		const arr = str.split(' ')
		return arr[arr.length - 1]
	}
	const mainCarParams = document.querySelectorAll('.mainCarParams .item')
	const img = document.querySelector('.owl-item.active .carouselimg.owl-lazy')

	item['img'] = img ? img.getAttribute('src')  : 'none'

	for (const child of Array.from(mainCarParams))  {
		const [_label, value] = child.innerText.split('\n')
		const [label] = Array.from(child.classList).filter(childClass => childClass !== 'item')

		if (label === 'proizvodstvo') {
			item[label] = getLastArrItem(value)
		} else if (label === 'moshtnost') {
			item[label] = Number(getFirstArrItem(value))
		} else if (label === 'probeg') {
			item[label] = Number(getFirstArrItem(value))
		} else {
			item[label] = value
		}
	}

	if (!item['proizvodstvo']) {
		const techData = document.querySelectorAll('.techData .item')
		const dateOfProduction = Array.from(techData)
			.reduce((value, item) => {
				if (item.querySelectorAll('div')[0].innerText !== 'Дата на производство') {
					return value
				}

				return item.querySelectorAll('div')[1].innerText
			}, '')

		item['proizvodstvo'] = getLastArrItem(dateOfProduction)
	}

	return item
}

function selectBrand (brand) {
	selectOptionMenu('akSearchMarki', this, brand)
}

function goToBrandPage (option) {
	try {
		if (option.model) {
			const modelSelect = document.querySelector('.f3 .akCustomSelectInput')

			modelSelect.value = option.model
		}

		function yearsFromAnyToCurrent(startYear = 2017) {
			const currentYear = new Date().getFullYear()
			const years = []

			for (let year = startYear; year <= currentYear; year++) {
				years.push(year)
			}

			years.push(0)

			return years.reverse()
		}

		const selectElement = document.querySelectorAll('.f7 select')

		selectElement[0].selectedIndex = yearsFromAnyToCurrent().findIndex(item => item == option.year)

		// Push the submit button
		sef_searchsubmit('3',document.search)
	} catch (e) {
		console.error(e)
	}
}

// async function wittingForSelectors (page) {
// 	await page.waitForSelector('.pagination-wrapper')
// }

function goToFormPage () {
	const autoDiv = document.querySelector('.catIcons.showcats .a1')

	if (!autoDiv) {
		return false
	}

	autoDiv.click()

	return true
}

function getPopularCategories () {
	{
		function splitIntoChunks(arr, chunkSize) {
			const resultArr = []
			for (let i = 0; i < arr.length; i += chunkSize) {
				resultArr.push(arr.slice(i, i + chunkSize))
			}
			return resultArr
		}

		const autoDiv = document.querySelector('.catIcons.showcats .a1')

		if (!autoDiv) {
			throw new Error('Main auto elements NOT FOUND or contains ERRORS: ')
		}

		autoDiv.click()

		const modelsSelectNode = document.querySelectorAll('.f2.akMarkWrapper')

		if (!modelsSelectNode) {
			throw new Error('Models Select elements NOT FOUND or contains ERRORS: ')
		}

		const [modelsSelectDiv] = modelsSelectNode
		const modelsSelect = modelsSelectDiv.querySelectorAll('#akSearchMarki .scroll div.a[data-popular="true"] span')

		return splitIntoChunks(Array.from(modelsSelect), 2).reduce((arr, [nodeName, nodeCounter]) => {
			arr.push(nodeName.innerHTML)

			return arr
		}, [])
	}
}

function getMainDetails (data) {
	const { category, announcementIds } = data
	const listOfItems = []
	const nodeList = document.querySelectorAll('.ads2023 .item')

	for (const node of Array.from(nodeList)) {
		const id = node.getAttribute('id')

		if (announcementIds.includes(id)) {
			continue
		}

		const title = document.querySelector(`#${id} .text .zaglavie .title`)
		const price = document.querySelector(`#${id} .text .price div`).innerText
		const obj = {
			id,
			category,
			title: title.innerHTML || '',
			price: Number(price.replaceAll(' ','').replaceAll('лв.','')) || 0,
			link: `https:${title.getAttribute('href')}`
		}

		listOfItems.push(obj)
	}

	return {
		ids: listOfItems.map(item => item.id),
		listOfItems,
		nextPage: document.querySelector('.pagination-wrapper .next').getAttribute('href')
	}
}

function validateForResults () {
	const messageAlert = document.querySelector('.pageMessageAlert')

	if (messageAlert) {
		return false
	}

	const paginationExist = document.querySelector('.pagination-wrapper')

	return !!paginationExist
}

function sortBy () {
	const sortBySelect = document.querySelector(selectors.sortBy)

	sortBySelect.selectedIndex = 4

	javascript:sef_searchsubmit('3',document.search);
}