import test from 'ava'
import init from '../../src/init/index.js'
import { unlinkSync } from 'fs'
import { join } from 'path'

test.beforeEach(async t => {
  // delete senzo.yml file before each test
  unlinkSync(join(process.cwd(), 'senzo.yml'))
})

test('initDefault', async t => {
  const initResponse = await init(true)
  t.true(initResponse, 'Initialise project with default values successful')
})
