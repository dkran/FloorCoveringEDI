// node samples/sample.js
var EDI = require('./edi-parser'),
  servers = require('./util/ftp'),
  processor = require('./app');

processor().then(function(files){
  console.log(files)
}).catch(function(err){
  console.log(err)
})

function process(newFiles){
  
}

var edi = new EDI()
edi.setLineTerminator('\n')
edi.setSegmentTerminator('*')
/*edi.loadData('EDI/shaw/Outbox/000000045.856')*/

//console.log('Lines: \r'+edi.lines)
//console.log('Segments: \r'+edi.segments)

//edi.getObject()
