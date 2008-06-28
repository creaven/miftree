Mif.Tree.Hover {#Mif.Tree}
==========================

Implements hover functionality.

	<span class="mif-tree-node-wrapper mif-tree-hover-{{gadjet|icon|name|node}}|node.hoverClass-{{gadjet|icon|name|node}}">
		<span class="mif-tree-gadjet mif-tree-gadjet-{{(minus|plus|none)}}"></span>
		<span class="mif-tree-checkbox mif-tree-checkbox-{{(node.state.checkbox)}}"></span>
		<span class="mif-tree-icon {{(node.openIcon|node.closeIcon|node.middleIcon)}}"></span>          
		<span class="mif-tree-name"></span>
	</span>
	
As u can see it's only add mif-tree-hover-{{target}} class into tree node wrapper by default. But u may use specifice hover class name for some nodes, if this nodes have property hoverClass.

### Note:
If node selected will be also added class

	mif-tree-hover-selected-{{target}} or node.hoverClass-selected-{{target}}

### Examples:

If mouseover gadjet:

	<span class="mif-tree-node-wrapper mif-tree-hover-gadjet mif-tree-hover-node">
		...
	</span>
	
If mouseover icon and node selected:

	<span class="mif-tree-node-wrapper mif-tree-hover-icon mif-tree-hover-node mif-tree-hover-selected-icon mif-tree-hover-selected-node">
		...
	</span>
	
If mouseover name and node.hoverClass='myhover':

	<span class="mif-tree-node-wrapper myhover-name myhover-node">
		...
	</span>

If mouseover node, but not over icon, name or gadjet:

	<span class="mif-tree-node-wrapper mif-tree-hover-node">
		...
	</span>
	
Mif.Tree {#Mif.Tree::hover}
===========================

### Events

hover(node, target, state) - Function to execute when state changed. target=node||gadjet||icon||name, state=out||over;