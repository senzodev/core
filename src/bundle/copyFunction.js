import {
  logger,
  globAsync,
  globAsyncArray,
  createCopyArray,
  copyFilesRecursiveSync,
  createIncludeFileArray
} from '../utils/index.js'
import { existsSync } from 'fs'
import { join } from 'path'

export default async ({ name, dist, source, include, exclude }) => {
  //  console.log(output)
  // logger('info', `bundle: Copying function - ${name}`)
  let response = false
  try {
    const output = join(dist, name)

    let copyArray = []

    if (existsSync(source)) {
      if (include) {
        let includeSource
        if (Array.isArray(include)) {
          includeSource = await globAsyncArray(source, include)
        } else {
          const includeFullPath = join(source, include)
          includeSource = await globAsync(includeFullPath)
        }
        copyArray = createCopyArray(source, includeSource, output)
        response = copyFilesRecursiveSync(copyArray)
      } else {
        if (exclude) {
          let excludeSource
          if (Array.isArray(exclude)) {
            excludeSource = await globAsyncArray(source, exclude)
          } else {
            const excludeFullPath = join(source, exclude)
            excludeSource = await globAsync(excludeFullPath)
          }
          const includeArray = createIncludeFileArray(source, excludeSource)
          if (includeArray.length > 0) {
            copyArray = createCopyArray(source, includeArray, output)
          }
        }
      }
      if (copyArray.length > 0) {
        response = copyFilesRecursiveSync(copyArray)
        if (response) {
          logger('info', `copy: ${name} - ${copyArray.length} files copied `)
        }
      } else {
        logger('info', `copy: ${name} - No files to be copied`)
        response = true
      }
    } else {
      logger('warning', `copy: Function location '${source}' does not exist`)
    }
  } catch (error) {
    logger('error', `copyFunction: ${error}`)
    response = false
  }
  return response
}
