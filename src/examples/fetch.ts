// Import the fetch polyfill
import fetch from '../lib/fetch'

;(async () => {
	try {
		const response = await fetch('https://reqres.in/api/products/1', {
			method: 'GET'
		})
		const json = await response.json()

		console.log(JSON.stringify(json))
	} catch (error) {
		console.error('Failed to call function')
	}
})()
