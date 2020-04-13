import { rollup } from 'rollup'
import { mkdirSync, existsSync } from 'fs'
import {
  removeFolderRecursiveSync,
  logger,
  rollupDefault
} from '../../utils/index.js'

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

export default async ({ name, dist, input, output }, rollupConfig) => {
  //  console.log(output)
  logger('info', `bundle: Generating bundled function - ${name}`)
  let response = false
  try {
    if (removeFolderRecursiveSync(dist)) {
      mkdirSync(dist)
      mkdirSync(output)
    }

    if (existsSync(input)) {
      // bundle

      const inputOptions = await rollupDefault(rollupConfig, input)

      const outputOptions = {
        format: 'cjs',
        file: path.join(output, 'index.js')
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
