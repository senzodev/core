import { validateConfig } from '../../validation/index.js'
import getConfigPath from './getConfigPath.js'
import { logger } from '../../utils/index.js'
import { readFileSync } from 'fs'
import { basename, join } from 'path'
import YAML from 'yaml'

const buildConfig = async (configFile, configOverride) => {
  let config = false
  try {
    const { name, source, distribution } = configOverride
    const currentDir = basename(process.cwd())
    const defaultConfig = {
      name: currentDir,
      source: 'src/',
      dist: 'dist/'
    }

    const configPath = await getConfigPath(configFile)

    if (configPath) {
      const configString = readFileSync(configPath, 'utf8')
      try {
        config = YAML.parse(configString)
        Object.assign(defaultConfig, config)
        if (Array.isArray(config.source)) {
          config.source = config.source.map(item => {
            return {
              name: item.name ? item.name : config.name,
              path: join(process.cwd(), item.path),
              include: item.include,
              exclude: item.exclude
            }
          })
        } else {
          config.source = join(process.cwd(), config.source)
        }
        config.dist = join(process.cwd(), config.dist)
      } catch (error) {
        logger(
          'warning',
          `parseYAML: Unable to parse YAML in config file. Using default values. \n\rError - ${error}`
        )
        config = defaultConfig
      }

      if (!validateConfig(config)) {
        if (config.source != 'src/') {
          config = {
            name: currentDir,
            source: join(process.cwd(), 'src/'),
            dist: join(process.cwd(), 'dist/')
          }
        } else {
          config = false
        }
      }
    } else {
      config = {
        name: currentDir,
        source: join(process.cwd(), 'src/'),
        dist: join(process.cwd(), 'dist/')
      }
    }

    if (source && config) {
      config.source = source
    }

    if (distribution && config) {
      config.dist = distribution
    }

    if (name && config) {
      config.name = name
    }
  } catch (error) {
    logger(
      'Error',
      `getConfig: Unable to get configuration. \n\rError - ${error}`
    )
  }
  return config
}

export default buildConfig
