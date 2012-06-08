/**
 * @author Helena F. Deus
 */
var model = exports;
model.services = {};

model.services.tnrs = 'phylotastic_services/tnrs.js';
model.services.tree_store = 'phylotastic_services/treestore.js';
model.services.topology = 'phylotastic_services/xml2json.php?xmlfile=phylotastic_services/tree.xml';
model.services.tree_branch_length ='phylotastic_services/xml2json.php?xmlfile=phylotastic_services/scaling.xml';
model.services.xmlparser = 'phylotastic_services/xml2json.php';

model.config = {
	User : '',
	TNRS : {sources : []},
	TreeStore : '',
	Topology : '',
	Scaling : ''
	
}

model.user = {
	
	
}
model.tnrs = {
	path : model.services.tnrs,
	data : {query : ''},
	sources : [],
	score: 0,
	dirtyNames : [],
	outputStructure : {},
	cleanNames : [],
	cleanURIs : []	
}
model.tree_store = {
	path : model.services.tree_store
	
}
model.topology = {
	path : 'phylotastic_services/tree.xml',
	parsedPath : model.services.topology
};

model.tree_branch_length = {
	path : 'phylotastic_services/scaling.xml', 
	parsedPath : model.services.tree_branch_length
	
}

model.visualize_tree = {
	
}
