import { readdirSync } from 'fs'
import { join } from 'path'

const handler = async event => {
  console.log(`this is a test event: ${event}`)
  const location = readdirSync(join(process.cwd(), '/src'))
  console.log(location)
  return event
}

export { handler }
