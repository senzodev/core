import { existsSync, readdirSync } from 'fs'
import { logger } from '../utils/index.js'
import { join } from 'path'

const createManifest = async ({ source, name }) => {
  const manifestArray = []
  try {
    if (existsSync(join(source, 'index.js'))) {
      manifestArray.push({ source, name })
    } else {
      const rootArray = readdirSync(source, 'utf8')

      if (rootArray.length <= 0) {
        throw new Error(` '${source}' is an invalid root path`)
      }

      for (let i = 0; i < rootArray.length; i++) {
        const functionRoot = `${source}/${rootArray[i]}`

        if (existsSync(join(functionRoot, 'index.js'))) {
          manifestArray.push({ source: functionRoot, name: rootArray[i] })
        }
      }
    }
  } catch (error) {
    logger('error', `createManifest: Error ${error}`)
  }
  logger('info', `bundle: ${manifestArray.length} functions to be bundled.`)
  return manifestArray
}

export default createManifest
