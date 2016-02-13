'use strict'

var _ = require('lodash'),
  inspect = require('util').inspect;

module.exports = {
  ISA: processISA
}
var names = ['auth',
            'authInfo',
            'security',
            'secInfo',
            'sender',
            'senderId',
            'receiver',
            'receiverId',
            'date',
            'time',
            'standard',
            'version',
            'controlNumber',
            'ackReq',
            'usageType'];
  
function processISA(line){
  var ISA = {},
      segments = line.split('*').splice(1);
  if(segments[segments.length-1] !== ':'){ 
    throw new TypeError('Not an ISA Line') 
  }else{
    for(var i=0, j=segments.length-1; i<j; i++){
      ISA[names[i]] = segments[i].trim()
    }
  }
  return ISA
}