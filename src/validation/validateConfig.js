import { existsSync } from 'fs'

const validateConfig = (options) => {
  const { functions } = options
  if (functions) {
    if (!existsSync(functions)) {
      throw new Error(`Function location: ${functions} does not exist`)
    }
  }

  return true
}

export default validateConfig