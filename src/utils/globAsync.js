import glob from 'glob'

const globAsync = (pattern, options) => {
  return new Promise((resolve, reject) => {
    try {
      glob(pattern, options, (error, files) => {
        if (error) {
          reject(error)
        } else {
          resolve(files)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default globAsync
