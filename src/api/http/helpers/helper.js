import puppeteer from 'puppeteer'

import Announcements from '../models/announcements.model.js'
import Options from '../models/options.model.js'

async function getMainCategories (data){

}

async function getDataFromSite (data)  {
	const dataObj = {
		item: [],
		errors: [],
	}

	try {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(url)
		await browser.close()
	} catch (err) {
		console.error('An error occurred:', err)

		dataObj.errors.push(err.message)
	}

	return dataObj
}

export function isValidUrl (string) {
	try {
		new URL(string)
		return true
	} catch (err) {
		return false
	}
}

export function splitArrayIntoFourChunks(originalArray) {
	const chunkSize = Math.ceil(originalArray.length / 4)
	const resultArrays = []

	for (let i = 0; i < originalArray.length; i += chunkSize) {
		const chunk = originalArray.slice(i, i + chunkSize)
		resultArrays.push(chunk)
	}

	return resultArrays
}

function getChunks (quantity, size) {
	const chunks = []
	const countOfChunks = Math.floor(quantity / size)
	const remainder = quantity % size

	for (let i = 0; i < countOfChunks; i++) {
		chunks.push(size)
	}

	if (!remainder) {
		return chunks
	}

	chunks.push(remainder)

	return chunks
}
