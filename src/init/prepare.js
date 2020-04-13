import { logger } from '../utils/index.js'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { validateConfig } from '../validation/index.js'
import YAML from 'yaml'

const prepare = async ({ options, configFile }) => {
  try {
    const configValid = validateConfig(options)
    if (configValid) {
      const { source } = options

      const sourceDir = join(process.cwd(), source)
      if (!existsSync(sourceDir)) {
        mkdirSync(sourceDir, { recursive: true })
        logger('info', `init: source directory created`)
      } else {
        logger('warning', `init: source directory exists`)
      }

      const fullConfig = join(process.cwd(), configFile)
      if (!existsSync(fullConfig)) {
        writeFileSync(fullConfig, YAML.stringify(options))
        logger('info', `Project config and scaffolding created.`)
      } else {
        logger('warning', `${fullConfig} already exists. Not created.`)
      }
      return true
    } else {
      return false
    }
  } catch (error) {
    logger('error', `prepare: init project error - ${error}`)
    return false
  }
}

export default prepare
