'use strict'

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
	process.env.POSTGRESQL_DB,
	process.env.POSTGRESQL_USER,
	process.env.POSTGRESQL_PASSWORD,
	{
		host: process.env.POSTGRESQL_HOST,
		dialect: process.env.DIALECT
	})

export { sequelize }