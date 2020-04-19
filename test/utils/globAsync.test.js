import globAsync from '../../src/utils/globAsync.js'
import { join } from 'path'

const testGlobPattern = async () => {
  const pattern = 'test/sample/**/*.js'

  return globAsync(pattern)
}

const testGlobPath = async () => {
  const pattern = join(process.cwd(), 'test/sample/**/*.js')
  return globAsync(pattern)
}

const testRunner = async testFunction => {
  console.log(await testFunction())
}

testRunner(testGlobPattern)
testRunner(testGlobPath)
