'use strict'

var _ = require('lodash'),
  inspect = require('util').inspect;

var filter = {
               ISA: require('./keys/ISA'),
               GS: require('./keys/GS')
             }

function processLine(line, key){
  var slice = {},
      segments = line.split('*').splice(1);
  if(line.split('*')[0] !== key){ 
    throw new TypeError('Not valid '+ key +'  line') 
  }else{
    for(var i=0, j=segments.length-1; i<j; i++){
      slice[filter[key][i]] = segments[i].trim()
    }
  }
  return slice
}

module.exports = processLine