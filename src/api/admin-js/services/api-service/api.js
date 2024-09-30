import axios from 'axios'

class Api {
  constructor({
    baseURL = '',
    timeout = 120000,
    headers = {},
    onSuccess = null,
    wrapResponse = null,
    onError = null,
    onFinally = null,
    responseType = 'json',
    dataOnly = true,
    onRequest = null,
    signal = null,
  } = {}) {
    this.onRequest = onRequest && onRequest.bind(this)
    this.onSuccess = onSuccess && onSuccess.bind(this)
    this.onError = onError && onError.bind(this)
    this.onFinally = onFinally && onFinally.bind(this)
    this.wrapResponse = wrapResponse && wrapResponse.bind(this)
    this.baseURL = baseURL
    this.responseType = responseType
    this.dataOnly = dataOnly
    this.timeout = timeout
    this.signal = signal

    this.setHeaders(headers)._defineService()
  }

  cancel(message = '') {
    this.controller.abort(message)
    console.log('Request aborted')
  }

  get(url, params = null, config = {}) {
    return this.request({
      url,
      method: 'get',
      params,
      data: null,
      ...config,
    })
  }

  post(url, data = {}, config = {}) {
    return this.request({
      url,
      method: 'post',
      data,
      ...config,
    })
  }

  put(url, data = {}, config = {}) {
    return this.request({
      url,
      method: 'put',
      data,
      ...config,
    })
  }

  delete(url, config = {}) {
    return this.request({
      url,
      method: 'delete',
      ...config,
    })
  }

  request(config) {
    this.requestConfig = config
    this.defineRequestInterceptor().defineResponseInterceptor()
    return this.service.request(config)
  }

  _defineService() {
    this.controller = this.signal || new AbortController()
    this.service = axios.create({
      baseURL: this.baseURL,
      responseType: this.responseType,
      timeout: this.timeout,
      signal: this.controller.signal,
    })
    return this
  }

  setHeaders(headers) {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    }
    return this
  }

  defineRequestInterceptor() {
    this.service.interceptors.request.use(
      config => {
        config.headers = this.headers
        this.onRequest && this.onRequest()
        return config
      },
      error => {
        console.log('request error', error)
        return Promise.reject(error)
      },
    )
    return this
  }

  defineResponseInterceptor() {
    this.service.interceptors.response.use(
      async response => {
        const responseData = response
        if (this.wrapResponse) {
          responseData.data = this.wrapResponse(responseData.data)
        }
        const result = this.dataOnly ? responseData.data : responseData
        if (this.onSuccess) {
          await this.onSuccess(result)
        }
        if (this.onFinally) {
          await this.onFinally(result)
        }
        return Promise.resolve(result)
      },
      error => {
        if (this.onError) {
          this.onError(error)
        }
        if (this.onFinally) {
          this.onFinally(error)
        }
        return Promise.reject(error)
      },
    )
    return this
  }
}

export default Api
