import { dashboard, parsingContentByParams } from '../controllers/announcements.controller.js'

export default (fastify, _opts, done) => {
	fastify.route({
		method: 'GET',
		url: '/announcements/dashboard',
		handler: dashboard,
		// schema: authSignInShopifyCallbackSchema
	})

	fastify.route({
		method: 'POST',
		url: '/announcements/parsingContentByParams',
		handler: parsingContentByParams,
		// schema: authSignInShopifyCallbackSchema
	})

	done()
}
