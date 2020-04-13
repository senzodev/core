import { logger } from '../utils/index.js'
import config from './config.js'
import pack from '../pack/index.js'
import init from '../init/index.js'
import bundle from '../bundle/index.js'

const cli = async args => {
  try {
    const validCommands = ['pack', 'bundle', 'init']
    const command = args._[0] || null

    if (command) {
      if (validCommands.includes(command)) {
        if (command === 'init') {
          const flag = args.y ? true : false
          init(flag)
        } else {
          const configFile = args.config || args.c || 'senzo.yml'
          const source = args.source || args.s || 'src/'
          const distribution = args.dist || args.d || 'dist/'
          const options = await config(configFile)

          switch (command) {
            case 'bundle':
              bundle(options)
              break
            case 'pack':
              pack(options)
              break
            case 'deploy':
              logger('info', 'Deployment not supported at this time')
              break
          }
        }
      } else {
        logger('warn', `command: "${command}" not recognised`)
      }
    } else {
      logger('warn', `No command specified`)
    }
  } catch (error) {
    logger('error', `Error: ${error}`)
  }
}

export default cli
