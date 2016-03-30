;(function(){

import '../node_modules/grafi-formatter/src/formatter'
import 'contrast'

  var grafi = {}
  grafi.contrast = contrast

  if (typeof module === 'object' && module.exports) {
    module.exports = grafi
  } else {
    this.grafi = grafi
  }
}())
