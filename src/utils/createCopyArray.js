import { join } from 'path'
const createCopyArray = (source, copyArray = [], dest) => {
  let returnArray = []
  for (let i = 0; i < copyArray.length; i++) {
    const fileSource = copyArray[i]
    const slicePosition =
      source.slice(source.length - 1) === '/'
        ? source.length
        : source.length - 1

    const strippedFileName = fileSource.slice(slicePosition)
    const fileDest = join(dest, strippedFileName)
    returnArray.push({
      source: fileSource,
      dest: fileDest
    })
  }
  return returnArray
}

export default createCopyArray
