import { existsSync, readdirSync } from 'fs'
import { logger } from '../utils/index.js'
import { join } from 'path'

const createManifestArray = async ({ source, name, include, exclude }) => {
  const manifestArray = []
  try {
    if (existsSync(join(source, 'index.js'))) {
      manifestArray.push({ source, name, include, exclude })
    } else {
      const rootArray = readdirSync(source, 'utf8')

      if (rootArray.length <= 0) {
        throw new Error(` '${source}' is an invalid root path`)
      }

      for (let i = 0; i < rootArray.length; i++) {
        const functionRoot = join(source, rootArray[i])

        if (existsSync(join(functionRoot, 'index.js'))) {
          manifestArray.push({
            source: functionRoot,
            name: rootArray[i],
            include,
            exclude
          })
        }
      }
    }
  } catch (error) {
    logger('error', `createManifest: Error ${error}`)
  }
  logger('info', `bundle: ${manifestArray.length} functions to be bundled.`)
  return manifestArray
}

const createManifest = async ({ source, name }) => {
  let manifestArray = []
  try {
    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        let manifestOptions = false
        if (typeof source[i] == 'string') {
          manifestOptions = {
            source: source[i],
            name,
            include: false,
            exclude: '**/*.js'
          }
        } else {
          if (source[i].path) {
            manifestOptions = {
              source: source[i].path,
              name: source[i].name ? source[i].name : name,
              include: source[i].include,
              exclude: source[i].exclude
            }
          }
        }
        if (manifestOptions) {
          manifestArray = manifestArray.concat(
            createManifestArray(manifestOptions)
          )
        }
      }
    } else {
      let manifestOptions = false
      if (typeof source == 'string') {
        manifestOptions = {
          source,
          name,
          include: false,
          exclude: '**/*.js'
        }
      } else {
        if (source.path) {
          manifestOptions = {
            source: source.path,
            name: source.name ? source.name : name,
            include: source.include,
            exclude: source.exclude
          }
        }
      }
      if (manifestOptions) {
        manifestArray = createManifestArray(manifestOptions)
      }
    }
    return manifestArray
  } catch (error) {
    logger('error', `createManifest: Error - ${error}`)
  }
}

export default createManifest
