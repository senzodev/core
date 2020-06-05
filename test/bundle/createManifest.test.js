import test from 'ava'
import createManifest from '../../src/bundle/createManifest.js'

const sampleSimple = {
  source: './test/sample/src',
  name: 'testSimple'
}

const resultSimple = [
  {
    source: 'test/sample/src/anotherFunction',
    name: 'anotherFunction',
    include: false,
    exclude: '**/*.js'
  },
  {
    source: 'test/sample/src/function',
    name: 'function',
    include: false,
    exclude: '**/*.js'
  }
]

const sampleComplex = {
  source: [
    {
      path: './test/sample/src/function',
      name: 'testFunction',
      include: ['node_modules/**/*', 'package.json'],
      exclude: '**/*.js'
    },
    {
      path: './test/sample/src/anotherFunction',
      name: 'testFunction2'
    }
  ],
  name: 'testComplex'
}

const resultComplex = [
  {
    source: './test/sample/src/function',
    name: 'testFunction',
    include: ['node_modules/**/*', 'package.json'],
    exclude: '**/*.js'
  },
  {
    source: './test/sample/src/anotherFunction',
    name: 'testFunction2',
    include: undefined,
    exclude: undefined
  }
]

test('createManifest Simple', t => {
  const manifest = createManifest(sampleSimple)

  t.deepEqual(manifest, resultSimple)
})

test('createManifest Complex', t => {
  const manifest = createManifest(sampleComplex)

  t.deepEqual(manifest, resultComplex)
})
