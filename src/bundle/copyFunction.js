import {
  logger,
  removeFolderRecursiveSync,
  globAsync,
  globAsyncArray,
  createCopyArray,
  copyFilesRecursiveSync
} from '../utils/index.js'
import { mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'

export default async ({ name, dist, source, include, exclude }) => {
  //  console.log(output)
  logger('info', `bundle: Copying function - ${name}`)
  let response = false
  try {
    const output = join(dist, name)

    if (removeFolderRecursiveSync(output)) {
      mkdirSync(output)
    }

    let copyArray = []

    if (existsSync(source)) {
      if (include) {
        let includeSource
        if (Array.isArray(include)) {
          includeSource = await globAsyncArray(source, include)
        } else {
          const includeFullPath = join(dirname(source), include)
          includeSource = await globAsync(includeFullPath)
        }
        copyArray = createCopyArray(source, includeSource, dist)
        response = copyFilesRecursiveSync(copyArray)
      } else {
        if (exclude) {
          let excludeSource
          if (Array.isArray(exclude)) {
            excludeSource = await globAsyncArray(source, exclude)
          } else {
            const excludeFullPath = join(dirname(source), exclude)
            excludeSource = await globAsync(excludeFullPath)
          }
          const includeArray = createIncludeFileArray(source, excludeSource)
          copyArray = createCopyArray(source, includeArray, dist)
        }
      }
      if (copyArray.length > 0) {
        response = copyFilesRecursiveSync(copyArray)
        if (response) {
          logger('info', `copy: ${name} - ${copyArray.length} files copied `)
        }
      }
    } else {
      logger('warning', `bundle: Function location '${source}' does not exist`)
    }
  } catch (error) {
    logger('error', `bundle: ${error}`)
    response = false
  }
  return response
}
