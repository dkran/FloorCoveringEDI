var fs = require('fs'),
  path = require('path'),
  inspect = require('util'),
  baseDir = path.join(process.env.PWD, 'edi-parser/events/'),
  helperFiles = fs.readdirSync(baseDir);
  
/*
 * Load files from the helpers directory to add helper functions and 
 * remove the index file. This makes adding utility functions easier.
*/

helperFiles = helperFiles.slice(helperFiles[helperFiles.indexOf('index.js')], 1)

helperFiles.forEach(function(file){
  helperFiles[helperFiles.indexOf(file)] = file.replace('.js', '')
})
  
var setupHelpers = function(){
  return new Promise(function(resolve, reject){
    console.log(helperFiles)
    var helpers = {};
    for(var i=0; i<helperFiles.length; i++){
      helpers[helperFiles[i]] = require(baseDir + helperFiles[i])
      if(!helperFiles[i]+1){
        if(helpers === {}) reject(new Error('Helpers not properly loading, or no helpers'))
        resolve(helpers)
      }
    }
  })
}



setupHelpers().then(function(helpers){
  module.exports = helpers
})
