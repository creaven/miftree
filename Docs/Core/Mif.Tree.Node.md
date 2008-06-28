Class Mif.Tree.Node {#Mif.Tree.Node}
===================================
Tree node class.

### Implements:
	Events

MIf.Tree.Node Method: constructor {#Mif.Tree.Node:constructor}
------------------------------------------------
	
### Syntax:

	var node = new Mif.Tree.Node(structure, options);

### Arguments:

1. structure - (*object*) object {tree: tree, parentNode: parent}
1. options   - (*object*) Mif.Tree.Node options.

### Options:

* property         - (*object*) node attributes.
* data        - (*boolean*) user data object.

### Properties:

**property**

* name      - node name.  
* openIcon  - css class for open icon.
* closeIcon - css class for close icon.
* cls       - extra css class addes to node wrapper. See also html node structure in Mif.Tree.Draw.
* loadable  - Load nodes on expand using Mif.Tree.Node load method if node.state.loaded=false.

**state**

* state     - node state object: {open:*boolean*, loaded:*boolean*}

**structure**

* parentNode - parent node
* tree       - node tree control



### Example:
	var newNode=new Mif.Tree.Node({
		parentNode: node1,
		tree: tree
	});




Mif.Tree.Node Method: getDOM {#Mif.Tree.Node:getDOM}
-----------------------------------------------------

return node dom structure element. See also Mif.Tree.Draw.

### Syntax:

	someNode.getDOM(what);
	
### Arguments:

1. what - (*string*) wrapper or icon or node or name.

### Returns:

* (*element*) dom element.

### Example:
	
	someNode.getDOM('name');


Mif.Tree.Node Method: toggle {#Mif.Tree.Node:toggle}
-----------------------------------------------------

By default toggles the node between expanded/collapsed.

### Syntax:

	someNode.toggle(state);
	
### Arguments:

1. state - (*string*) If state=true only expand node, if false - collapse.

### Returns:

* (*Mif.Tree.Node*) toggled node.

### Example:
	
	someNode.toggle();

Mif.Tree.Node Method: recursive {#Mif.Tree.Node:recursive}
----------------------------------------------------------

recursive walk throuth the tree and apply some function for each node.

### Syntax:

	node.recursive(fn, args);
	
### Arguments:

1. fn - (*function*) function which applied to each node.
2. args - (*boolean*) function arguments.

### Example:
	
	this.root.recursive(function(){
		this.toggle(null, false);
	});
	//expandes tree

Mif.Tree.Node Method: isOpen {#Mif.Tree.Node:isOpen}
----------------------------------------------------

return true if node opened, else false.

### Syntax:

	node.isOpen();
	
### Returns:
	
* (*boolean*) true if this is open node, either false.

### Example:
	
	alert(someNode.isOpen());

Mif.Tree.Node Method: isLoaded {#Mif.Tree.Node:isLoaded}
--------------------------------------------------------

Return true if node were loaded.

### Syntax:

	node.isLoaded();
	
### Returns:

* (*boolean*) true if this is loaded node, either false.

### Example:
	
	alert(someNode.isLoaded());




Mif.Tree.Node Method: isLast {#Mif.Tree.Node:isLast}
-----------------------------------------------------

return true if this is last child

### Syntax:

	node.isLast();
	
### Returns:

* (*boolean*) true if this is last node either false.

### Example:
	
	alert(someNode.isLast());

	

Mif.Tree.Node Method: isFirst {#Mif.Tree.Node:isFirst}
------------------------------------------------------

return true if this is first child

### Syntax:

	node.isFirst();
	
### Returns:

* (*boolean*) true if this is first child either false.

### Example:
	
	alert(someNode.isFirst());

	

Mif.Tree.Node Method: isRoot {#Mif.Tree.Node:isRoot}
----------------------------------------------------

return true if this is root node

### Syntax:

	node.isRoot();
	
### Returns:

* (*boolean*) true if this is root node either false.

### Example:
	
	alert(someNode.isRoot());



Mif.Tree.Node Method: getChildren {#Mif.Tree.Node:getChildren}
--------------------------------------------------------------

return this node children

### Syntax:

	node.getChildren();
	
### Returns:

* (*array*) this node children.

### Example:
	
	someNode.getChildren();


Mif.Tree.Node Method: getNext {#Mif.Tree.Node:getNext}
------------------------------------------------------

returns next node.

### Syntax:

	node.getNext();
	
### Returns:

* (*Mif.Tree.Node*) next node or null.

### Example:
	
	someNode.getNext();

Mif.Tree.Node Method: getPrevious {#Mif.Tree.Node:getPrevious}
--------------------------------------------------------------

returns previous node.

### Syntax:

	node.getPrevious();
	
### Returns:

* (*Mif.Tree.Node*) previous node or null.

### Example:
	
	someNode.getPrevious();

Mif.Tree.Node Method: getFirst {#Mif.Tree.Node:getFirst}
--------------------------------------------------------

returns first child.

### Syntax:

	node.getFirst();
	
### Returns:

* (*Mif.Tree.Node*) first child or null.

### Example:
	
	someNode.getFirst();

	
Mif.Tree.Node Method: getLast {#Mif.Tree.Node:getLast}
------------------------------------------------------

returns last child.

### Syntax:

	node.getLast();
	
### Returns:

* (*Mif.Tree.Node*) last child or null.

### Example:
	
	someNode.getLast();

Mif.Tree.Node Method: getParent {#Mif.Tree.Node:getParent}
----------------------------------------------------------

returns parent node.

### Syntax:

	node.getParent();
	
### Returns:

* (*Mif.Tree.Node*) parent node or null.

### Example:
	
	alert(someNode.getParent().name);



Mif.Tree.Node Method: getNextVisible {#Mif.Tree.Node:getNextVisible}
--------------------------------------------------------------------

returns next visible node.

### Syntax:

	node.getNextVisible();
	
### Returns:

* (*Mif.Tree.Node*) next visible node or null.

### Example:
	
	someNode.getNextVisible();
	


Mif.Tree.Node Method: getPreviousVisible {#Mif.Tree.Node:getPreviousVisible}
----------------------------------------------------------------------------

returns previous visible node.

### Syntax:

	node.getPreviousVisible();
	
### Returns:

* (*Mif.Tree.Node*) previous visible node or null.

### Example:
	
	someNode.getPreviousVisible();
	

Mif.Tree.Node Method: getVisiblePosition {#Mif.Tree.Node:getVisiblePosition}
----------------------------------------------------------------------------

returns position of node. If node invisible -1.

### Syntax:

	node.getVisiblePosition();
	
### Returns:

* (*number*) visible position.

### Example:
	
	alert(someNode.getVisiblePosition()==-1 ? someNode.name+' invisilbe' : someNode.name+' visible');
	
Mif.Tree.Node Method: contains {#Mif.Tree.Node:contains}
--------------------------------------------------------

returns true if this node contains other node.

### Syntax:

	node.contains(someNode);
	
### Argumens:

1. node - (*Mif.Tree.Node*) examined node.
	
### Returns:

* (*boolean*) returns true if this node contains other node or this is same node. Either false.

### Example:

##### example tree
	
	root
	 |_
	   |-node1
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	
##### javascript

	alert(node2.contains(node2.1));//alert true.
	alert(node2.contains(node2));//alert true.
	alert(node3.contains(node1));//alert false;
	

Mif.Tree.Node Method: addType {#Mif.Tree.Node:addType}
------------------------------------------------------

add type to node (analog addClass for dom elements).

### Syntax:

	node.addType(type);
	
### Argumens:

1. type - (*string*) added type name.
	
### Returns:

* (*Mif.Tree.Node*) returns this node.

### Example:
	
	someNode.addType('bin');
	

Mif.Tree.Node Method: removeType {#Mif.Tree.Node:removeType}
------------------------------------------------------------

remove node type (analog removeClass for dom elements).

### Syntax:

	node.removeType(type);
	
### Argumens:

1. type - (*string*) removed type name.
	
### Returns:

* (*Mif.Tree.Node*) returns this node.

### Example:
	
	someNode.removeType('folder');
	

Mif.Tree.Node Method: set {#Mif.Tree.Node:set}
------------------------------------------------------------

set node properties.

### Syntax:

	node.set(props);
	
### Argumens:

1. props - (*object*) set props to node. Props may be property, data, type, state.
	
### Returns:

* (*Mif.Tree.Node*) returns this node.

### Example:
	
	node.set({
		property: {
			name: 'new node name',
			openIcon: 'some-open-icon'
		}
		type: 'file',
		data: {
			x: 'y'
		}
	});
	
	
	
	