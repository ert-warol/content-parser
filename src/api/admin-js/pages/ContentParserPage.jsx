import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNotice } from 'adminjs'
import { Loader } from '@adminjs/design-system'

import Select from '../components/Select'
import LabelWithError from '../components/LabelWithError'

import { getModelsByOption, startParsing } from '../services/api-service'
import {
  URL,
  DEFAULT_YEAR,
  parserValidationSchema,
  yearsFromAnyToCurrent,
} from '../helpers'

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
    productionYearFrom: DEFAULT_YEAR,
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
        {({ setFieldValue }) => {
          return (
            <Form className="flex flex-col gap-20">
              {/****************** Brand select input ****************/}

              <div className="flex flex-col gap-5">
                <LabelWithError label="*Brand:" field="selectedBrand" />
                <Select
                  name="selectedBrand"
                  optionValues={brands}
                  placeholder="Select a brand"
                  onChange={e => {
                    const value = e.target.value
                    setSelectedBrand(value)
                    setFieldValue('selectedBrand', value)
                  }}
                />
              </div>

              {/****************** Model select input ****************/}

              <div className="flex flex-col gap-5">
                <LabelWithError label="*Model:" field="selectedModel" />
                <Select
                  disabled={models.length === 0}
                  name="selectedModel"
                  optionValues={models}
                  placeholder={
                    models.length === 0
                      ? 'First choose a brand'
                      : 'Select a model'
                  }
                />
              </div>

              {/****************** Year select inputs ****************/}

              <div className="flex flex-col gap-5">
                <LabelWithError
                  label="Production years:"
                  field="productionYearFrom"
                />
                <div className="flex gap-5">
                  <Select
                    name="productionYearFrom"
                    optionValues={yearsFromAnyToCurrent()}
                  />
                  <Select
                    name="productionYearTo"
                    optionValues={yearsFromAnyToCurrent()}
                    placeholder="To"
                    clearable
                  />
                </div>
              </div>

              {/****************** Price inputs ****************/}

              <div
                className="flex flex-col gap-5"
                style={{ marginBottom: '15px' }}
              >
                <LabelWithError label="Price:" field="priceFrom" />
                <div className="flex gap-5 flex-wrap">
                  <Select
                    name="currency"
                    optionValues={currencies}
                    placeholder="Curr."
                    clearable
                    flex={false}
                  />
                  <Field
                    name="priceFrom"
                    placeholder="From"
                    className="flex-1 custom-field"
                  />
                  <Field
                    name="priceTo"
                    placeholder="To"
                    className="flex-1 custom-field"
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

export default ContentParser
