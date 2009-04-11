Mif.Tree.Checkbox {#Mif.Tree.Checkbox}
======================================

Implements checkboxes.

Mif.Tree {#Mif.Tree::Checkbox}
==============================

Mif.Tree Method: initCheckbox {#Mif.Tree:initCheckbox}
------------------------------------------------------

Add checkbox support. 

### Syntax:

	tree.initCheckbox(type);
	

### Arguments:

1. type - (*string*: defaults to 'simple') checkbox type. Type may be 'simple' or 'deps'. Simple checkboxes have 2 states: checked and unchecked. Checkboxes with dependencies 3 states: checked, unchecked, partially (checked).

### Events:

* check - fired when node checked;
* unCheck - fired when node unchecked;
* switch(node, state) - fired when checkbox state changed

### Example: 

	myTree=new Mif.Tree({
		initialize: function(){
			this.initCheckbox('deps');
		}
		...
	});

	
Mif.Tree Method: getChecked {#Mif.Tree:getChecked}
--------------------------------------------------

Returns checked checkboxes. 

### Syntax:

	myTree.getChecked();
	
	

Mif.Tree.Node {#Mif.Tree.Node::Checkbox}
========================================

### Properties:

**property**

* hasCheckbox - show node has checkbox or not.

**state**

* checked - node checkbox state

Mif.Tree.Node Method: switch {#Mif.Tree.Node:switch}
----------------------------------------------------

switch checkbox state.

### Syntax:

	someNode.switch(state);
	
### Arguments:

1. state - (*string*) If state=true check node, if false - uncheck.

### Returns:

* (*mixed*) 

### Example:
	
	someNode.switch();