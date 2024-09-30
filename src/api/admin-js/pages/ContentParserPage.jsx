import React, { useState, useEffect } from 'react'
import { getModelsByOption, startParsing } from '../services/api-service'

const URL = 'https://www.mobile.bg'
const DEFAULT_YEAR = 2017
const ContentParser = () => {
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [productionYearFrom, setProductionYearFrom] = useState(DEFAULT_YEAR)
  const [productionYearTo, setProductionYearTo] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [errors, setErrors] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    const data = {
      url: URL,
      selectedBrand,
      selectedModel,
      productionYearFrom,
      productionYearTo,
      priceFrom,
      priceTo,
    }

    try {
      await startParsing(data, {
        onRequest: () => setIsLoading(true),
        onFinally: () => setIsLoading(false),
        onSuccess: res => {
          console.log(res)
        },
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Fetch brands on component mount
  useEffect(() => {
    getModelsByOption('brands', {
      onSuccess: res => {
        console.log('brands response -> ', res)
        setBrands(res?.options || [])
      },
    }).catch(e => console.error('Error fetching brands:', e))
  }, [])

  // Fetch models when a brand is selected
  useEffect(() => {
    if (selectedBrand) {
      getModelsByOption(selectedBrand, {
        onSuccess: res => {
          console.log('Models response -> ', res)
          setModels(res?.options || [])
        },
      }).catch(e => console.error('Error fetching models:', e))
    }
  }, [selectedBrand])

  return (
    <div className="custom-page">
      <h1>Parser form</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
          >
            <option value="">Select a brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          {errors.selectedBrand && (
            <span className="error">{errors.selectedBrand}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
          >
            <option value="">Select a model</option>
            {models.map(model => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {errors.selectedModel && (
            <span className="error">{errors.selectedModel}</span>
          )}
        </div>
        <div className="form-group">
          <label>Production Years (by default is {DEFAULT_YEAR}):</label>
          <select
            value={productionYearFrom}
            onChange={e => setProductionYearFrom(e.target.value)}
          >
            <option value="2017">Select year</option>
            {yearsFromAnyToCurrent().map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/*<input type="number" placeholder="From" value={productionYearFrom} onChange={(e) => setProductionYearFrom(e.target.value)} />*/}
          {errors.productionYearFrom && (
            <span className="error">{errors.productionYearFrom}</span>
          )}
          <select
            value={productionYearTo}
            onChange={e => setProductionYearTo(e.target.value)}
          >
            <option value=""></option>
            {yearsFromAnyToCurrent().map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/*<input type="number" placeholder="To" value={productionYearTo}*/}
          {/*       onChange={(e) => setProductionYearTo(e.target.value)}/>*/}
          {errors.productionYearTo && (
            <span className="error">{errors.productionYearTo}</span>
          )}
        </div>
        <div
          className="form-group price-interval"
          style={{ marginBottom: '15px' }}
        >
          <label>Price:</label>
          <div className="interval">
            <input
              type="number"
              placeholder="From"
              value={priceFrom}
              onChange={e => setPriceFrom(e.target.value)}
            />
            {errors.priceFrom && (
              <span className="error">{errors.priceFrom}</span>
            )}
            <input
              type="number"
              placeholder="To"
              value={priceTo}
              onChange={e => setPriceTo(e.target.value)}
            />
            {errors.priceTo && <span className="error">{errors.priceTo}</span>}
          </div>
        </div>
        <button type="submit">Run parser</button>
        {isLoading && <Loader />}
      </form>
    </div>
  )
}

function yearsFromAnyToCurrent(startYear = DEFAULT_YEAR) {
  const currentYear = new Date().getFullYear()
  const years = []

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year)
  }

  return years
}

export default ContentParser
