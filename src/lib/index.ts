import { readInput, writeOutput } from './stdin'

export interface InputProps<T> {
	args: T
}

export async function entyrMain(
	cb: (input: InputProps<unknown>) => Promise<object>
): Promise<void> {
	const input = readInput()
	const result = await cb(input)
	writeOutput(result)
}

// Remove
export function fetchGet(url: string) {
	Javy.FetchIO.get(url)
}
