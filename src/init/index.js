import prompt from './prompt.js'
import prepare from './prepare.js'
import { basename } from 'path'
import { logger } from '../utils/index.js'

const init = async flag => {
  let response = false

  try {
    const currentDir = basename(process.cwd())
    let initOptions = {
      name: currentDir,
      source: 'src/',
      dist: 'dist/'
    }
    let configFile = 'senzo.yml'

    if (flag) {
      prepare({ options: initOptions, configFile })
    } else {
      const promptResponse = await prompt(initOptions, configFile)
      if (promptResponse) {
        prepare(promptResponse)
      }
    }
    response = true
  } catch (error) {
    logger('error', `Unable to initialise project with error: ${error}`)
  }
  return response
}

export default init
