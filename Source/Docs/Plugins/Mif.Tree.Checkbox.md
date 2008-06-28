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

### Example: 

	myTree=new Mif.Tree({
		initialize: function(){
			this.initCheckbox('deps');
		}
		...
	});

	
Mif.Tree Method: getChecked {#Mif.Tree:getChecked}
----------------------------------------------

Returns checked checkboxes. 

### Syntax:

	myTree.getChecked();
	