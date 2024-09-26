import { create, upsert, get } from '../controllers/brands.models.controller.js'

export default (fastify, _opts, done) => {
	fastify.route({
		method: 'GET',
		url: '/brand/models/options',
		handler: get,
		// schema: authSignInShopifySchema
	})

	fastify.route({
		method: 'POST',
		url: '/brand/models/create',
		handler: create,
		// schema: authSignInShopifySchema
	})

	fastify.route({
		method: 'PUT',
		url: '/brand/models/upsert',
		handler: upsert,
		// schema: authSignInShopifySchema
	})

	done()
}