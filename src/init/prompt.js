import readline from 'readline'
import chalk from 'chalk'
import { logger } from '../utils/index.js'

const prompt = (initOptions, configFile) => {
  return new Promise((resolve, reject) => {
    let response = false
    try {
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

      rl.question(`Project Name (${initOptions.name}): `, answer => {
        if (answer.length > 0) {
          initOptions.name = answer
        }

        rl.question(
          `Source Code Location (${initOptions.source}): `,
          answer => {
            if (answer.length > 0) {
              initOptions.source = answer
            }

            rl.question(
              `Distribution Location (${initOptions.dist}): `,
              answer => {
                if (answer.length > 0) {
                  initOptions.dist = answer
                }

                rl.question(
                  `Configuration File Name (${configFile}): `,
                  answer => {
                    if (answer.length > 0) {
                      configFile = answer
                    }

                    rl.question(
                      `Do you want to create a project with this configuration (Y/n)? `,
                      answer => {
                        if (answer.length > 0) {
                          if ((answer === 'n') | (answer === 'N')) {
                            response = false
                          } else {
                            response = { options: initOptions, configFile }
                          }
                        } else {
                          response = { options: initOptions, configFile }
                        }
                        rl.close()
                      }
                    )
                  }
                )
              }
            )
          }
        )
      })

      rl.on('close', () => {
        resolve(response)
      })
    } catch (error) {
      logger('error', `prompt: init project error - ${error}`)
      reject(false)
    }
  })
}

export default prompt
