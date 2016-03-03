var _ = require('lodash'), inspect = require('util').inspect;

module.exports = function(object){
  console.log(inspect(object, {depth: 9}))
  console.log('LIN Processor')
  console.log(object.keys)
}