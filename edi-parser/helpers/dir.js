var fs = require('fs'),
  path = require('path'),
  inspect = require('util').inspect,
  helperFiles = fs.readdirSync('./');
  

var Dir = function(){
  this.root = process.env.PWD
  //checkFile('EDI').then(console.log)
}


function checkFile(directory, root){
  return new Promise(function(resolve, reject){
    if(!root){
      fs.stat(this.root+directory, function(err, stats){
        console.log(stats)
        if (err) reject(err)
        //if (stats.isDirectory()) resolve(true)
        //else reject(new Error(this.root + directory + 'exists but is not a directory'))
      })
    }else{
      fs.stat(root+directory, function(err, stats){
        if (err) reject(err)
        //if (stats.isDirectory()) resolve(true)
        //else reject(new Error(root + directory + 'exists but is not a directory'))
      })
    }
  })
  
}

module.exports = new Dir()