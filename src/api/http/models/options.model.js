import { DataTypes } from 'sequelize'
import { sequelize } from '../../../libs/database/index.js'

const Options = sequelize.define('options', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	select: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	options: {
		type: DataTypes.JSONB,
		allowNull: false,
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

export default Options