import * as esbuild from 'esbuild'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, unlinkSync } from 'fs'
import ora from 'ora'

// Function to check if a directory exists, and create it if not
const ensureDirectoryExists = (directory) => {
	if (!existsSync(directory)) {
		mkdirSync(directory, { recursive: true })
	}
}

// Build Configuration
const buildConfig = {
	entryPoints: ['src/examples/fetch.ts'],
	bundle: true,
	platform: 'browser',
	format: 'esm',
	outfile: './build/index.js'
}

// Loading indicator for build process
const buildSpinner = ora('Building...').start()

try {
	// Build Step
	ensureDirectoryExists('./build')
	await esbuild.build(buildConfig)
	buildSpinner.succeed('Build completed successfully.')

	const javySpinner = ora('Building WASM...').start()
	// Compile to WebAssembly
	execSync('javy compile ./build/index.js -o ./build/index.wasm')
	javySpinner.succeed('Build WASM completed successfully.')

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
