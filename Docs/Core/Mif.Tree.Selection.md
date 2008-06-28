Mif.Tree {#Mif.Tree::Selection}
===============================
	
Mif.Tree Method: select {#Mif.Tree:select}
------------------------------------------

Sets the currently selected node. 

### Syntax:

	myTree.select(node);
	

### Arguments:

1. node - (*Mif.Tree.Node*) node which will be selected.

### Example: 

	myTree.select(someNode);

### Events:

* select(node)              - Function to execute when node selected.
* unSelect(node)            - Function to execute when node unselected.
* selectChange(node, state) - Function to execute when node selection changed.
	
Mif.Tree Method: unselect {#Mif.Tree:unselect}
----------------------------------------------

Remove selection. 

### Syntax:

	myTree.unselect();
	


Mif.Tree Method: getSelected {#Mif.Tree:getSelected}
----------------------------------------------------

Returns selected node. 

### Syntax:

	myTree.getSelected();

	
Mif.Tree Method: isSelected {#Mif.Tree:isSelected}
--------------------------------------------------

Returns true if node selected. 

### Syntax:

	myTree.isSelected(someNode);


	
Mif.Tree.Node {#Mif.Tree.Node::Selection}
=========================================
	
Mif.Tree.Node Method: isSelected {#Mif.Tree.Node:isSelected}
------------------------------------------------------------

Returns true if node selected. 

### Syntax:

	someNode.isSelected();


