import { keccak256 } from 'viem'
import { generatePrivateKey } from 'viem/accounts'
;(async () => {
	try {
		console.log('generatePrivateKey', generatePrivateKey())
		console.log(keccak256('0xdeadbeef'))
	} catch (error) {
		console.log(error.toString())
	}

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
