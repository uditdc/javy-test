import { InputProps } from '.'

// Read input from stdin
export function readInput(): InputProps<unknown> {
	const chunkSize = 1024
	const inputChunks = []
	let totalBytes = 0

	// Read all the available bytes
	while (true) {
		const buffer = new Uint8Array(chunkSize)
		// Stdin file descriptor
		const fd = 0
		const bytesRead = Javy.IO.readSync(fd, buffer)

		totalBytes += bytesRead
		if (bytesRead === 0) {
			break
		}
		inputChunks.push(buffer.subarray(0, bytesRead))
	}

	// Assemble input into a single Uint8Array
	const { finalBuffer } = inputChunks.reduce(
		(context, chunk) => {
			context.finalBuffer.set(chunk, context.bufferOffset)
			context.bufferOffset += chunk.length
			return context
		},
		{ bufferOffset: 0, finalBuffer: new Uint8Array(totalBytes) }
	)

	let args = {}

	try {
		args = JSON.parse(new TextDecoder().decode(finalBuffer))
	} catch {}

	return {
		args
	}
}

// Write output to stdout
export function writeOutput(output: object): void {
	const encodedOutput = new TextEncoder().encode(JSON.stringify(output))
	const buffer = new Uint8Array(encodedOutput)
	// Stdout file descriptor
	const fd = 2
	Javy.IO.writeSync(fd, buffer)
}
