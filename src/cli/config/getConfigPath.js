import { join } from 'path'
import { existsSync } from 'fs'
import { logger } from '../../utils/index.js'

const getConfigPath = async configFile => {
  let response = false
  try {
    if (configFile) {
      const configPath = join(process.cwd(), configFile)
      if (existsSync(configPath)) {
        response = configPath
      } else {
        logger(
          'warning',
          `getPath: '${configFile}' is an invalid configuration file path. File does not exist. Using default values`
        )
      }
    }
  } catch (error) {
    logger(
      'error',
      `getPath: Unable to get configuration file path. Using default values. \n\r Error - ${error}`
    )
    response = false
  }
  return response
}

export default getConfigPath
