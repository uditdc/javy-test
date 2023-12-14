import { keccak256 } from 'viem'
import { generatePrivateKey } from 'viem/accounts'
import { getRandomValues } from 'crypto'
;(async () => {
	try {
		console.log('generatePrivateKey', generatePrivateKey())
		console.log(
			'getRandomValues',
			getRandomValues(new Uint8Array(32)).toString()
		)
		console.log(keccak256('0x'))
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
