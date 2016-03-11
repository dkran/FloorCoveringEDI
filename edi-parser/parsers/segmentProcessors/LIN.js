var _ = require('lodash'), inspect = require('util').inspect;

module.exports = function(object){
  console.log(inspect(object, {depth: 9}))
  console.log(object.keys)
}