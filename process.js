// node samples/sample.js
var EDI = require('./edi-parser')

var edi = new EDI()

edi.loadData('EDI/mohawk/OUTBOX/000000024.856')

console.log(edi.getSegment())