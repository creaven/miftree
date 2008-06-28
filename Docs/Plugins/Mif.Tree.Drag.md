Class Mif.Tree.Drag {#Mif.Tree.Drag}
====================================
Implements drag'n'drop functionality

Mif.Tree.Drag Method: constructor {#Tree.Drag:constructor}
----------------------------------------------------------

### Syntax:

new Mif.Tree.Drag(tree, options)

### Arguments:

1. tree - (*Mif.Tree*) tree control.
2. options - (object) Tree.Drag options.

### Options

* snap           - (*number*: defaults to 4) The distance to drag before the Element starts to respond to the drag.
* animate        - (*boolean*: defaults true) animate ghost return path, when drop not allowed.
* open           - (*number*: defaults to 600) time (in ms) during which node not will be opened.
* scrollDelay    - (*number*: defaults to 100) .
* scrollSpeed    - (*number*: defaults to 0.2) .
* modifier       - (*string*: defaults to 'control') if pressed this key modifier node will be copied.
* startPlace     - (*array*: defaults to ['icon', 'name']) dragging begin when mouse is over startPlace

### Events

* start    - Executed when user starts to drag node.
* drag     - Executed on every step of the drag.
* complete - Executed when the user completes the drag.
* cancel   - Executed when the user cancel the drag.


### Example

	var treeWithDragAndDrop = new Tree({
								initialize: function(){
									new Tree.Drag(this, {
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