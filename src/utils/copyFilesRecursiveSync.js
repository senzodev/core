import {
  existsSync,
  mkdirSync,
  lstatSync,
  writeFileSync,
  readFileSync
} from 'fs'
import { join, basename } from 'path'
import logger from './logger.js'

const copyFileSync = (source, target) => {
  // if target is a directory a new file with the same name will be created
  if (existsSync(target)) {
    if (lstatSync(target).isDirectory()) {
      target = join(target, basename(source))
    }
  }

  writeFileSync(target, readFileSync(source))
}

const mkdirRecurse = targetDir => {
  const parentDir = join(targetDir, '../')
  if (existsSync(parentDir)) {
    mkdirSync(targetDir)
  } else {
    if (parentDir == '/') {
      logger('error', 'copyFiles: Unable to create directory.')
    } else {
      mkdirRecurse(parentDir)
    }
  }
}

// files = [{source: '/source/file', dest: '/destination/file'}]

const copyFileRecursiveSync = files => {
  // copy

  files.forEach(function (file) {
    const { source, dest } = file
    const targetDir = dirname(dest)
    if (!existsSync(targetDir)) {
      mkdirRecurse(targetDir)
    }

    if (existsSync(source)) {
      copyFileSync(source, dest)
    }
  })
  return true
}

export default copyFileRecursiveSync
