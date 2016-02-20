var parser = require('../../parsers'),
  inspect = require('util').inspect,
  items = [];

module.exports = processManifest

function processManifest(data){
  var transactionalSets = getSets(data, 'ST', 'SE');
  var separatedSets = separate(data, transactionalSets)
  var transactions = [];
  for(var i=0; i<separatedSets.length; i++){
    var headerLines = ['ST', 'SE', 'DTM', 'BSN']
    transactions[i] = {}
    transactions[i].headers = getLines(separatedSets[i], headerLines)
  }
  getHeirarchies(separatedSets)
}

function getHeirarchies(separatedSets){
  var newTransactions = [];
  var currentType = '', currentTransaction = '';
  for (var i = 0;i<separatedSets.length; i++){
    for(var j=0;j<separatedSets[i].length; j++){
      if(parser.getSegment(separatedSets[i][j]) === 'HL'){
        console.log(parser.parse(separatedSets[i][j]))
        console.log(parser.parse(separatedSets[i][j+1]))
      }
    }
    
  }
  console.log(inspect(newTransactions, {depth: 3}))
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
     if((parser.test(data[i]) === start) && (started === false)){
       sets[count] = {}
       sets[count].start = i
       started = true
     }else if((data[i].split('*')[0].trim() === end) && (started === true) && (i !== sets[count].start)){
       if(parser.getSegment(data[i]) === 'HL'){
         sets[count].end = i-1
       }else{
         sets[count].end = i         
       }
       started = false
       count++
     }
   }
   if(started !== false){
     throw new Error('Improper Completion')
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
        processed[data[i].split('*')[0].trim()] = parser.parse(data[i])
      }
    }
  }
  return processed
}

function getType(line){
  if(!line.split('*').trim()){
    
  }
}