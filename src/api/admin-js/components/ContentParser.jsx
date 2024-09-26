import React, { useState, useEffect  } from 'react'
// import './style/style.css'
// import styles from './style/style.css'

const categories = [
	"Mercedes-Benz",
	"BMW",
	"Audi",
	"VW",
	"Toyota",
	"Opel",
	"Peugeot"
]
const typeTransmission = {
	'manual': 'Ръчна',
	'automatic': 'Автоматична',
	'semi_automatic': 'Полуавтоматична'
}

const ContentParser = () => {
	const [brands, setBrands] = useState([])
	const [models, setModels] = useState([])
	const [selectedBrand, setSelectedBrand] = useState('')
	const [selectedModel, setSelectedModel] = useState('')
	const [url, setUrl] = useState('https://www.mobile.bg')
	const [productionYearFrom, setProductionYearFrom] = useState('2017')
	const [productionYearTo, setProductionYearTo] = useState('')
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')
	const [errors, setErrors] = useState({})
	// const validate = () => {
	// 	const newErrors = {}
	// 	if (!selectedCategory) newErrors.selectedBrand = 'Category is required'
	//
	// 	return newErrors
	// }
	const handleSubmit = async event => {
		console.log('event -> ', event)

		event.preventDefault()
		// const newErrors = validate()
		// if (Object.keys(newErrors).length > 0) {
		// 	setErrors(newErrors)
		// 	return
		// }
		const data = {
			url,
			selectedBrand,
			selectedModel,
			productionYearFrom,
			productionYearTo,
			priceFrom,
			priceTo,
		}

		try {
			const response = await fetch('http://localhost:8080/announcements/parsingContentByParams', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (response.ok) {
				console.log('Data submitted successfully')
			} else {
				console.error('Failed to submit data')
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	// Fetch brands on component mount
	useEffect(() => {
		fetch('/brand/models/options?option=brands')
			.then(response => response.json())
			.then(data => {
				setBrands(data.options)

				console.log('data.options -> ', data.options)
			})
			.catch(error => {
				console.error('Error fetching brands:', error)
			})
	}, [])

	// Fetch models when a brand is selected
	useEffect(() => {
		if (selectedBrand) {
			fetch(`/brand/models/options?option=${selectedBrand}`)
				.then(response => response.json())
				.then(data => {
					setModels(data.options)

					console.log('data.options -> ', data.options)
				})
				.catch(error => {
					console.error('Error fetching models:', error)
				})
		}
	}, [selectedBrand])

	return (
		<div className="custom-page">
			<h1>Parser form</h1><br/>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="brand">Brand:</label>
					<select
						id="brand"
						value={selectedBrand}
						onChange={(e) => setSelectedBrand(e.target.value)}
					>
						<option value="">Select a brand</option>
						{brands.map(brand => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
					{errors.selectedBrand && <span className="error">{errors.selectedBrand}</span>}
				</div>
				<div className="form-group">
					<label htmlFor="model">Model:</label>
					<select
						id="model"
						value={selectedModel}
						onChange={(e) => setSelectedModel(e.target.value)}
					>
						<option value="">Select a model</option>
						{models.map(model => (
							<option key={model} value={model}>
								{model}
							</option>
						))}
					</select>
					{errors.selectedModel && <span className="error">{errors.selectedModel}</span>}
				</div>
				<div className="form-group">
					<label>Production Years (by default is 2017):</label>
					<select value={productionYearFrom} onChange={(e) => setProductionYearFrom(e.target.value)}>
						<option value="2017">Select year</option>
						{yearsFromAnyToCurrent().map((year, index) => (
							<option key={index} value={year}>{year}</option>
						))}
					</select>
					{/*<input type="number" placeholder="From" value={productionYearFrom} onChange={(e) => setProductionYearFrom(e.target.value)} />*/}
					{errors.productionYearFrom && <span className="error">{errors.productionYearFrom}</span>}
					<select value={productionYearTo} onChange={(e) => setProductionYearTo(e.target.value)}>
						<option value=""></option>
						{yearsFromAnyToCurrent().map((year, index) => (
							<option key={index} value={year}>{year}</option>
						))}
					</select>
					{/*<input type="number" placeholder="To" value={productionYearTo}*/}
					{/*       onChange={(e) => setProductionYearTo(e.target.value)}/>*/}
					{errors.productionYearTo && <span className="error">{errors.productionYearTo}</span>}
				</div>
				<div className="form-group price-interval" style={{'margin-bottom': '15px'}}>
					<label>Price:</label>
					<div className="interval">
						<input type="number" placeholder="From" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}/>
						{errors.priceFrom && <span className="error">{errors.priceFrom}</span>}
						<input type="number" placeholder="To" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}/>
						{errors.priceTo && <span className="error">{errors.priceTo}</span>}
					</div>

				</div>
				<button type="submit">Run parser</button>
			</form>
		</div>
	)
}

function yearsFromAnyToCurrent(startYear = 2017) {
	const currentYear = new Date().getFullYear()
	const years = []

	for (let year = startYear; year <= currentYear; year++) {
		years.push(year)
	}

	return years
}

export default ContentParser
