var parser = require('../../parsers')

module.exports = processManifest

function processManifest(data, sets){
  console.log(sets)
  var transactionData = [];
  var transactions = [];
  for(var i = 0; i < sets.length; i++){
    transactions[i] = {}
    transactionData[i] = data.splice(0, (sets[i].end - sets[i].start + 1))
  }
  console.log(transactionData)
}