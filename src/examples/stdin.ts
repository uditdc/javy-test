import { InputProps, entyrMain } from '../lib/index'

import { AbiCoder } from 'ethers'

interface Arguments {
	n: number
	v: string
}

async function someValue(): Promise<number> {
	return new Promise((resolve) => {
		resolve(40)
	})
}

entyrMain(async (input: InputProps<Arguments>) => {
	console.log('\n Example: Stdin')

	const coder = AbiCoder.defaultAbiCoder()
	const coded = coder.encode(['string'], [input.args.v])

	return { nonce: 4 + (await someValue()), value: coded }
})
