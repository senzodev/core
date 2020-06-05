import test from 'ava'
import globAsync from '../../src/utils/globAsync.js'

test('test globAsync', async t => {
  const pattern = 'test/sample/src/**/*.js'
  const expectedResult = [
    'test/sample/src/anotherFunction/index.js',
    'test/sample/src/function/index.js'
  ]
  const testValue = await globAsync(pattern)
  t.deepEqual(testValue, expectedResult, 'message')
})
