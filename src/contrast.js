/**
  ## contrast method
  Brief description

  ### Parameters
    - imageData `Object`: ImageData object
    - option `Object` : Option object

  ### Example
      //code sample goes here
 */
function contrast (imgData, option) {
  // check options object
  option = option || {}
  option.monochrome = option.monochrome || false
  option.level = option.level || 1

  var pixelSize = imgData.width * imgData.height
  var dataLength = imgData.data.length
  var colorDepth = dataLength / pixelSize
  var level = option.level

  if (colorDepth !== 4 && colorDepth !== 1) {
    throw new Error('ImageObject has incorrect color depth')
  }

  var newPixelData = new Uint8ClampedArray(pixelSize * (option.monochrome || 4))
  var p, _i, _data
  for (p = 0; p < pixelSize; p++) {
    if (colorDepth === 1) {
      _data = (imgData.data[p]  - 128 ) * level + 128

      // case 1. input is 1 channel and output should be 1 channel (monochrome)
      if (option.monochrome) {
        newPixelData[p] = _data
        continue
      }

      // case 2. input is 1 channel but output should be RGBA
      newPixelData[_i] = _data
      newPixelData[_i + 1] = _data
      newPixelData[_i + 2] = _data
      newPixelData[_i + 3] = 255
      continue
    }

    // case 3. input is RGBA  and output should also be RGBA
    _i = p * 4
    newPixelData[_i] = (imgData.data[_i]  - 128 ) * level + 128
    newPixelData[_i + 1] = (imgData.data[_i + 1]  - 128 ) * level + 128
    newPixelData[_i + 2] = (imgData.data[_i + 2]  - 128 ) * level + 128
    newPixelData[_i + 3] = imgData.data[_i + 3]
  }

  return formatter(newPixelData, imgData.width, imgData.height)
}
