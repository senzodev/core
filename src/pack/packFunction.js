import archiver from 'archiver'
import { logger } from '../utils/index.js'
import { createWriteStream, lstatSync } from 'fs'
import { normalize, join } from 'path'
import getFiles from './getFiles.js'

const createArchive = async (dist, name) => {
  let result = false
  try {
    const normalizedSourceDir = normalize(dist)
    const fileList = await getFiles(normalizedSourceDir)

    const archive = archiver('zip', {
      zlib: { level: 9 }
    })
    const archiveName = join(dist, `${name}.zip`)

    const outputFile = createWriteStream(archiveName)

    outputFile.on('close', function () {
      logger(
        `info`,
        `pack: ${archive.pointer()} total bytes zipped to ${name}.zip`
      )
      result = true
    })

    archive.on('ready', function () {
      logger(`info`, `pack: Creating ${name}.zip`)
    })

    archive.on('error', function (err) {
      logger('error', `pack: ${err}`)
      throw err
    })

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        logger('warn', `createArchive: ${err}`)
      } else {
        logger('error', `createArchive: ${err}`)
        throw err
      }
    })

    // pipe archive data to the file
    archive.pipe(outputFile)

    const rootLength = normalizedSourceDir.length + 1

    for (let i = 0; i < fileList.length; i++) {
      const fileName = fileList[i].slice(rootLength)
      const stat = lstatSync(fileList[i])
      if (stat.isDirectory()) {
        archive.directory(fileList[i], fileName)
      } else {
        archive.file(fileList[i], { name: fileName })
      }
    }

    archive.finalize()
  } catch (error) {
    result = false
  }
  return result
}

export default createArchive
