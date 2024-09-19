import React, { useState } from 'react'
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
	const [selectedCategory, setSelectedCategory] = useState('')
	const [url, setUrl] = useState('https://www.mobile.bg')
	const [productionYearFrom, setProductionYearFrom] = useState('')
	const [productionYearTo, setProductionYearTo] = useState('')
	const [transmission, setTransmission] = useState('')
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')
	const [errors, setErrors] = useState({})
	const validate = () => {
		const newErrors = {}
		if (!selectedCategory) newErrors.selectedCategory = 'Category is required'

		return newErrors
	}

	const handleSubmit = async event => {
		console.log('event -> ', event)

		event.preventDefault()
		const newErrors = validate()
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}
		const data = {
			url,
			selectedCategory,
			productionYearFrom,
			productionYearTo,
			transmission,
			priceFrom,
			priceTo,
		}

		try {
			const response = await fetch('http://localhost:8080/announcements/proceed', {
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

	return (
		<div className="custom-page">
			<h1>Category Form</h1><br/>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Category:</label>
					<select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
						<option value="">Select a category</option>
						{categories.map((category, index) => (
							<option key={index} value={category}>{category}</option>
						))}
					</select>
					{errors.selectedCategory && <span className="error">{errors.selectedCategory}</span>}
				</div>
				<div className="form-group">
					<label>Production Years:</label>
					<select value={productionYearFrom} onChange={(e) => setProductionYearFrom(e.target.value)}>
						<option value="">2017</option>
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
				<div className="form-group" style={{'margin-bottom': '15px'}}>
					<label>Transmission:</label>
					<select value={typeTransmission[transmission]} onChange={(e) => setTransmission(e.target.value)}>
						<option value="">None</option>
						{Object.values(typeTransmission).map((year, index) => (
							<option key={index} value={year}>{year}</option>
						))}
					</select>
					{/*<input type="text" value={transmission} onChange={(e) => setTransmission(e.target.value)}/>*/}
					{errors.transmission && <span className="error">{errors.transmission}</span>}
				</div>
				<div className="form-group price-interval" style={{'margin-bottom': '15px'}}>
					<label>Price:</label>
					<div className="interval">
						<input type="number" placeholder="From" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}/>
						{errors.priceFrom && <span className="error">{errors.priceFrom}</span>}
						<input type="number" placeholder="To" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
						{errors.priceTo && <span className="error">{errors.priceTo}</span>}
					</div>

				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

function yearsFromAnyToCurrent (startYear = 2017) {
	const currentYear = new Date().getFullYear()
	const years = []

	for (let year = startYear; year <= currentYear; year++) {
		years.push(year)
	}

	return years
}

export default ContentParser
