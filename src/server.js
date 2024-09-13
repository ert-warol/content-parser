import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
// import fastifyHelmet from '@fastify/helmet'
import fastifySwagger from '@fastify/swagger'
import AdminJSFastify from '@adminjs/fastify'
import AdminJS from 'adminjs'
import * as AdminJSSequelize from '@adminjs/sequelize'
import 'dotenv/config'
import route from './api/http/routes/announcements.route.js'
import Announcements from './api/http/models/announcements.model.js'
import { Components, componentLoader } from './api/admin-js/components.js'

AdminJS.registerAdapter({
	Resource: AdminJSSequelize.Resource,
	Database: AdminJSSequelize.Database,
})

const start = async () => {
	const app = Fastify({
		logger: process.env.NODE_ENV === 'production' ? { level: 'error' } : true,
		trustProxy: true
  })
	const port = process.env.PORT || 8080
	const admin = new AdminJS({
		componentLoader,
		resources: [
		  {
				resource: Announcements,
				options: {
					listProperties: ['img', 'title', 'price', 'proizvodstvo', 'skorosti', 'probeg'],
					sort: {
						price: 'updatedAt',
						direction: 'desc',
					},
					properties: {
						// image: {
						// 	type: 'img',
						// 	// reference: 'img',
						// 	props: {
						// 		id: 'image',
						// 		src: 'https://mobistatic2.focus.bg/mobile/photosorg/648/1/11725028685739648_a5.webp',
						// 	},
						// 	components: {
						// 		list: Components.CustomImage,
						// 		show: Components.CustomImage,
						// 	},
						// },
						img: {
							type: 'string',
							components: {
								list: Components.CustomImage
							},
						},
					},
				},
			},
		],
		rootPath: '/admin'
	})

	admin.watch()

	await AdminJSFastify.buildRouter(
		admin,
		app
	)

	// app.register(fastifyHelmet, { global: true })
	app.register(fastifyCors, {
		origin: '*',
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Accept',
			'Content-Type',
			'Authorization'
		],
		methods: ['GET', 'POST']
	})
	app.register(fastifySwagger, {
		routePrefix: '/docs',
		swagger: {
			info: {
				title: 'Automobile crawler',
				description: 'Documentation for Automobile crawler API',
				version: '1.0.0'
			},
			host: 'localhost',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [],
			definitions: {},
		},
		uiConfig: {
			docExpansion: 'full',
			deepLinking: true
		},
		staticCSP: true,
		exposeRoute: true,
		hideUntagged: true
	})
	app.register(route)

	app.get('/', () => {
		return { name: 'Automobile crawler API' }
	})

	app.listen({ port }, (err, addr) => {
		if (err) {
			console.error(err)
		} else {
			console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`)
		}
	})
}

start()