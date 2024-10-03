import Options from '../models/options.model.js'

class OptionDb {
	static async get (select) {
		const option = await Options.findOne({ where: { select }})

		return option || {}
	}

	static async save (option) {
		const newOption = await Options.create(option)

		return newOption
	}

	static async upsert (option) {
		const [result, created] = await Options.upsert(option)

		return result.id
	}

	static async update (option) {
		const updatedOption = await Options.update(option, { where: { select: option.select }})

		return updatedOption
	}

	static async delete (option) {
		const deletedOption = await Options.destroy({ where: { select: option.select }})

		return deletedOption
	}

	static async bulkCreate (options) {
		const newOptions = await Options.bulkCreate(options)

		return newOptions
	}
}

export default OptionDb