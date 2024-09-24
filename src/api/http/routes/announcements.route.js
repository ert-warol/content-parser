import { proceed } from '../controllers/announcements.controller.js'

export default (fastify, _opts, done) => {
	fastify.route({
		method: 'POST',
		url: '/announcements/proceed',
		handler: proceed,
		// schema: authSignInShopifyCallbackSchema
	})

	done()
}
