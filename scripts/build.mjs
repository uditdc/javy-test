import * as esbuild from 'esbuild'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import ora from 'ora'

// Build Configuration
const buildConfig = {
	entryPoints: ['src/examples/fetch.ts'],
	bundle: true,
	platform: 'browser',
	format: 'esm',
	outfile: './build/index.js',
	alias: {
		crypto: './src/lib/crypto.js'
	}
}

// Loading indicator for build process
const buildSpinner = ora('Building JS ...').start()

// Build Step
try {
	// Create directory if does not exist
	if (!existsSync('./build')) {
		mkdirSync('./build', { recursive: true })
	}

	await esbuild.build(buildConfig)
	buildSpinner.succeed('JS built successfully.')

	const javySpinner = ora('Building WASM ...').start()
	// Compile to WebAssembly
	execSync('javy compile ./build/index.js -o ./build/index.wasm')
	javySpinner.succeed('WASM built successfully.')

	// // Clean Up: Delete index.js file
	// const indexPath = './build/index.js';
	// if (existsSync(indexPath)) {
	//   unlinkSync(indexPath);
	//   console.log('Deleted index.js file after build.');
	// } else {
	//   console.warn('index.js file not found. Unable to delete.');
	// }
} catch (error) {
	buildSpinner.fail('Build failed.')
	console.error(error)
}
