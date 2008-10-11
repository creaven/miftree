Mif.Tree.Rename {#Mif.Tree.Rename}
==========================================

Implements rename functionality. 

Mif.Tree.Node {#Mif.Tree.Node::Rename}
==========================================

Mif.Tree.Node Method: rename {#Mif.Tree.Name:rename}
------------------------------------------------------

inline edit name. 

### Syntax:

	node.rename();
	

### Example: 

#####javascript

	myTree=new Mif.Tree({
		...
	});

	$('rename').addEvent('click', function(){
		var node=myTree.selected;
		if(!node) return;
		node.rename();
	});
	
#####html

	<div id="tree_container"></div>
	<input type="button" id="rename" />
	
