import * as Yup from 'yup'

export const URL = 'https://www.mobile.bg'
export const DEFAULT_YEAR = 2017

export const parserValidationSchema = Yup.object()
  .shape({
    selectedBrand: Yup.string().required('Required'),
    selectedModel: Yup.string().required('Required'),
    productionYearFrom: Yup.string().required('Required'),
    productionYearTo: Yup.string(),
    priceFrom: Yup.number('Invalid value')
      .positive('Invalid value')
      .integer('Value must be an integer'),
    priceTo: Yup.number('Invalid value')
      .positive('Invalid value')
      .integer('Value must be an integer'),
  })
  .test('price-range', 'test', (values, actions) => {
    const { productionYearFrom, productionYearTo, priceFrom, priceTo } = values
    if (
      productionYearFrom &&
      productionYearTo &&
      +productionYearFrom > +productionYearTo
    ) {
      return actions.createError({
        path: 'productionYearFrom',
        message:
          "The 'From' value must be less than or equal to the 'To' value",
      })
    }
    if (priceFrom && priceTo && +priceFrom > +priceTo) {
      return actions.createError({
        path: 'priceFrom',
        message:
          "The 'From' value must be less than or equal to the 'To' value",
      })
    }
    return true
  })
