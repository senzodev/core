import createManifest from './createManifest.js'
import bundleFunction from './bundleFunction.js'
import packFunction from './packFunction.js'
import { logger, removeFolderRecursiveSync } from '../utils/index.js'
import { mkdirSync } from 'fs'
import copyFunction from './copyFunction.js'

const bundle = async options => {
  let response = false
  try {
    const { name, source, dist, noBundle, zip } = options
    const zipFunction = typeof zip == 'undefined' ? true : zip
    const manifest = await createManifest({ source, name })
    const bundleSuccess = []

    if (removeFolderRecursiveSync(dist)) {
      mkdirSync(dist)
    }

    if (manifest.length > 0) {
      for (let i = 0; i < manifest.length; i++) {
        // console.log(manifest[i])
        const bundleOptions = {
          name: manifest[i].name,
          source: manifest[i].source,
          dist,
          include: manifest[i].include,
          exclude: manifest[i].exclude
        }
        let bundleResponse = false

        if (noBundle) {
          bundleResponse = await copyFunction(bundleOptions)
        } else {
          bundleResponse = await bundleFunction(bundleOptions)
          if (bundleResponse) {
            bundleResponse = await copyFunction(bundleOptions)
          }
        }

        if (bundleResponse) {
          bundleSuccess.push(bundleOptions)
        } else {
          logger(
            'warning',
            `bundle: Unable to bundle function ${name} at ${source} to ${dist}`
          )
        }
      }

      if (bundleSuccess.length > 0 && zipFunction) {
        for (let i = 0; i < bundleSuccess.length; i++) {
          bundleSuccess[i]['zip'] = await packFunction(
            bundleSuccess[i].dist,
            bundleSuccess[i].name
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
