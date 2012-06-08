/**
 * @author Helena F. Deus
 */
var view = exports;
var controller = require("../controler/controller.js");
var model = require("../model/model.js");

view.active = 0;
view.check_box = {
	validate_names : function (listURI, listCleanNames){
		//display a list of checkboxes for the user to select
		//AFTER selection, send this list back to controller
		//Obviously, selectedList will normally be a filtered version of list
		console.log('at this point, user selects clean names using the SHINY UI; these can be mapped to a list of uri');
		console.log(listCleanNames);
		var selectedList = listURI;
		
		model.user.selectedTaxa = selectedList;
		//controller.user.call_store_tree(selectedList);
		
	}
}
view.displayMatchedTrees = function (trees) {
		//handle = document.getElementById('tree_handle');
		//after user selection, submit the tree(s) to topology
		console.log('matched tree uri:');
		console.log(trees);
		
		selectedTree = trees[0]; //this part to be replaced by whatever the user selectes as a tree
		
}
