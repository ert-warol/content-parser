import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
// import fastifyCookie from '@fastify/cookie'
// import fastifyHelmet from '@fastify/helmet'
import fastifySwagger from '@fastify/swagger'
// import FastifySession from '@fastify/session'
import AdminJSFastify from '@adminjs/fastify'
import fastifyStatic from '@fastify/static'
// import fastifyRedis from '@fastify/redis'
import AdminJS, { DefaultAuthProvider } from 'adminjs'
import * as AdminJSSequelize from '@adminjs/sequelize'
// import Connect from 'connect-pg-simple'
import 'dotenv/config'
import routeAnnouncements from './api/http/routes/announcements.route.js'
import routeOptions from './api/http/routes/selects.options.route.js'
import { option } from './api/admin-js/options/options.js'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const filepath = import.meta.url

AdminJS.registerAdapter({
	Resource: AdminJSSequelize.Resource,
	Database: AdminJSSequelize.Database,
})

// const ConnectSession = Connect(FastifySession)
// const sessionStore = new ConnectSession({
// 	conObject: {
// 		connectionString: `postgres://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASSWORD}@${process.env.POSTGRESQL_HOST}:${process.env.POSTGRESQL_PORT}/${process.env.POSTGRESQL_DB}`,
// 		ssl: process.env.NODE_ENV === 'production',
// 	},
// 	tableName: 'sessions',
// 	createTableIfMissing: true,
// })
// const DEFAULT_ADMIN = {
// 	email: 'ertfediran@gmail.com',
// 	password: 'ERT_pas11',
// }
// const authenticate = async (email, password) => {
// 	if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
// 		return Promise.resolve(DEFAULT_ADMIN)
// 	}
// 	return null
// }
const start = async () => {
	const app = Fastify({
		logger: true,
		trustProxy: true
	})
	const port = process.env.PORT
	// const cookieSecret = process.env.SECRET_KEY
	const admin = new AdminJS(option)
	// const cookieSecret = 'sieL67H7GbkzJ4XCoH0IHcmO1hGBSiG5'
	await AdminJSFastify.buildRouter(
		admin,
		// {
		// 	authenticate,
		// 	cookiePassword: cookieSecret,
		// 	cookieName: 'adminjs',
		// },
		app,
		// {
		// 	store: sessionStore,
		// 	saveUninitialized: true,
		// 	secret: cookieSecret,
		// 	cookie: {
		// 		httpOnly: process.env.NODE_ENV === 'stage',
		// 		secure: process.env.NODE_ENV === 'stage',
		// 	},
		// }
	)

	admin.watch()

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
	app.register(fastifyStatic, {
		root: path.join(__dirname, 'public'),
		prefix: '/public/',
	})
	// app.register(fastifyRedis, {
	// 	host: '127.0.0.1', // Redis server host
	// 	port: 6379,        // Redis server port
	// 	password: process.env.SECRET_KEY, // Optional, if your Redis server requires a password
	// })
	app.register(routeAnnouncements)
	app.register(routeOptions)

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

process.on('SIGINT', () => {
	console.log('Server shutting down...')
	process.exit(0)
})

start()
