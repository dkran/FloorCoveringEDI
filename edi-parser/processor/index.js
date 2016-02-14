var parser = require('../parsers'),
  fs = require('fs');

var processors = {};
var processorFiles = fs.readdirSync('edi-parser/processor/processors/')
processorFiles.forEach(function(file){
  processors[file.replace('.js', '')] = require('./processors/' + file.replace('.js', ''))
})
var transactionalSets = []
var group = {}

function processGroup(data){
  initialize(data)
  console.log(processors)
  console.log(group.info.GS.transactionCode)
  processors[group.info.GS.transactionCode](data.splice(1, data.length-2), transactionalSets)
}

function initialize(data){
  group.info = {}
  group.info['GS'] = parser.parse(data[0], 'GS')
  group.info['GE'] = parser.parse(data[data.length-1], 'GE')
  getSets(data)
}
function getSets(data){
  var count = 0, started = false;
   for(var i = 0; i < data.length; i++){
     if((data[i].split('*')[0].trim() === 'ST') && (started === false)){
       transactionalSets[count] = {}
       transactionalSets[count].start = i
       started = true
     }else if((data[i].split('*')[0].trim() === 'SE') && (started === true)){
       transactionalSets[count].end = i
       started = false
       count++
     }
   }
}
module.exports = processGroup