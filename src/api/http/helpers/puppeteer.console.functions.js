export const puppeteerConsoleFunctions = {
	goToBrandPage: option => {
		try {
			selectOptionMenu('akSearchMarki', this, option.brand)

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
			sef_searchsubmit('2',document.search)

			const sortBySelect = document.querySelector(selector)

			sortBySelect.selectedIndex = 4
		} catch (e) {
			console.error(e)
		}
	},
	goToFormPage: () => {
		const agreeCookiesBtn = document.querySelector('#cookiescript_buttons #cookiescript_accept')

		agreeCookiesBtn.click()

		const autoDiv = document.querySelector('.catIcons.showcats .a1')

		if (!autoDiv) {
			return false
		}

		autoDiv.click()

		return true
	},
	getMainDetails: data => {
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
	},
	validateForResults: () => {
		const messageAlert = document.querySelector('.pageMessageAlert')

		if (messageAlert) {
			return false
		}

		const paginationExist = document.querySelector('.pagination-wrapper')

		return !!paginationExist
	},
	moreFilters: selector => {
		const sortBySelect = document.querySelector(selector)

		sortBySelect.selectedIndex = 4

		javascript:sef_searchsubmit('3',document.search)
	},
	acceptСookies: () => {
		const agreeCookiesBtn = document.querySelector('#cookiescript_buttons #cookiescript_accept')

		agreeCookiesBtn.click()
	},
	getNumberOfPages() {
		const pugination = document.querySelectorAll('.pagination .saveSlink')

		return Array.from(pugination).reduce((counter,item) => {
			counter = Number(item.innerText) && counter < Number(item.innerText) ? Number(item.innerText) : counter

			return counter
		}, 0)
	},
	addNewProperties: item => {
		const getFirstArrItem = str => { return Number(str.split(' ')[0])	}
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
				item[label] = getFirstArrItem(value)
			} else if (label === 'probeg') {
				item[label] = getFirstArrItem(value)
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
}
