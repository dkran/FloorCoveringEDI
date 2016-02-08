'use strict'

var _ = require('lodash');

module.exports = {
  ISA: processISA
}

function processISA(line){
  console.log(line.length)
  var ISA = {},
      length = line.length,
      i = 0;
  function trim(amount){
    line = line.substr(amount)
    i += amount
  }
  trim(4)
  
  function next(){
    var pair = {}
    var key = getSection(line)
    trim(key.length+1)
    var value = getSection(line)
    trim(value.length+1)
    pair[key] = value.trim()
    if(value.trim() === ''){
      return null
    }else{
      return pair
    }
    
    
  }
  while(i <= length){
      _.merge(ISA, next())
  }
  console.log(ISA)
  return ISA
}

function getSection(line){
  if(line){
   var section = '';
   for(var i = 0; i<line.length; i++){
     if(line[i] === '*') break;
     section += line[i] 
   }
   return section
  } else{
    return 'No line given'
  }
 }


