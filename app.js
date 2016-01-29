var Client = require('ftp');
var inspect = require('util').inspect;
var fs = require('fs');

c = new Client()

c.on('ready', function(){
  var downloads = [], fileNames = [];
	c.list('/*', function(err, list) {
    var cwd = '';
		console.log(list)
      if (err) throw err;
      cwd = 'INBOX/'
      c.list(cwd+ '*', function(err, list) {
        console.log(cwd)
      	if (err) throw err;
     	 console.log(list);
    	})
      cwd = 'OUTBOX/'
      c.list(cwd + '*', function(err, list) {
        console.log(inspect(list))
      	if (err) throw err;
        for(var i=0;i<list.length-1;i++){
          console.log(i)
          console.log(list[i].name)
          if(list[i].name){
            c.get(cwd + list[i].name, function(err, stream){
                if(err){
                    console.log('Error getting ' + cwd + list[i].name)
                    throw err;
                }else{
                    console.log(i)
                    console.log('downloading ' + cwd + list[i].name)
                    stream.pipe(fs.createWriteStream(cwd + list[i].name))
                }
            })
          }
        }
        c.end()
    	})
        
  
    })

})
c.connect(require('./util/ftp'))
