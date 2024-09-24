import {createOptions, upsertOptions} from '../controllers/options.controller.js'

export default (fastify, _opts, done) => {
	fastify.route({
		method: 'POST',
		url: '/options/create',
		handler: createOptions,
		// schema: authSignInShopifySchema
	})

	fastify.route({
		method: 'PUT',
		url: '/options/upsert',
		handler: upsertOptions,
		// schema: authSignInShopifySchema
	})

	done()
}