import logger from './logger.js'

const setpluginOptions = (pluginOptions, pluginDefault, pluginName) => {
  let response
  switch (typeof pluginOptions) {
    case 'undefined':
      response = pluginDefault
      break
    case 'boolean':
      response = pluginOptions ? resolveDefault : false
      break
    case 'object':
      response = Object.assign(pluginDefault, pluginOptions)
      break
    default:
      response = pluginDefault
  }
  return response
}

const pluginFactory = ({ pluginOptions, plugins, pluginFunctions }) => {
  const pluginArray = []
  if (typeof plugins === 'object') {
    for (let key in plugins) {
      if (plugins.hasOwnProperty(key)) {
        if (pluginOptions.hasOwnProperty(key)) {
          pluginOptions[key] = setpluginOptions(
            plugins[key],
            pluginOptions[key]
          )
        } else {
          logger('warning', `pluginFactory: ${key} is not a supported option`)
        }
      }
    }
  }

  for (let key in pluginFunctions) {
    if (pluginFunctions.hasOwnProperty(key)) {
      if (pluginOptions[key]) {
        const pluginFunction = pluginFunctions[key]
        pluginArray.push(pluginFunction(pluginOptions[key]))
      }
    }
  }
  return pluginArray
}

export default pluginFactory
