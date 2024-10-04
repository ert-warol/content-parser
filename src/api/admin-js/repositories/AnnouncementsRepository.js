import { api } from '../services/api-service'

export default class AnnouncementsRepository {
  static startParsing(payload, options) {
    const url = 'announcements/parsingContentByParams'
    return api(options).post(url, payload)
  }
  static getPrices(options) {
    const url = 'announcements/dashboard'
    return api(options).get(url)
  }
}
