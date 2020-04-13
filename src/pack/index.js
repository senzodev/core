import { logger } from '../utils/index.js'

const initProject = () => {
  try {
    return prompt()
  } catch (error) {
    logger('error', `Unable to initialise project with error: ${error}`)
  }
}

export default initProject
