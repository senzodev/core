import { join } from 'path'
const createCopyArray = (source, copyArray = [], dest) => {
  let returnArray = []
  for (let i = 0; i < copyArray.length; i++) {
    const fileSource = copyArray[i]
    const strippedFileName = fileSource.slice(source.length)
    const fileDest = join(dest, strippedFileName)
    returnArray.push({
      source: fileSource,
      dest: fileDest
    })
  }
  return returnArray
}

export default createCopyArray
