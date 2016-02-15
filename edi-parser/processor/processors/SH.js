var parser = require('../../parsers'),
  inspect = require('util').inspect,
  items = [];

module.exports = processManifest

function processManifest(data){
  var transactionalSets = getSets(data, 'ST', 'SE');
  var setArray = separate(data, transactionalSets)
  var transactions = [];
  for(var i=0; i<setArray.length; i++){
    transactions[i] = {}
    transactions[i].headers = getLines(setArray[i], ['ST', 'SE', 'DTM', 'BSN'])
  }
  console.log(inspect(transactions, {depth: 3, colors: true}))
}

function separate(data, sets){
  var items = []
  for(var i = 0; i < sets.length; i++){
    items[i] = {}
    items[i] = data.splice(0, (sets[i].end - sets[i].start + 1))
  }
  return items
}

function getSets(data, start, end){
  var sets = []
  var count = 0, started = false;
   for(var i = 0; i < data.length; i++){
     if((data[i].split('*')[0].trim() === start) && (started === false)){
       sets[count] = {}
       sets[count].start = i
       started = true
     }else if((data[i].split('*')[0].trim() === end) && (started === true)){
       sets[count].end = i
       started = false
       count++
     }
   }
   return sets
}


// Filters a chunk of data line by line, and uses the array in the lines variable to process only those that are in the array.  Will
// Return an object with the proper code
function getLines(data, lines){
  var processed = {}
  for(var i=0;i<data.length;i++){
    if(lines.indexOf(data[i].split('*')[0].trim()) >= 0){
      if(parser.test(data[i].split('*')[0].trim())){
        processed[data[i].split('*')[0].trim()] = parser.parse(data[i], data[i].split('*')[0].trim())
      }
    }
  }
  return processed
}