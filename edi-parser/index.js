var fs = require('fs'),
  parser = require('./parsers/'),
  inspect = require('util').inspect,
  _ = require('lodash');
 
 
 var EDI = function(){
   this.file = ''
   this.lines = []
   this.segments = []
   this.transactionalSets = []
   this.functionalGroups = [] 
   this.object = {
     invoices: [],
     salesCatalog: [],
     manifest: []
   }
 }
 EDI.prototype.loadData = function(string){
   this.file = fs.readFileSync(string, 'utf8')
   this.getLines()
   this.getFunctionalGroups()
   this.getSets()
   
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
   for(var i=0; i<this.lines.length; i++){
     if(parser.test(this.segments[i])){
      this.object[this.segments[i]] = parser.parse(this.lines[i], this.segments[i])     
     }
   }
   console.log(this.object)
 }
 
 
 EDI.prototype.getSets = function(){
   for(var i = 0; i < this.lines.length; i++){
     if(this.lines[i].split('*')[0].trim() === 'ST' || this.lines[i].split('*')[0].trim() === 'SE'){
       this.transactionalSets.push(i)
     }
   }
 }
 EDI.prototype.getFunctionalGroups = function(){
   for(var i = 0; i < this.lines.length; i++){
     if(this.lines[i].split('*')[0].trim() === 'GS' || this.lines[i].split('*')[0].trim() === 'GE'){
       this.functionalGroups.push(i)
     }
   }
   console.log(this.functionalGroups)
 }

 module.exports = EDI