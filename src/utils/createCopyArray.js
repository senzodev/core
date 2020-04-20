import { join } from 'path'
const createCopyArray = (source, copyArray = [], dest) => {
  let returnArray = []
  for (let i = 0; i < copyArray.length; i++) {
    const fileSource = copyArray[i]
    const fileDest = join(dest, fileSource.substr(fileSource.indexOf(source)))
    returnArray.push({
      source: fileSource,
      dest: fileDest
    })
  }
  return returnArray
}

export default createCopyArray