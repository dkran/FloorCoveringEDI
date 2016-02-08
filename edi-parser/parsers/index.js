'use strict'
function processISA(line){
  var ISA = {},
      i = 0;
  function trim(amount){
    line = line.substr(amount)
    console.log('trimmed ' + amount + ': ' + line)
    i += amount
  }
  trim(4)
  console.log(line)
  
  function next(){
    var pair = {}
    var key = getSection(line)
    console.log('key: ' + key)
    trim(key.length+1)
    var value = getSection(line)
    console.log('value: ' + value)
    trim(value.length+1)
    pair[key] = value
    if(value.replace(' ') === ''){
      return pair[key] = ''
    }else{
      return pair
    }
    
    
  }
  while(i <= line.length){
      
  }
  
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
module.exports = {
  ISA: processISA
}

