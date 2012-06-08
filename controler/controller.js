/**
 * @author Helena F. Deus
 */
var controller = exports;
var http = require('http');
var querystring = require('querystring');
var view = require("../view/view.js");
var model = require("../model/model.js");


controller.type = 'user';
controller.user = {
	
	call_tnrs : function(input, sources, matchingThreshold) {
		
		if( typeof (sources) == 'undefined') {
			sources = "*";
		}
		if( typeof (matchingThreshold) == 'undefined') {
			matchingThreshold = 0;
		}
		//submit to tnrs; tnrs will be invoked with a list of names; these will be separated by %0A, which is a urlencoded line feed
		model.tnrs.sources = sources;
		model.tnrs.score = matchingThreshold;
		
		//read
		controller.tnrs.submitQuery(input, sources, matchingThreshold);

	},
	
	call_store_tree : function (names, sources, matchingThreshold){
		//the first step is to get the list of URI from call_tnrs
		controller.type = 'tree_store';
		controller.user.call_tnrs(names);
		
	},
	
	call_topology : function (names, tree){
		controller.type = 'topology';
		//first get names
		controller.user.call_tnrs(names);
		
	},
	
	call_tree_branch_length : function (names){
		controller.type = 'tree_branch_length';
		//first get names
		controller.user.call_tnrs(names);
		
	},
	
	call_visualize_tree : function (names){
		controller.type = 'visualize_tree';
		//first get names
		controller.user.call_tnrs(names);
		
	}
	

};

controller.tnrs = {
	submitQuery : function(names, sources,score) {
		console.log('names submitted to tnrs:');
		console.log(names);
		//assemblt the query that tnrs will accepts
		model.tnrs.data = {
			'query' : names,
			'sources': sources,
			'score' : score
		};
		

		var post_data = querystring.stringify(model.tnrs.data);
		//console.log(post_data)
		var post_path = model.tnrs.path;
		var post_options = {
			path : post_path,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : post_data.length
			}
		};

		var post_req = http.request(post_options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
					tnrs_data = JSON.parse(chunk);
					model.tnrs.outputStructure = tnrs_data;
					controller.tnrs.getCleanlist();
				
			});
		});
		post_req.write(post_data);
		post_req.end();

	},
	getCleanlist : function() {
		
		var dat = model.tnrs.outputStructure;
		var URIs = [];
		var cleanNames = [];
		//using map, retrieve the uri from each name
		for (var i=0; i < dat.names.length; i++) {
		  if(dat.names[i].matches.length>0){
		  		for (var j=0; j < dat.names[i].matches.length; j++) {
					URIs.push(dat.names[i].matches[j].uri);
					cleanNames.push(dat.names[i].matches[j].acceptedName);
				  };
		  }
		};
		
		model.tnrs.taxa_uri = URIs;
		model.tnrs.cleanNames = cleanNames;
		
		//next step depends on controller type
		controller.tnrs.flow_control();
		
		
		
	},
	call_store_tree : function (taxa_uris, sources){
		model.tree_store.data = {
			'taxa_uris' : taxa_uris, 
			'sources' : sources
		};
		controller.tree_store.submitQuery(taxa_uris);
	},
	flow_control : function (){
		if(controller.type=='user'){
			//return the result to the user if view active; otherwise just dump	
			if(view.active){
				view.check_box.validate_names(model.tnrs.taxa_uri, model.tnrs.cleanNames );
			}
			else
			{
				console.log("view is not active, so outputting the URI discovered");
				console.log(model.tnrs.taxa_uri);
			}
			
		}
		else if(controller.type=='tnrs'){
			
			//get a list of taxa
			model.tree_store.data = {
			'taxa_uris' : model.tnrs.taxa_uri, 
			'sources' : model.tnrs.sources
			};
			controller.tree_store.submitQuery(model.tnrs.taxa_uri);
			
			//change the controller back to user
			//controller.type = 'user';
		}
		else if(controller.type =='tree_store'){
			//submit not the query to get the tree
			//get a list of taxa
			model.tree_store.data = {
			'taxa_uris' : model.tnrs.taxa_uri, 
			'sources' : model.tnrs.sources
			};
			controller.tree_store.submitQuery(model.tnrs.taxa_uri);
			
		}
		else if(controller.type=='topology'){
			//get names from tnrs and submit to tree store
			//controller.user.call_store_tree();
			model.tree_store.data = {
			'taxa_uris' : model.tnrs.taxa_uri, 
			'sources' : model.tnrs.sources
			};
			controller.tree_store.submitQuery(model.tnrs.taxa_uri);
			
			
		}
		else if(controller.type=='tree_branch_length'){
			//call tree store
			model.tree_store.data = {
			'taxa_uris' : model.tnrs.taxa_uri, 
			'sources' : model.tnrs.sources
			};
			controller.tree_store.submitQuery(model.tnrs.taxa_uri); 
			
			
		}
		else if(controller.type=='visualize_tree'){
			//call tree store
			model.tree_store.data = {
			'taxa_uris' : model.tnrs.taxa_uri, 
			'sources' : model.tnrs.sources
			};
			controller.tree_store.submitQuery(model.tnrs.taxa_uri); 
			
		}
		
	}
}

