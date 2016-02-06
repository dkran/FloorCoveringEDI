'use strict'

var JSFtp = require('jsftp');
var inspect = require('util').inspect;
var fs = require('fs');
var async = require('async');


var ftp = new JSFtp(require('./util/ftp'))
var local = 'EDI/mohawk/OUTBOX/'
var remote = 'OUTBOX'
var localFiles = fs.readdirSync(local)

var gatherFiles = function(dir){
  return new Promise(function(resolve, reject){
    ftp.ls(dir + '/*', function(err, res) {
    if (err) reject(err)
    var remoteFiles = [];
    res.forEach(function(file){
      if(localFiles.indexOf(file.name) < 0) remoteFiles.push(file.name)
    });
    resolve(remoteFiles)
    })
  })
}

gatherFiles(remote).then(function(files){
  if(files.length>0){
    async.mapLimit(files, 1, function(file, callback){
    console.log('attempting: ' +remote + file + '->' + local + file)
    ftp.get(remote +'/'+ file, local +'/'+ file, function(err){
      if(err){
        console.log('Error getting ' + file)
        callback(err)
      }else{
       console.log('Got ' + file)
       callback()
      }
     })
    }, function(err, res){
      if(err){
        console.log(err)
      }
      console.log('updates complete' + res)
      quit().then(function(data){
      console.log('goodbye!' + data)
    })
    })
  }else{
    console.log('nothing to update')
    quit().then(function(data){
      console.log('goodbye: ' + inspect(data))
    })
  }

})

function quit(){
  return new Promise(function(resolve, reject){
    ftp.raw.quit(function(err, data){
      if (err) reject(err)
      
      resolve(data)
    })
  })
}



