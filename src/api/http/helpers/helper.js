const queries = {
	dashboardData: `SELECT 
	    MAX(price) AS max_price,
	    MIN(price) AS min_price,
	    FLOOR(AVG(price)) AS avg_price
		FROM 
		  announcements
		WHERE 
  		price > 0;`,
}

const isValidUrl = string => {
	try {
		new URL(string)
		return true
	} catch (err) {
		return false
	}
}

export { queries, isValidUrl }
