import createManifest from './createManifest.js'
import bundleFunction from './bundleFunction.js'
import { logger, removeFolderRecursiveSync } from '../utils/index.js'
import { mkdirSync } from 'fs'

const bundle = async options => {
  let response = false
  try {
    const { name, source, dist } = options
    const manifest = await createManifest({ source, name })
    const bundleSuccess = []
    if (removeFolderRecursiveSync(dist)) {
      mkdirSync(dist)
    }

    if (manifest.length > 0) {
      for (let i = 0; i < manifest.length; i++) {
        const bundleOptions = {
          name: manifest[i].name,
          source: manifest[i].source,
          dist
        }
        const bundleResponse = await bundleFunction(bundleOptions)
        if (bundleResponse) {
          bundleSuccess.push(bundleOptions)
        } else {
          logger(
            'warning',
            `bundle: Unable to bundle function ${name} at ${source} to ${dist}`
          )
        }
      }
    } else {
      logger('warning', 'bundle: No functions to bundle')
    }

    if (bundleSuccess.length == manifest.length) {
      response = bundleSuccess
    } else {
      response = false
    }
  } catch (error) {
    logger('error', `bundle: Error - ${error}`)
    response = false
  }
  return response
}

export default bundle
