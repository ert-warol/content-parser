// import { getDataFromHotline } from './product.service.js'
// import { sectionsPath } from '../utils/constants.js'
// import { MongoDb } from '../storeges/MongoDb.js'

// async function processingData (data) {
// 	try {
// 		const { section, quantity } = data
// 		const processedProducts = await getDataFromHotline({ path: sectionsPath[section], countOfProducts: quantity })
// 		const mongoDb = new MongoDb({ url: process.env.URL_MONGO_DB, nameDB: process.env.DB_NAME  })
// 		const saveToDatabase = await mongoDb.save(processedProducts.products)
//
// 		if (!saveToDatabase.acknowledged) {
// 			throw new Error (`Cannot save`)
// 		}
//
// 		return processedProducts
// 	} catch (err) {
// 	  console.error('An error occurred:', err)
//
// 		return []
// 	}
// }
//
// export { processingData }
