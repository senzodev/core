import logger from './logger.js'

const setpluginOptions = (pluginOptions, pluginDefault) => {
  let response
  switch (typeof pluginOptions) {
    case 'undefined':
      response = pluginDefault
      break
    case 'boolean':
      response = pluginOptions ? pluginDefault : false
      break
    case 'object':
      if (pluginDefault) {
        response = Object.assign(pluginDefault, pluginOptions)
      } else {
        response = pluginOptions
      }

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
        if (typeof pluginFunction === 'function') {
          pluginArray.push(pluginFunction(pluginOptions[key]))
        } else {
          logger(
            'warning',
            `pluginFactory: ${key} does not reference a valid function`
          )
        }
      }
    }
  }
  return pluginArray
}

export default pluginFactory
