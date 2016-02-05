var fs = require('fs'),
  inspect = require('util').inspect;
  
 var EDI = function(){
   this.data = ''
   this.lines = []
   this.segments = []
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
   var i = 0;
   var self = this;
   this.lines.forEach(function(line){
     while(line[i] !== '*'){
       self.segments[i].push(line[i]) 
       i++
     }
   })
   return this.segments
 }
 
 module.exports = EDI