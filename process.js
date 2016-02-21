// node samples/sample.js
var EDI = require('./edi-parser')

var edi = new EDI()

edi.loadData('EDI/mohawk/OUTBOX/000000008.856')

//console.log('Lines: \r'+edi.lines)
//console.log('Segments: \r'+edi.segments)

edi.getObject()