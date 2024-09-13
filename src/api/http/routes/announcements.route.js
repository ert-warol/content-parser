import { list, proceed } from '../controllers/announcements.controller.js'

export default (fastify, _opts, done) => {
	fastify.route({
		method: 'GET',
		url: '/announcements/list',
		handler: list,
		// schema: authSignInShopifySchema
	})

	fastify.route({
		method: 'POST',
		url: '/announcements/proceed',
		handler: proceed,
		// schema: authSignInShopifyCallbackSchema
	})

	done()
}
