var EDI = require('x12');
var fs = require('fs');
var edi = new EDI();

var file = fs.readFileSync('EDI/mohawk/OUTBOX/00000005.810', 'utf8')

var parser = new EDI.X12Parser()
console.log(parser)