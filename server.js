/**
 * @author Helena
 */



var controller = require("./controler/controller.js");
var view = require("./view/view.js");

//controller.user.call_tnrs(['homo sapiens', 'mus musculus']);
//controller.user.call_store_tree(['homo sapiens', 'mus musculus']);
//controller.user.call_topology(['homo sapiens', 'mus musculus']);
controller.user.call_tree_branch_length(['homo sapiens', 'mus musculus']);
//controller.user.call_visualize_tree(['homo sapiens', 'mus musculus']);

/*
 * this will put all the good stuff acesible as a service

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/