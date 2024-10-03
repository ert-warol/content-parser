import { parsingContentByParams } from '../controllers/announcements.controller.js'

export default (fastify, _opts, done) => {
	// fastify.route({
	// 	method: 'POST',
	// 	url: '/announcements/proceed',
	// 	handler: proceed,
	// 	// schema: authSignInShopifyCallbackSchema
	// })

	fastify.route({
		method: 'POST',
		url: '/announcements/parsingContentByParams',
		handler: parsingContentByParams,
		// schema: authSignInShopifyCallbackSchema
	})

	done()
}
