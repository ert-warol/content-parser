import { api } from '../services/api-service'

export default class SelectsRepository {
  static getByOption(option, options) {
    const url = `selects/options?option=${option}`
    return api(options).get(url)
  }

  static createOptions(payload = {}, options) {
    const url = 'selects/options/create'
    return api(options).post(url, payload)
  }

  static upsertOptions(payload = {}, options) {
    const url = 'selects/options/upsert'
    return api(options).put(url, payload)
  }
}
