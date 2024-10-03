import Api from './api'

export const api = (options = {}) => new Api(options)

// TODO - put requests in a separate file
export const startParsing = (payload, options) =>
  api(options).post('announcements/parsingContentByParams', payload)

export const getModelsByOption = (option, options) =>
  api(options).get(`selects/options?option=${option}`)

export const createOptions = (payload = {}, options) =>
  api(options).post('selects/options/create', payload)
