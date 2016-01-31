'use strict'

var JSFtp = require('jsftp');
var inspect = require('util').inspect;
var fs = require('fs');
var async = require('async');
var EDI = require('edi');

var ftp = new JSFtp(require('./util/ftp'))
var local = 'EDI/mohawk/OUTBOX/'
var remote = 'OUTBOX'

var gatherFiles = function(dir){
  return new Promise(function(resolve, reject){
    ftp.ls(dir + '/*', function(err, res) {
    if (err) reject(err)
    var remoteFiles = [];
    res.forEach(function(file){
      remoteFiles.push(file.name)
    });
    resolve(remoteFiles)
  })
})
}

gatherFiles(remote).then(function(files){
  console.log(files)
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
    
  })
})





