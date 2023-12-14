;(async () => {
	try {
		const response = await fetch('https://reqres.in/api/products', {
			method: 'GET'
		})

		const json = await response.json()

		console.log('Products ', JSON.stringify(json))
	} catch (error) {
		console.error('Failed to call function')
	}
})()
