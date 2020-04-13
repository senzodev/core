import prompt from './prompt'
import { logger } from '../utils'

const init = () => {
  let response = false
  try {
    prompt()
    response = true
  } catch (error) {
    logger('error', `Unable to initialise project with error: ${error}`)
  }
  return true
}

export default init
