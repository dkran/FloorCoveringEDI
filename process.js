// node samples/sample.js
var EDI = require('./edi-parser')

var edi = new EDI()
edi.setTerminator('\n')
edi.loadData('EDI/shaw/Outbox/000000025.856')

//console.log('Lines: \r'+edi.lines)
//console.log('Segments: \r'+edi.segments)

edi.getObject()