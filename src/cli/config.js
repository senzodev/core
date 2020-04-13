import { validateConfig } from '../validation/index.js'
import { readFileSync } from 'fs'

const buildConfig = async configFile => {
  if (validateConfig(config)) {
    const options = configFile ? await config(configFile) : await config('')

    if (schema) {
      options.schema = schema
    }

    if (resolvers) {
      options.resolvers = resolvers
    }

    if (functions) {
      options.providers = functions
    }

    return options
  } else {
    return false
  }
}

export default buildConfig
