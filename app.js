'use strict'

var JSFtp = require('jsftp');
var inspect = require('util').inspect;
var fs = require('fs');
var async = require('async'); 
var servers = require('./util/ftp');
var i = 0;


var ftp = new JSFtp(servers[i].server)
var local = servers[i].local
var remote = servers[i].remote
var localFiles = fs.readdirSync(local)

function operate(){
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
          console.log('Error getting ' + file)
          callback(err)
        }else{
        console.log('Got ' + file)
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
  gatherFiles(remote).then(function(files){
    if(files.length>0){
      downloadNew(files).then(function(){
        console.log('Done: ' + servers[i].server.host)
        i++
        if(servers[i]){
          local = servers[i].local
          remote = servers[i].remote
          localFiles = fs.readdirSync(local)
          operate()
        }else{
          quit().then(function(data){
            console.log('All Done!')
          })
        }
      })
    }else{
      console.log('No updates: ' + servers[i].server.host)
      i++
      if(servers[i]){
        ftp = new JSFtp(servers[i].server)
        local = servers[i].local
        remote = servers[i].remote
        localFiles = fs.readdirSync(local)
        operate()
      }else{
        quit().then(function(data){
          console.log('All Done!')
        })
        
      }
    }

  })

}

operate()
