#!/usr/bin/env node
'use strict'

import minimist from 'minimist'
import cli from '../src/cli/index.js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { getPath } from '../src/utils/index.js'

const currDir = dirname(getPath(import.meta.url))

const pkgFile = readFileSync(join(currDir, '../package.json'), 'utf8')

const { version } = JSON.parse(pkgFile)

const command = minimist(process.argv.slice(2))

if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
  // console.log(`\n${help.replace('__VERSION__', version)}\n`)
} else if (command.version) {
  console.log(`senzo v${version}`)
} else {
  cli(command)
}
