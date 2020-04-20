import { rollup } from 'rollup'
import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import {
  removeFolderRecursiveSync,
  logger,
  rollupDefault
} from '../utils/index.js'

async function build (inputOptions, outputOptions) {
  try {
    // create a bundle
    const bundle = await rollup(inputOptions)
    // generate code
    // write bundled code
    await bundle.write(outputOptions)

    return true
  } catch (error) {
    logger('error', `bundle/build: ${error}`)
    return false
  }
}

export default async ({ name, dist, source }, rollupConfig) => {
  //  console.log(output)
  logger('info', `bundle: Generating bundled function - ${name}`)
  let response = false
  try {
    const output = join(dist, name)

    if (existsSync(source)) {
      // bundle

      const inputOptions = await rollupDefault(rollupConfig, source)

      const outputOptions = {
        format: 'cjs',
        file: join(output, 'index.js')
      }

      response = build(inputOptions, outputOptions)
    } else {
      logger('error', `bundle: Entry point '${input}' does not exist`)
    }
  } catch (error) {
    logger('error', `bundle: ${error}`)
    response = false
  }
  return response
}
