var fs = require('fs'),
  parser = require('./parsers/'),
  processor = require('./processor'),
  inspect = require('util').inspect,
  _ = require('lodash');
 
 
 var EDI = function(){
   this.lineTerminator = '\r'
   this.file = ''
   this.lines = []
   this.segments = []
   this.transactionalSets = []
   this.functionalGroups = []
   this.object = {
     invoices: {},
     salesCatalog: {},
     manifest: {}
   }
 }
 EDI.prototype.loadData = function(string){
   this.file = fs.readFileSync(string, 'utf8')
   this.getLines()
   this.getHeaders()
   this.getFunctionalGroups()
   this.getSets()
   processGroups(this.lines, this.functionalGroups, this.object)
 }
 
 EDI.prototype.getLines = function(){
   this.lines = this.file.split(this.lineTerminator)
   for(var i = 0; i<this.lines.length; i++){
     this.segments[i] = '';
     this.segments[i] += this.getSegment(this.lines[i])
   }
 }

 EDI.prototype.getSegment = function(line){
  if(line){
   return line.split('*')[0].trim()
  }/*else{
    console.log('line: ' + line)
    throw new Error('Segment fucked')
  }*/
 }
 
 EDI.prototype.getObject = function(){
   console.log(parser)
   parser.segment['LIN'](this.object)
   //console.log(inspect(this.object, {depth: 9}))
 }
 
 
 EDI.prototype.getSets = function(){
   var count = 0, started = false;
   for(var i = 0; i < this.lines.length; i++){
     if((parser.getSegment(this.lines[i]) === 'ST') && (started === false)){
       this.transactionalSets[count] = {}
       this.transactionalSets[count].start = i
       started = true
     }else if((parser.getSegment(this.lines[i]) === 'SE') && (started === true)){
       this.transactionalSets[count].end = i
       started = false
       count++
     }
   }
 }
 EDI.prototype.getFunctionalGroups = function(){
   var count = 0, started = false;
   for(var i = 0; i < this.lines.length; i++){
     if((parser.getSegment(this.lines[i]) === 'GS') && (started === false)){
       this.functionalGroups[count] = {}
       this.functionalGroups[count].start = i
       started = true
     }else if((parser.getSegment(this.lines[i]) === 'GE') && (started === true)){
       this.functionalGroups[count].end = i
       started = false
       count++
     }
   }
   if(started === true) {console.log('fuck only started! ')}
}
 
EDI.prototype.getHeaders = function(){
  var started = false, ended = false;
  this.object.headers = {}
  for(var i = 0; i < this.lines.length; i++){
     if((this.lines[i].split('*')[0].trim() === 'ISA') && (started === false)){
       started = true
       this.object.headers.ISA = parser.parse(this.lines[i], this.segments[i])
     }else if((this.lines[i].split('*')[0].trim() === 'IEA') && (started === true)){
       this.object.headers.IEA = parser.parse(this.lines[i], this.segments[i])
       ended = true
     }
  }
  if(!(this.object.headers.ISA && this.object.headers.IEA)){
    console.log('didnt start and end')
  }
}

EDI.prototype.setTerminator = function(character){
  if(character){
    this.lineTerminator = character
  }
}

function processGroups(lines, groups, groupObject){
  for(var i=0; i<groups.length; i++){
    if(parser.parse(lines[groups[i].start]).transactionCode === 'SH'){
      groupObject.manifest.headers = _.extend(parser.parse(lines[groups[i].start]), parser.parse(lines[groups[i].end+1]))
      groupObject.manifest.data = processor(lines.splice(groups[i].start, (groups[i].end - groups[i].start+1)))
    }
  }
}


 module.exports = EDI