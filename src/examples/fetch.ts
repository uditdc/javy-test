async function fetchOne() {
	try {
		const response = await fetch('https://reqres.in/api/products/1', {
			method: 'GET'
		})

		const json = await response.json()

		console.log('Products ', JSON.stringify(json))
	} catch (error) {
		console.error('Failed to call function')
	}

}

async function fetchTwo() {
	try {
		const response = await fetch('https://reqres.in/api/products/2', {
			method: 'GET'
		})

		const json = await response.json()

		console.log('Products ', JSON.stringify(json))
	} catch (error) {
		console.error('Failed to call function')
	}

}

;(async () => {
	console.log('start wasm from Javy')
	
	console.log('1')
	fetchOne()

	console.log('2')
	await fetchTwo()

	console.log('end wasm')
})()
