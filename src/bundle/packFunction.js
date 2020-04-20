import archiver from 'archiver'
import { logger } from '../utils/index.js'
import { createWriteStream, lstatSync } from 'fs'
import { normalize, join } from 'path'
import getFiles from './getFiles.js'

const archivePromise = (fileList, source, archiveName) => {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    const outputFile = createWriteStream(archiveName)

    archive.on('ready', function () {
      logger(`info`, `pack: Creating ${name}.zip`)
    })

    archive.on('error', function (error) {
      logger('error', `pack: ${error}`)
      reject(error)
    })

    archive.on('warning', function (error) {
      if (err.code === 'ENOENT') {
        logger('warn', `createArchive: ${error}`)
      } else {
        logger('error', `createArchive: ${error}`)
        reject(error)
      }
    })

    // pipe archive data to the file
    archive.pipe(outputFile)

    const rootLength = source.length + 1

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

    outputFile.on('close', function () {
      resolve(archive.pointer())
    })
  })
}

const createArchive = async (dist, name) => {
  let result = false
  try {
    const normalizedSourceDir = normalize(join(dist, name))
    const fileList = await getFiles(normalizedSourceDir)
    const archiveName = join(dist, `${name}.zip`)
    const bytesArchived = await archivePromise(
      fileList,
      normalizedSourceDir,
      archiveName
    )
    if (bytesArchived) {
      logger(`info`, `pack: ${bytesArchived} total bytes zipped to ${name}.zip`)
      result = true
    }
  } catch (error) {
    logger('error', `pack: ${error}`)
    result = false
  }
  return result
}

export default createArchive
