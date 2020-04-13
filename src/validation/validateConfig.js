import { existsSync } from 'fs'
import { logger } from '../utils/index.js'

const validateConfig = options => {
  let response = true
  try {
    const { source } = options
    if (source) {
      if (!existsSync(source)) {
        throw new Error(`Source location '${source}' does not exist`)
      }
    }
  } catch (error) {
    logger('error', `Config Validation Error: ${error}`)
    response = false
  }

  return response
}

export default validateConfig
