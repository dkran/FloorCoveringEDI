var fs = require('fs'),
  parsers = require('./parsers'),
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
   for(var i = 0; i<this.lines.length; i++){
     this.segments[i] = '';
     /*for(var j = 0; j< this.lines[i].length; j++){
      if(this.lines[i][j] === '*') break;
      this.segments[i] += this.lines[i][j]
     }*/
     this.segments[i] += this.getSegment(this.lines[i])
   }
 }
 
 EDI.prototype.getSegment = function(line){
  if(line){
   var segment = '';
   for(var i = 0; i<line.length; i++){
     if(line[i] === '*') break;
     segment += line[i] 
   }
   return segment
  } else{
    return 'No line given'
  }
 }
 
 EDI.prototype.getObject = function(){
   console.log(parsers['ISA'](this.lines[0]))
 }
 
 module.exports = EDI