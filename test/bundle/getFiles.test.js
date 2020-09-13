import test from 'ava'
import { join } from 'path'
import getFiles from '../../src/bundle/getFiles.js'

test('bundle: getFiles', async t => {
  const testDirectory = join(process.cwd(), './test/sample/src/function')
  const expectedFileList = [
    join(process.cwd(), './test/sample/src/function/index.js'),
    join(process.cwd(), './test/sample/src/function/package.json')
  ]
  const returnedFileList = await getFiles(testDirectory)
  t.deepEqual(returnedFileList, expectedFileList)
})