controller.tree_store = {
	submitQuery : function (taxa_uri) {
		console.log('uri submitted to tree_store');
		console.log(taxa_uri);
		//assemblt the query that tnrs will accepts
		
		var post_data = querystring.stringify(model.tree_store.data);
		var post_path = model.tree_store.path;
		var post_options = {
			path : post_path,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : post_data.length
			}
		};

		var post_req = http.request(post_options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
					tree_data = JSON.parse(chunk);
					model.tree_store.outputStructure = tree_data;
					controller.tree_store.getURIlist();
				
			});
		});
		post_req.write(post_data);
		post_req.end();
		
		
		
	},
	getURIlist : function (){
		console.log('have output from tree_store service...Getting tree uri');
		var trees = [];
		for(var treeURI in model.tree_store.outputStructure){
			trees.push(treeURI);
		}
		model.tree_store.trees = trees;
		controller.tree_store.flow_control();
		
		
	},
	
	flow_control : function () {
		//console.log('flow control in tree_store is '+controller.type);
		if(controller.type=='user'){
			
		}
		else if(controller.type=='tnrs')
		{
			console.log('we are here')
		}
		else if(controller.type =='tree_store'){
			//return the tree to the user
			view.displayMatchedTrees(model.tree_store.trees);	
		}
		else if(controller.type=='topology'){
			console.log('applicable trees are ');
			console.log(model.tree_store.trees)
			
			//submit to topology
			model.topology.data = {
				'taxa_uri' : model.tnrs.taxa_uri,
				'trees': model.tree_store.trees
			};
			
			
			controller.topology.submitQuery();
		}
		
		else if(controller.type=='tree_branch_length'){
			console.log('applicable trees are ');
			console.log(model.tree_store.trees);
			//submit to topology
			model.topology.data = {
				'taxa_uri' : model.tnrs.taxa_uri,
				'trees': model.tree_store.trees
			};
			
			
			controller.topology.submitQuery();
			
		}
		else if(controller.type=='visualize_tree'){
			console.log('applicable trees are ');
			console.log(model.tree_store.trees);
			//submit to topology
			model.topology.data = {
				'taxa_uri' : model.tnrs.taxa_uri,
				'trees': model.tree_store.trees
			};
			
			
			controller.topology.submitQuery();
			
		}
		
		
	}
	
	
}

controller.topology = {
		submitQuery : function () {
		console.log('tree and taxa submitted to topology');
		//console.log(model.tree_store.data.taxa_uris);
		//assemblt the query that tnrs will accepts
		
		var post_data = querystring.stringify(model.topology.data);
		var post_path = model.topology.path;
		var post_options = {
			path : post_path,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : post_data.length
			}
		};

		var post_req = http.request(post_options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(xml) {
					//console.log(xml)
					//topology_data = JSON.parse(chunk);
					model.topology.rawXMLOutput = xml;
					//model.topology.outputStructure = topology_data;
					controller.topology.flowControl();
					
				
			});
		});
		post_req.write(post_data);
		post_req.end();
		
	},
	parseXML : function (xml){
		console.log('here is the xml tree');
		console.log(xml);
		
	},
	
	flowControl : function (){
		if(controller.type=='topology'){
			console.log('raw output of phylotastic tree')
			console.log(model.topology.rawXMLOutput); 
			
		}
		else if(controller.type=='tree_branch_length') {
			console.log('raw output of phylotastic tree')
			console.log(model.topology.rawXMLOutput);
			
			//now invoke the tree_branch_length service
			 model.tree_branch_length.data = {
				'tree': model.topology.rawXMLOutput
			};
			
			
			controller.tree_branch_length.submitQuery();
		}
		else if(controller.type=='visualize_tree'){
			console.log('raw output of phylotastic tree')
			console.log(model.topology.rawXMLOutput);
			
			//now invoke the tree_branch_length service
			 model.tree_branch_length.data = {
				'tree': model.topology.rawXMLOutput
			};
			
			
			controller.tree_branch_length.submitQuery();
			
		}
		
	}
}


controller.tree_branch_length = {
		submitQuery : function () {
		console.log('phylotastic tree submitted to tree branch length');
		console.log(model.topology.rawXMLOutput);
		//assemblt the query that tnrs will accepts
		
		var post_data = querystring.stringify(model.tree_branch_length.data);
		var post_path = model.tree_branch_length.path;
		var post_options = {
			path : post_path,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : post_data.length
			}
		};

		var post_req = http.request(post_options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
					//console.log(chunk)
					//tree_branch_length_data = JSON.parse(chunk);
					model.tree_branch_length.rawXMLOutput = chunk;
					//model.tree_branch_length.outputStructure = tree_branch_length_data;
					controller.tree_branch_length.flowControl();
					
				
			});
		});
		post_req.write(post_data);
		post_req.end();
		
	},
	parseXML : function (xml){
		console.log('here is the xml tree');
		console.log(xml);
		
	},
	
	flowControl : function (){
		if(controller.type=='tree_branch_length'){
			console.log('raw output of phylotastic tree')
			console.log(model.tree_branch_length.rawXMLOutput); 
			
		}
		else if(controller.type=='visualize_tree'){
			//get a json version of the data
			//console.log(model.tree_branch_length.rawXMLOutput)
			model.visualize_tree.data = {
				'xmlfile' : model.tree_branch_length.path
				
			}
			controller.visualize_tree.submitQuery();
		}
		
	}
}
controller.visualize_tree = {
	submitQuery : function (){
		
		var post_data = querystring.stringify(model.visualize_tree.data);
		var post_path = model.services.xmlparser;//send to the php parser
		var post_options = {
			path : post_path,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : post_data.length
			}
		};

		var post_req = http.request(post_options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
					//console.log(chunk)
					visualize_tree_data = JSON.parse(chunk);
					//model.topology.rawXMLOutput = xml;
					model.visualize_tree.data = visualize_tree_data;
					controller.visualize_tree.flowControl();
					
				
			});
		});
		post_req.write(post_data);
		post_req.end();
	},
	
	flowControl : function (){
		if(controller.type=='visualize_tree'){
			
			controller.visualize_tree.drawTree();
		}
		
	},
	
	drawTree : function (handleid){
		console.log(model.visualize_tree.data);
		
	}
	
	
}
	