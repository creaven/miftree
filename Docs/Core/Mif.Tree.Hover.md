Mif.Tree.Hover {#Mif.Tree}
==========================

Implements hover functionality.

	<span class="mif-tree-node-wrapper mif-tree-hover-{{toggle|icon|name|node}}|node.hoverClass-{{toggle|icon|name|node}}">
		<span class="mif-tree-toggle mif-tree-toggle-{{(minus|plus|none)}}"></span>
		<span class="mif-tree-checkbox mif-tree-checkbox-{{(node.property.checkbox)}}"></span>
		<span class="mif-tree-icon {{(node.openIcon|node.closeIcon|node.middleIcon)}}"></span>          
		<span class="mif-tree-name"></span>
	</span>
	
As u can see it's only add mif-tree-hover-{{target}} class into tree node wrapper by default. But u may use specifice hover class name for some nodes, if this nodes have property hoverClass.

### Note:
If node selected will be also added class

	mif-tree-hover-selected-{{target}} or node.hoverClass-selected-{{target}}

### Examples:

If mouseover toggle:

	<span class="mif-tree-node-wrapper mif-tree-hover-toggle mif-tree-hover-node">
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

If mouseover node, but not over icon, name or toggle:

	<span class="mif-tree-node-wrapper mif-tree-hover-node">
		...
	</span>
	
Mif.Tree {#Mif.Tree::hover}
===========================

### Events

hover(node, target, state) - Function to execute when state changed. target=node||toggle||icon||name, state=out||over;