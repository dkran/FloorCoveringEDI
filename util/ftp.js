var fs = require('fs');
var servers = [];
var serverFiles = fs.readdirSync('util/ftpConfig/')
serverFiles = serverFiles.filter(function(value){
  return value.indexOf('SAMPLE') === -1
})
serverFiles.forEach(function(file){
  servers.push(require('./ftpConfig/' + file.replace('.js', '')))
})

module.exports = servers