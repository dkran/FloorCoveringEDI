var fs = require('fs'),
  inspect = require('util').inspect;
  
 var EDI = function(){
   this.data = ''
   this.lines = []
   this.segments = ['fuck']
 }
 EDI.prototype.loadData = function(string){
   this.data = fs.readFileSync(string, 'utf8')
   this.getLines()
 }
 
 EDI.prototype.getLines = function(){
   this.lines = this.data.split('\r')
   console.log(inspect(this.lines))
 }
 
 EDI.prototype.getSegment = function(){
   var thing = []
   var i = 0;
   var self = this;
   this.lines.forEach(function(line){
     while(line[i] !== undefined){
       console.log(line[i])
       if(line[i] === '*') break;
       thing[i] = line[i]
       i++
     }
   })
   console.log(thing)
   console.log(this.segments)
   return this.segments
 }
 
 module.exports = EDI