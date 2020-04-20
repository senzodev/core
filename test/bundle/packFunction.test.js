import test from 'ava'
import { join } from 'path'
import { existsSync, unlinkSync } from 'fs'
import packFunction from '../../src/bundle/packFunction.js'

test('packFunction', async t => {
  const functionDist = join(process.cwd(), './test/sample/src')
  const functionName = 'anotherFunction'
  const packResult = await packFunction(functionDist, functionName)
  const expectedZipLocation = join(functionDist, `${functionName}.zip`)
  t.true(packResult, 'packFunction completed successfully')
  t.true(existsSync(expectedZipLocation, 'zip created where expected'))
  unlinkSync(expectedZipLocation)
})
