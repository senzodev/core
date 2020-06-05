import {
  existsSync,
  mkdirSync,
  lstatSync,
  writeFileSync,
  readFileSync
} from 'fs'
import { join, basename, dirname } from 'path'
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

// files = [{source: '/source/file', dest: '/destination/file'}]

const copyFileRecursiveSync = files => {
  // copy

  for (let i = 0; i < files.length; i++) {
    const { source, dest } = files[i]
    const targetDir = dirname(dest)
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true })
    }

    if (existsSync(source)) {
      if (!lstatSync(source).isDirectory()) {
        copyFileSync(source, dest)
      }
    }
  }
  return true
}

export default copyFileRecursiveSync
