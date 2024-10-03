import { api } from '../services/api-service'

export default class AnnouncementsRepository {
  static startParsing(payload, options) {
    const url = 'announcements/parsingContentByParams'
    return api(options).post(url, payload)
  }
}
