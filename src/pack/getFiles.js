import { readdirSync, lstatSync } from 'fs'
import { join } from 'path'
import { logger } from '../utils/index.js'

const getFiles = async rootFolder => {
  try {
    const dirContents = readdirSync(rootFolder)
    const fileList = []
    for (let i = 0; i < dirContents.length; i++) {
      const workingEntry = join(rootFolder, dirContents[i])
      const stat = lstatSync(workingEntry)
      if (stat.isDirectory()) {
        const files = await getFiles(workingEntry)
        for (let ii = 0; ii < files.length; ii++) {
          fileList.push(files[ii])
        }
      } else {
        fileList.push(workingEntry)
      }
    }
    return fileList
  } catch (error) {
    logger('error', `getFiles: ${error}`)
  }
}

export default getFiles
