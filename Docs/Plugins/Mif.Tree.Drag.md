Class Mif.Tree.Drag {#Mif.Tree.Drag}
====================================
Implements drag'n'drop functionality

Mif.Tree.Drag Method: constructor {#Mif.Tree.Drag:constructor}
----------------------------------------------------------

### Syntax:

new Mif.Tree.Drag(tree, options)

### Arguments:

1. tree - (*Mif.Tree*) tree control.
2. options - (*object*) Mif.Tree.Drag options.

### Options

* snap           - (*number*: defaults to 4) The distance to drag before the Element starts to respond to the drag.
* animate        - (*boolean*: defaults true) animate ghost return path, when drop not allowed.
* open           - (*number*: defaults to 600) time (in ms) during which node not will be opened.
* scrollDelay    - (*number*: defaults to 100) .
* scrollSpeed    - (*number*: defaults to 0.2) .
* modifier       - (*string*: defaults to 'control') if pressed this key modifier node will be copied.
* startPlace     - (*array*: defaults to ['icon', 'name']) dragging begin when mouse is over startPlace
* group          - (*mixed*: string or array, defaults to 'tree') A named drag drop group to which this object belongs. This tree will only interact with other drag drop objects in the same group.
* droppables     - (*array*: defaults to []) The objects that the draggable can drop into.

### Events

* start     - Executed when user starts to drag node.
* drag      - Executed on every step of the drag.
* complete  - Executed when the user completes the drag.
* cancel    - Executed when the user cancel the drag before start.
* drop      - Executed when the user drop node. Receives the dragged node as first argument, target node as second, where drop as third.
* emptydrop - Executed when drop not allowed.


### Example

	var treeWithDragAndDrop = new Mif.Tree({
								initialize: function(){
									new Mif.Tree.Drag(this, {
										onComplete: function(){
											alert('Drag complete!');
										}
									});
								},
								//...other options
							})
							
Class Mif.Tree.Node {#Mif.Tree.Node::Drag}
==========================================

### Properties

* dragDisabled - (*boolean*) disable dragging
* dropDenied  -  (*array*) deny drop before, after or inside this node.