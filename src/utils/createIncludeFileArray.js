import { lstatSync, readdirSync } from 'fs'
import { dirname } from 'path'

const createIncludeFileArray = (source, excludeArray) => {
  let fileArray = []

  const sourceDir = dirname(source)

  const dirArray = readdirSync(sourceDir)
  dirArray.forEach(file => {
    if (lstatSync(file).isDirectory()) {
      fileArray = fileArray.concat(createIncludeFileArray(file))
    } else {
      if (!excludeArray.include(file)) {
        fileArray.push(file)
      }
    }
  })
  return fileArray
}

export default createIncludeFileArray
