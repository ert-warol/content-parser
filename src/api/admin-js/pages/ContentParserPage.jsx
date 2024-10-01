import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Loader } from '@adminjs/design-system'

import { getModelsByOption, startParsing } from '../services/api-service'
import { URL, DEFAULT_YEAR, parserValidationSchema } from '../helpers'

const ContentParser = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [models, setModels] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const initialFormValues = {
    selectedBrand: '',
    selectedModel: '',
    productionYearFrom: DEFAULT_YEAR,
    productionYearTo: '',
    priceFrom: '',
    priceTo: '',
  }

  const handleSubmit = async values => {
    const data = {
      url: URL,
      ...values,
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
      <h1 style={{ marginBottom: '20px' }}>Parser form</h1>

      <Formik
        initialValues={initialFormValues}
        validationSchema={parserValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => {
          return (
            <Form className="parser-form">
              <div className="form-group">
                <p>
                  <span>*Brand:</span>
                  <ErrorMessage
                    name="selectedBrand"
                    component="span"
                    className="error-message"
                  />
                </p>

                <Field
                  as="select"
                  name="selectedBrand"
                  onChange={e => {
                    const value = e.target.value
                    setSelectedBrand(value)
                    setFieldValue('selectedBrand', value)
                  }}
                >
                  <option disabled hidden value="">
                    Select a brand
                  </option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-group">
                <p>
                  <span>*Model:</span>
                  <ErrorMessage
                    name="selectedModel"
                    component="span"
                    className="error-message"
                  />
                </p>
                <Field
                  disabled={models.length === 0}
                  as="select"
                  name="selectedModel"
                >
                  <option disabled hidden value="">
                    {models.length === 0
                      ? 'First choose a brand'
                      : 'Select a model'}
                  </option>
                  {models.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-group">
                <p>
                  <span>Production years:</span>
                  <ErrorMessage
                    name="productionYearFrom"
                    component="span"
                    className="error-message"
                  />
                </p>
                <Field as="select" name="productionYearFrom">
                  {yearsFromAnyToCurrent().map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Field>

                <Field as="select" name="productionYearTo">
                  <option disabled hidden value="">
                    Select 'to' year
                  </option>
                  {yearsFromAnyToCurrent().map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="productionYearTo"
                  component="span"
                  className="error-message"
                />
              </div>

              <div
                className="form-group price-interval"
                style={{ marginBottom: '15px' }}
              >
                <p>
                  <span>Price:</span>
                  <ErrorMessage
                    name="priceFrom"
                    component="span"
                    className="error-message"
                  />
                </p>
                <Field name="priceFrom" placeholder="From" />

                <ErrorMessage
                  name="priceTo"
                  component="span"
                  className="error-message"
                />
                <Field name="priceTo" placeholder="To" />
              </div>

              <button type="submit">Run parser</button>

              {isLoading && <Loader />}
            </Form>
          )
        }}
      </Formik>
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
