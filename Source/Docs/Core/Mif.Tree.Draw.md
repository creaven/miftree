Mif.Tree.Draw {#Mif.Tree.Draw}
======================

Mif.Tree.Draw object contains functions used for create and update Mif.Tree HTML structure.


(private) Function: Mif.Tree.Draw.children {#Mif.Tree.Draw.children}
---------------------

Creates html structure for node children.
Html structure is:

	<div class="mif-tree-node">
		 <span class="mif-tree-node-wrapper node.cls">
			<span class="mif-tree-gadjet mif-tree-gadjet-(minus|plus|none)"></span>
			<span class="mif-tree-checkbox mif-tree-checkbox-(node.state.checkbox)"></span>
			<span class="mif-tree-icon (node.openIcon|node.closeIcon|node.middleIcon)"></span>          
			<span class="mif-tree-name"></span>
		</span>
		<div class="node-children">
			//node childrens
		</div>
	</div>
	
### Syntax:

	Mif.Tree.Draw.children(node);

### Arguments:

1. node - (*Mif.Tree.Node*) node parent for drawing children.



### Example:

	Mif.Tree.Draw.children(someNode)

(private) Function: Mif.Tree.Draw.update {#Mif.Tree.Draw.update}
----------------------------------------------------------------

Updates node html structure.

### Syntax:

Mif.Tree.Draw.update(node);

### Arguments:

1. node - (*Mif.Tree.Node*) node for updates.

### Example:

	Mif.Tree.Draw.update(someNode)
	
	
Mif.Tree {#Mif.Tree:Draw}
=========================

### Events:

* drawChildren(node)  - Function to execute when node children drawn.