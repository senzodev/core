import test from 'ava'
import { join } from 'path'
import createCopyArray from '../../src/utils/createCopyArray.js'

test('createCopyArray Test', t => {
  const inputArray = [join(process.cwd(), './test/sample/function/index.js')]
  const source = join(process.cwd(), './test/sample/')
  const dest = join(process.cwd(), './dest/')
  const expectedResult = [
    {
      source: join(process.cwd(), './test/sample/function/index.js'),
      dest: join(process.cwd(), './dest/function/index.js')
    }
  ]
  const copyArrayResult = createCopyArray(source, inputArray, dest)
  t.deepEqual(copyArrayResult, expectedResult, 'message')
})
