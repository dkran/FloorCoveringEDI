var parser = require('../../parsers'),
  items = [];

module.exports = processManifest

function processManifest(data, sets){
  var transactionData = [];
  var transactions = [];
  for(var i = 0; i < sets.length; i++){
    transactions[i] = {}
    transactionData[i] = data.splice(0, (sets[i].end - sets[i].start + 1))
  }
  console.log(getSegments(transactionData[1]))
  console.log(parser.parse(transactionData[0][1], 'BSN'))
}

function processSets(transactionSets){
  
}

function getSegments(lines){
  var segments = []
  for(var i = 0; i<lines.length; i++){
    segments[i] = lines[i].split('*')[0].trim()
  }
  return segments
}