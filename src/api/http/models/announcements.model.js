import { DataTypes } from 'sequelize'
import { sequelize } from '../../../libs/database/index.js'

const Announcements = sequelize.define('announcements', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
		field: 'id'
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	link: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	img: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	proizvodstvo: {
		type: DataTypes.STRING,
	},
	dvigatel: {
		type: DataTypes.STRING,
	},
	moshtnost: {
		type: DataTypes.INTEGER,
	},
	euro: {
		type: DataTypes.STRING,
	},
	skorosti: {
		type: DataTypes.STRING,
	},
	probeg: {
		type: DataTypes.INTEGER,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
		field: 'created_at'
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
		field: 'updated_at'
	}
})

export default Announcements
