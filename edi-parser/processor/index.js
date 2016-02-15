var parser = require('../parsers'),
  fs = require('fs');

var processors = {};
var processorFiles = fs.readdirSync('edi-parser/processor/processors/')
processorFiles.forEach(function(file){
  processors[file.replace('.js', '')] = require('./processors/' + file.replace('.js', ''))
})
var group = {}

function processGroup(data){
  initialize(data)
  processors[group.info.GS.transactionCode](data.splice(1, data.length-2))
}

function initialize(data){
  group.info = {}
  group.info['GS'] = parser.parse(data[0], 'GS')
  group.info['GE'] = parser.parse(data[data.length-1], 'GE')
}

module.exports = processGroup