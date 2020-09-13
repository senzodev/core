import logger from './logger.js'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import babelModule from '@rollup/plugin-babel/dist/index.js'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import pluginFactory from './rollupPluginFactory.js'

const babel = babelModule.getBabelOutputPlugin
const resolve = nodeResolve.nodeResolve

const setArrayOptions = async (arrayOption, arrayDefault) => {
  if (arrayOption) {
    if (Array.isArray(arrayOption)) {
      return arrayOption
    } else {
      return arrayDefault
    }
  } else {
    return arrayDefault
  }
}

const bundleOptions = async (rollupOptions, input) => {
  try {
    const pluginOptions = {
      replace: false,
      resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.mjs', '.js', '.json'],
        preferBuiltins: true
      },
      json: {
        preferConst: true
      },
      commonjs: {},
      babel: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: '12'
              }
            }
          ]
        ],
        plugins: ['@babel/plugin-syntax-import-meta']
      },
      terser: {}
    }

    const pluginFunctions = {
      replace,
      resolve,
      commonjs,
      json,
      babel,
      terser
    }

    const plugins = rollupOptions
      ? 'plugins' in rollupOptions
        ? rollupOptions.plugins
        : false
      : false

    const pluginArray = pluginFactory({
      pluginOptions,
      plugins,
      pluginFunctions
    })

    let externalOptions = [
      'stream',
      'url',
      'http',
      'https',
      'crypto',
      'buffer',
      'zlib'
    ]
    let warningOptions = ['CIRCULAR_DEPENDENCY']
    if (rollupOptions) {
      externalOptions = await setArrayOptions(
        rollupOptions.external,
        externalOptions
      )
      warningOptions = await setArrayOptions(
        rollupOptions.warning,
        warningOptions
      )
    }

    const inputOptions = {
      input,
      external: externalOptions,
      plugins: pluginArray,
      onwarn (warning, warn) {
        if (Array.isArray(warningOptions)) {
          if (warningOptions.includes(warning.code)) {
            return
          }
        }
        warn(warning)
      }
    }

    return inputOptions
  } catch (error) {
    logger(
      'error',
      `rollupDefault: ${error.name}\n${error.message}\n${error.stack}`
    )
  }
}

export default bundleOptions
