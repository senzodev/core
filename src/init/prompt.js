import readline from 'readline'
import { basename, join } from 'path'
import chalk from 'chalk'
import { logger } from '../utils'
import prepare from './prepare'

const prompt = () => {
  try {
    const currentDir = basename(process.cwd())

    let initOptions = {
      name: currentDir,
      functions: './src',
      dist: './dist'
    }

    let configFile = 'senzo.yml'

    console.log(
      chalk.blueBright(
        '********************************************************************************'
      )
    )

    console.log(
      chalk.blueBright(
        '****                        Init Senzo Project                              ****'
      )
    )

    console.log(
      chalk.blueBright(
        '****                                                                        ****'
      )
    )

    console.log(
      chalk.blueBright(
        '****    The component system to rapidly develop Serverless applications     ****'
      )
    )

    console.log(
      chalk.blueBright(
        '********************************************************************************'
      )
    )

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question(`Project Name (${currentDir}): `, answer => {
        if (answer.length > 0) {
            initOptions.name = answer
        }
        
    

    rl.question(`Source Code Location (${initOptions.functions}): `, answer => {
        if (answer.length > 0) {
            initOptions.functions = answer
        }
       
  

    rl.question(`Distribution Location (${initOptions.dist}): `, answer => {
        if (answer.length > 0) {
            initOptions.dist = answer
        }
        

    
    rl.question(`Configuration File Name (${configFile}): `, answer => {
    if (answer.length > 0) {
        configFile = answer
       }
      


    rl.question(
    `Do you want to create a project with this configuration (Y/n)? `,
        answer => {
        if (answer.length > 0) {
            if ((answer === 'n') | (answer === 'N')) {
            initOptions = null
            } else {
            prepare({ options: initOptions, configFile})
            }
        } else {
            prepare({ options: initOptions, configFile})
        }
        rl.close()
    })
})
})
})
})
    
    return { options: initOptions, configFile }
  } catch (error) {
    logger('error', `Initialisation aborted with errror: ${error}`)
    return false
  }
}

export default prompt
