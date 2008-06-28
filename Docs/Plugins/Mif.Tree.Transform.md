Mif.Tree.Transform {#Mif.Tree.Transform}
========================================

implements move, copy, remove methods for manipulate with tree.


Class Mif.Tree {#Mif.Tree::Transform}
=====================================


Mif.Tree Method: move {#Mif.Tree:move}
--------------------------------------

Move this node after, before or inside another.

### Syntax:

	tree.move(thisNode, node, where);
	
### Arguments:

1. thisNode - (*Mif.Tree.Node*) this node.
1. node - (*Mif.Tree.Node*) node relative which inject this node.
2. where - (*string*) the place to inject this node.

### Events:

* move(source, destination, where) - Function to execute when node moved. where=inside||before||after.

### Returns:

* (*Mif.Tree*) tree.

### Examples:

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
	   
#### move after

##### JavaScript

	tree.move(node1, node2.1, 'after')
	
##### Resulting tree

	root
	 |_
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |-node1
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	   
#### move before

##### JavaScript

	tree.move(node1, node2.1, 'before')
	
##### Resulting tree

	root
	 |_
	   |-node2
	   |  |
	   |  |-node1
	   |  |-node2.1
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	   
#### move inside

##### JavaScript

	tree.move(node1, node2.1, 'inside')
	
##### Resulting tree

	root
	 |_
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |   |
	   |  |   |-node1
	   |  |
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	   

	   


Mif.Tree Method: copy {#Mif.Tree:copy}
--------------------------------------

copy this node after, before or inside another.

### Syntax:

	tree.copy(thisNode, node, where);
	
### Arguments:

1. thisNode - (*Mif.Tree.Node*) this node.
1. node - (*Mif.Tree.Node*) node relative which inject this node.
2. where - (*string*) the place to inject this node.

### Events:

* copy(source, destination, where, copy) - Function to execute when node moved. where=inside||before||after.

### Returns:

* (*Mif.Tree*) tree.

### Examples:

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
	   
#### copy after

##### JavaScript

	tree.copy(node1, node2.1, 'after');

##### Resulting tree

	root
	 |_
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |-node1
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	   
#### copy before

##### JavaScript

	tree.copy(node1, node2.1, 'before')
	
##### Resulting tree

	root
	 |_
	   |-node2
	   |  |
	   |  |-node1
	   |  |-node2.1
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	   
#### copy inside

##### JavaScript

	tree.copy(node1, node2.1, 'inside')
	
##### Resulting tree

	root
	 |_
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |   |
	   |  |   |-node1
	   |  |
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	   




Mif.Tree Method: remove {#Mif.Tree:remove}
------------------------------------------

remove this node.

### Syntax:

	tree.remove(thisNode);
	
### Events:

* remove(node) - Function to execute when node removed.
	

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
	   
##### JavaScript

	tree.remove(node3);

##### resulting tree
	
	root
	 |_
	   |-node1
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |-node2.2
	   |
       |-node4
	   



Class Mif.Tree.Node {#Mif.Tree.Node::Transform}
===============================================


(private) Mif.Tree.Node Method: inject {#Mif.Tree.Node:inject}
--------------------------------------------------------------

inject this node after, before or inside another. It's **private** method. You should use Mif.Tree.move instead.

### Syntax:

	thisNode.inject(node, where);
	
### Arguments:

1. node - (*Mif.Tree.Node*) node relative which inject this node.
2. where - (*string*) the place to inject this node.

### Returns:

* (*element*) dom element.
   
### Note:
It's private method. You should use Mif.Tree.move instead.



(private) Mif.Tree.Node Method: copy {#Mif.Tree.Node:copy}
----------------------------------------------------------

inject copy of this node after, before or inside another. It's **private** method.

### Syntax:

	thisNode.copy(node, where);
	
### Arguments:

1. node - (*Mif.Tree.Node*) node relative which inject copy of this node.
2. where - (*string*) the place to inject this node.

### Returns:

* (*element*) dom element.


### Note:
It's private method. You should use Mif.Tree.copy instead.


(private) Mif.Tree.Node Method: remove {#Mif.Tree.Node:remove}
----------------------------------------------------

remove this node.

### Syntax:

	thisNode.remove();
	
