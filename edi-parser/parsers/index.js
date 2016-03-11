'use strict'

var _ = require('lodash'),
  fs = require('fs'),
  inspect = require('util').inspect;
var segmentProcessors = segmentProcessors = {}
module.exports.parse = processLine
module.exports.test = test
module.exports.getSegment = getSegment
module.exports.segment = segmentProcessors
module.exports.lineTerminator = lineTerminator
module.exports.segmentTerminator = segmentTerminator

var endSegment = ''
var endLine = ''

var filter = {};

function lineTerminator(character){
  if(character) endSegment = character 
}

function segmentTerminator(character){
  if(character) endSegment = character
}

var filterFiles = fs.readdirSync('edi-parser/parsers/keys/')
filterFiles.forEach(function(file){
  filter[file.replace('.js', '')] = require('./keys/' + file.replace('.js', ''))
})

var segmentFiles = fs.readdirSync('edi-parser/parsers/segmentProcessors/')
segmentFiles.forEach(function(file){
  segmentProcessors[file.replace('.js', '')] = require('./segmentProcessors/' + file.replace('.js', ''))
})

function processLine(line){
  if(!(line === '') || !(line === undefined)){
    var key = line.split('*')[0].trim()
    if(filter[key]){
      var slice = {},
        segments = line.split('*').splice(1);
      if(line.split('*')[0] !== key){ 
        throw new TypeError('Not valid '+ key +'  line') 
      }else{
      for(var i=0, j=segments.length; i<j; i++){
        if(filter[key] && (segments[i].trim() !== '')){
          slice[filter[key][i]] = segments[i].trim()        
        }
      }
      return slice
      }
    }else {
      return null
    }
  }else{
    return null
  }
}

function getSegment(line){
  if(line && (line !== '')){
    return line.split('*')[0].trim()
  }else{
    return null
  }

}

function test(data){
  var key = data.split('*')[0].trim();
  if(filter[key]){
    return true
  }else{
    return null
  }
}