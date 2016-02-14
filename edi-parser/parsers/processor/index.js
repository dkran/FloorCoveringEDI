var processors = [];

function process(headers, data){
  var object = processors[headers.ST.identifier](data)
  return object
}
