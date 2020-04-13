import { dirname } from 'path'
import { fileURLToPath } from 'url'

const getPath = importMeta => {
  const currPathname = new URL(importMeta)
  return fileURLToPath(currPathname)
}

export default getPath
