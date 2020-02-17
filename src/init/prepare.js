import { logger } from '../utils'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { validateConfig } from '../validation'
import YAML from 'yaml'

const prepare = ({ options, configFile }) => {
  try {
    const configValid = validateConfig(options)
    if (configValid) {
        const { functions } = options

        const functionsDir = join(process.cwd(), functions)
        if (!existsSync(functionsDir)) {
        mkdirSync(functionsDir, {recursive: true})
        logger('info', `init: Functions directory created`)
        } else {
        logger('warning', `init: Functions directory exists`)
        }

        const fullConfig = join(process.cwd(), configFile)
        if (!existsSync(fullConfig)) {
        writeFileSync(fullConfig, YAML.stringify(options))
        } else {
        logger('error', `${fullConfig} already exists.`)
        }

        logger('info', `Project config and scaffolding created.`)
        return true
    } else {
        return false
    }
    
  } catch (error) {
    logger('error', `init project error: ${error}`)
    return false
  }
}

export default prepare
