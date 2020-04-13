import { existsSync, readdirSync } from 'fs'
import { logger } from '../utils/index.js'

const createManifest = async source => {
  const manifestArray = []
  try {
    if (existsSync(join(source, 'index.js'))) {
      manifestArray.push(source)
    } else {
      const rootArray = readdirSync(source)

      if (rootArray.length <= 0) {
        throw new Error(` '${source}' is an invalid root path`)
      }

      for (let i = 0; i < rootArray.length; i++) {
        const functionRoot = `${source}/${rootArray[i]}`

        if (existsSync(join(functionRoot, 'index.js'))) {
          manifestArray.push(functionRoot)
        }
      }
    }
  } catch (error) {
    logger('error', `createManifest Error: ${error}`)
  }
  logger('info', `bundle: ${manifestArray.length} functions to be bundled.`)
  return manifestArray
}

export default createManifest
