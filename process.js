// node samples/sample.js
var EDI = require('edi');
var inspect = require('util').inspect;
var fs = require('fs')
msg = new EDI(fs.readFileSync('EDI/mohawk/OUTBOX/000000022.810', {encoding: 'UTF8'}))
console.log(msg)
console.log(msg.bsettings())

// Print sth like:
// #0 ["2000-01-01","20322051544","1979.0","8.8017226E7","ABC","45"]
// #1 ["2050-11-27","28392898392","1974.0","8.8392926E7","DEF","23"]
// Number of lines: 2
