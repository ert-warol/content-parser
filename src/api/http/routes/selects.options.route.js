import { create, upsert, get } from '../controllers/selects.options.controller.js'

export default (fastify, _opts, done) => {
	fastify.route({
		method: 'GET',
		url: '/selects/options',
		handler: get,
		// schema: authSignInShopifySchema
	})

	fastify.route({
		method: 'POST',
		url: '/selects/options/create',
		handler: create,
		// schema: authSignInShopifySchema
	})

	fastify.route({
		method: 'PUT',
		url: '/selects/options/upsert',
		handler: upsert,
		// schema: authSignInShopifySchema
	})

	done()
}