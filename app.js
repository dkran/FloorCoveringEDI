'use strict'

var JSFtp = require('jsftp'),
  inspect = require('util').inspect,
  fs = require('fs'),
  async = require('async'),
  servers = require('./util/ftp');
 
/*
 *  Initialize first server in the ftp server list, and set my two globals local
 *  and remote equal to the proper directories.
 *  This gives the iterator a place to start.
 *  newFiles will be resolved with a list of hostnames as the keys, and new files in 
 *  that hostname as an array, and an error list too.
*/ 

var i = 0,
  ftp = new JSFtp(servers[i].server),
  local = servers[i].local,
  remote = servers[i].remote,
  localFiles = fs.readdirSync(local),
  newFiles = {errors: {}};

/*
 *  Populate newFiles key values with the hostnames of the server, 
 *  and a blank array we can push filenames to
*/

servers.forEach(function(server){
  newFiles[server.server.host] = []
  newFiles.errors[server.server.host] = []
})

function gatherFiles(dir){
  return new Promise(function(resolve, reject){
    ftp.ls(dir + '*', function(err, res) {
    if (err) reject(err)
    var remoteFiles = [];
    res.forEach(function(file){
      if((localFiles.indexOf(file.name) < 0) && (file.name !== 'Archive')) remoteFiles.push(file.name)
    });
    resolve(remoteFiles)
    })
  })
}
function downloadNew(files){
  return new Promise(function(resolve, reject){
    async.mapLimit(files, 1, function(file, callback){
    ftp.get(remote + file, local + file, function(err){
      if(err){
        newFiles.errors[servers[i].server.host].push(servers[i].server.host + ': ' +
        servers[i].server.port + '/' + servers[i].remote + file)
        callback(err)
      }else{
        if(servers[i])
          newFiles[servers[i].server.host].push(file)
      callback()
      }
    })
    }, function(err, res){
      if(err){
        reject(err)
      }
      resolve()
    })
  })
}
function quit(){
  return new Promise(function(resolve, reject){
    ftp.raw.quit(function(err, data){
      if (err) reject(err)  
        resolve(data)
    })
  })
}

function operate(){
  return new Promise(function(resolve, reject){
    if(servers[i]){
      if(i!== 0) ftp = new JSFtp(servers[i].server)
      local = servers[i].local
      remote = servers[i].remote
      localFiles = fs.readdirSync(local)
    }else{
      resolve(newFiles)
    }
    gatherFiles(remote).then(function(files){
      if(files.length>0){
        downloadNew(files).then(function(){
          console.log('Done: ' + servers[i].server.host)
          i++
          resolve(operate())
        })
      }else{
        console.log('No updates: ' + servers[i].server.host)
        i++
        resolve(operate())
      }
    })
  })
}

module.exports = operate
