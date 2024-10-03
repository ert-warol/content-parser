import puppeteer from 'puppeteer'
import Option from './Option.js'

class OptionSite extends Option {
	constructor (data) {
		super(data)

		this.selectors = {
			searchForm: '.searchForms.AUTO',
			autoDiv: '.catIcons.showcats .a1',
			mainCategories: '.f1 .selectWrapper .CAT select',
			brands: '.f2.akMarkWrapper #akSearchMarki .a[data-popular="true"] span',
			modelsGeneral: '.f3.akMarkWrapper',
			models: '.f3.akMarkWrapper .scroll .a span',
			yearOfProduction: '.f7',
			sortBy: '.f8',
			modelsOptions: '#akSearchModeli .scroll .a span',
			moreFilters: '.searchForms.AUTO .moreFilters',
			priceFrom: 'form table table:nth-child(4) tbody tr:nth-child(3) td:nth-child(2)',
			priceTo: 'form table table:nth-child(4) tbody tr:nth-child(3) td:nth-child(4)',
			currency: 'form table table:nth-child(4) tbody tr:nth-child(3) td:nth-child(5) select option',
		}
		this.goto = data.goto || ''
	}

	async get () {
		const browser = await puppeteer.launch()
		const init = await this.#init(browser)

		if (init.errors.length) {
			return init.errors
		}

		const page = init.page

		if (this.option) {
			await page.evaluate(select => selectOptionMenu('akSearchMarki', this, select), this.option)
			await page.waitForSelector(this.selectors.modelsGeneral)
		}

		if (this.option === 'currency') {
			await page.goto(this.goto)
			await page.waitForSelector(this.selectors.currency)
		}

		const options = this.option === 'currency'
			? await page.evaluate(this.getOptionsFromMoreFilters, this.selectors.currency)
			: await page.evaluate(this.getOptionsOfSelect, this.selectors[this.value])

		await page.close()
		await browser.close()

		return {
			select: this.option || this.value,
			options
		}
	}

	async #init (browser) {
		try {
			const page = await browser.newPage()

			await page.goto(process.env.BASE_URL)
			await page.waitForSelector(this.selectors.searchForm)
			await page.evaluate(this.acceptСookies)
			const init = await page.evaluate(this.initFormSearch, this.selectors.autoDiv)

			if (!init.success) {
				return { page: init.success, errors: init.errors }
			}

			await page.waitForSelector(this.selectors.searchForm)

			return { page, errors: init.errors }
		} catch (e) {
			console.error()

			return { page: {}, errors: init.errors }
		}
	}

	initFormSearch (selector) {
		try {
			const autoDiv = document.querySelector(selector)

			if (!autoDiv) {
				throw new Error('Main auto elements NOT FOUND or contains ERRORS: ')
			}

			autoDiv.click()

			return { success: true, errors: [] }
		} catch (e) {
			return { success: false, errors: [e.message] }
		}
	}

	getOptionsOfSelect (selector) {
		const selectOptions = document.querySelectorAll(selector)
		return Array.from(selectOptions)
			.reduce((modelNames, item, index) => {
				if (index % 2 !== 0) {
					return modelNames
				}

				modelNames.push(item.innerHTML.replace(/&nbsp;/g, ''))

				return modelNames
			}, [])
	}

	getOptionsFromMoreFilters (selector) {
		const currencySelect = document.querySelectorAll(selector)

		return Array.from(currencySelect).map(element => element.label)
	}

	acceptСookies () {
		const agreeCookiesBtn = document.querySelector('#cookiescript_buttons #cookiescript_accept')

		agreeCookiesBtn.click()
	}

	goToFormPage () {
		// const agreeCoociesBtn = document.querySelector('#cookiescript_buttons #cookiescript_accept')
	}
}

export default OptionSite


