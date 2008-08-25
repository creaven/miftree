Mif.Tree.Sort {#Mif.Tree.Sort}
========================================

implements children sorting functionality.

Class Mif.Tree {#Mif.Tree::Sort}
==========================================


Mif.Tree Method: initSortable {#Mif.Tree:initSortable}
------------------------------------------------

implements sortalbe functionality.

### Syntax:

	myTree.initSortable(sortFunction);
	
### Arguments:

1. sortFunction - (*function*) function which will be used for sort children. By default sorting based on node names.

### Returns:

* (*Mif.Tree*) this tree.

### Examples:

	var mySortableTree=new Mif.Tree({
		initialize: function(){
			this.initSortable();
		}
		...
	});



Class Mif.Tree.Node {#Mif.Tree.Node::Sort}
==========================================


Mif.Tree.Node Method: sort {#Mif.Tree.Node:sort}
------------------------------------------------

sort this node children.

### Syntax:

	thisNode.sort(sortFunction);
	
### Arguments:

1. node - (*function*) function which will be used for sort children. Default thisNode.tree.sortFunction.

### Returns:

* (*mif:tree:node*) this node.

### Examples:

##### example tree
	
	root
	 |_
	   |-c
	   |-b
	   |-d
	   |-a
	   
##### javascript

	root.sort();
	
##### result tree

	root
	 |_
	   |-a
	   |-b
	   |-c
	   |-d