import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNotice } from 'adminjs'
import { Loader, Icon } from '@adminjs/design-system'

import { getModelsByOption, startParsing } from '../services/api-service'
import { URL, DEFAULT_YEAR, parserValidationSchema } from '../helpers'

const currencies = ['USD', 'EUR', 'лв.']

const ContentParser = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [models, setModels] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addNotice = useNotice()

  const initialFormValues = {
    selectedBrand: '',
    selectedModel: '',
    productionYearFrom: '',
    productionYearTo: '',
    priceFrom: '',
    priceTo: '',
    currency: '',
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
          addNotice({
            message: 'Parsing successful',
            type: 'success',
          })
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
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex direction-column gap-20">
              {/****************** Brand select input ****************/}

              <div className="flex direction-column gap-5">
                <p className="custom-label">
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
                  className={[
                    !values.selectedBrand ? 'text-gray' : '',
                    'custom-field',
                  ].join(' ')}
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

              {/****************** Model select input ****************/}

              <div className="flex direction-column gap-5">
                <p className="custom-label">
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
                  className={[
                    !values.selectedModel ? 'text-gray' : '',
                    'custom-field',
                  ].join(' ')}
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

              {/****************** Year select inputs ****************/}

              <div className="flex direction-column gap-5">
                <p className="custom-label">
                  <span>Production years:</span>
                  <ErrorMessage
                    name="productionYearFrom"
                    component="span"
                    className="error-message"
                  />
                </p>
                <div className="flex gap-5">
                  <div className="parser-form-select flex-1">
                    <Field
                      as="select"
                      name="productionYearFrom"
                      className={[
                        !values.productionYearFrom ? 'text-gray' : '',
                        'custom-field',
                      ].join(' ')}
                    >
                      <option disabled hidden value="">
                        From
                      </option>
                      {yearsFromAnyToCurrent().map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                    {values.productionYearFrom && (
                      <Icon
                        icon="X"
                        size={14}
                        className="select-icon"
                        onClick={() => setFieldValue('productionYearFrom', '')}
                      />
                    )}
                  </div>

                  <div className="parser-form-select flex-1">
                    <Field
                      as="select"
                      name="productionYearTo"
                      className={[
                        !values.productionYearTo ? 'text-gray' : '',
                        'custom-field',
                      ].join(' ')}
                    >
                      <option disabled hidden value="">
                        To
                      </option>
                      {yearsFromAnyToCurrent().map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                    {values.productionYearTo && (
                      <Icon
                        icon="X"
                        size={14}
                        className="select-icon"
                        onClick={() => setFieldValue('productionYearTo', '')}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/****************** Price inputs ****************/}

              <div
                className="flex direction-column gap-5"
                style={{ marginBottom: '15px' }}
              >
                <p className="custom-label">
                  <span>Price:</span>
                  <ErrorMessage
                    name="priceFrom"
                    component="span"
                    className="error-message"
                  />
                </p>
                <div className="flex gap-5 wrap">
                  <Field
                    as="select"
                    name="currency"
                    className={[
                      !values.currency ? 'text-gray' : '',
                      'custom-field',
                    ].join(' ')}
                  >
                    <option disabled hidden value="">
                      Curr.
                    </option>
                    <option value="">All</option>
                    {currencies.map(с => (
                      <option key={с} value={с}>
                        {с}
                      </option>
                    ))}
                  </Field>
                  <Field
                    name="priceFrom"
                    placeholder="From"
                    className="custom-field flex-1"
                  />
                  <Field
                    name="priceTo"
                    placeholder="To"
                    className="custom-field flex-1"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading}>
                Run parser
              </button>

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
