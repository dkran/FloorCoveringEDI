var fs = require('fs'),
  path = require('path'),
  inspect = require('util').inspect,
  helperFiles = fs.readdirSync('./');
  

var Dir = function(){
  this.root = process.env.PWD
}

module.exports = new Dir()