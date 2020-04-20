import { lstatSync, readdirSync } from 'fs'
import { join } from 'path'

const createIncludeFileArray = (source, excludeArray) => {
  let fileArray = []

  const dirArray = readdirSync(source)
  dirArray.forEach(file => {
    const curFile = join(source, file)
    if (lstatSync(curFile).isDirectory()) {
      fileArray = fileArray.concat(
        createIncludeFileArray(curFile, excludeArray)
      )
    } else {
      if (!excludeArray.includes(curFile)) {
        fileArray.push(curFile)
      }
    }
  })
  return fileArray
}

export default createIncludeFileArray
