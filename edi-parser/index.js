var fs = require('fs'),
  parse = require('./parsers/'),
  inspect = require('util').inspect,
  _ = require('lodash');
 
 
 var EDI = function(){
   this.file = ''
   this.lines = []
   this.segments = []
   this.object = {}
 }
 EDI.prototype.loadData = function(string){
   this.file = fs.readFileSync(string, 'utf8')
   this.getLines()
   console.log(this.segments)
 }
 
 EDI.prototype.getLines = function(){
   this.lines = this.file.split('\r')
   for(var i = 0; i<this.lines.length; i++){
     this.segments[i] = '';
     this.segments[i] += this.getSegment(this.lines[i])
   }
 }
 
 EDI.prototype.getSegment = function(line){
  if(line){
   return line.split('*')[0].trim()
  }else{
    throw new Error('Segment fucked')
  }
 }
 
 EDI.prototype.getObject = function(){
   this.object[this.segments[0]] = parse(this.lines[0], this.segments[0])
   this.object[this.segments[1]] = parse(this.lines[1], this.segments[1])
   console.log(this.object)
 }
 
 module.exports = EDI