import test from 'ava'
import copyFunction from '../../src/bundle/copyFunction.js'

const complexCopy = {
  source: './test/sample/src/function',
  name: 'testFunction',
  include: ['node_modules/**/*', 'package.json', '.test.config.file.js'],
  exclude: '**/*.js',
  dist: 'test/sample/dist'
}

const simpleCopy = {
  source: './test/sample/src/function',
  name: 'testFunction2',
  include: '**/*',
  exclude: '**/*.js',
  dist: 'test/sample/dist'
}

test('copyFunction complex', async t => {
  const response = await copyFunction(complexCopy)
  t.truthy(response)
})

test('copyFunction simple', async t => {
  const response = await copyFunction(simpleCopy)
  t.truthy(response)
})
