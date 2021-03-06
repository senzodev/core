import globAsync from './globAsync.js'
import { join } from 'path'

const globAsyncArray = async (rootDir, patternArray, options) => {
  let files = []

  for (let i = 0; i < patternArray.length; i++) {
    const globPattern = join(rootDir, patternArray[i])
    files = files.concat(await globAsync(globPattern, options))
  }

  return files
}

export default globAsyncArray
