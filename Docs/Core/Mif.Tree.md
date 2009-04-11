Class Mif.Tree {#Mif.Tree}
==========================
Create javascript Tree control.

### Implements:
	Events, Options

Mif.Tree Method: constructor {#Mif.Tree:constructor}
------------------------------------------------
	
### Syntax:

	var myTree = new Mif.Tree(options);

### Arguments:

1. options  - (*object*) Mif.Tree options.

### Options:

* types         - (*object*) node types. Object with keys - type names and values - type properties. Properties will be added as default properties for all nodes of this type. Properties is the Mif.Tree.Node properties. See Mif.Tree.Node properties for more info.
* dfltType      - (*string*) default type.
* forest        - (*boolean*: defaults to false) if true tree don't have root node.
* animateScroll - (*boolean*: defaults to true) animate scrollTo function.
* height        - tree node height.
* expandTo      - (*boolean*: defaults to true) if true loaded nodes with expandTo property set to true will be shown using expandTo function.

### Events:

* toggle(node, state) - Function to execute when expand or collapse node. On expand state=true, on collapse state=false
* nodeCreate(node)    - Function to execute after new node initialize.

### Properties:

* UID - tree control unique identifier.


### Example:

##### javascript
	var testTree=new Mif.Tree({
		types:{
			nodeType:{
				openIcon: 'node-open-icon',//node-open-icon - css class for open icon.
				closeIcon: 'node-close-icon'
			}
		},
		dfltType: 'nodeType'
	});
	testTree.load({
		[
			{
				property: {name: 'root'},
				children:[
					{
						property:{name:'node1'}
					},
					{
						property:{name:'node2'},
						children:[
							{property:{name:'node2.1'}}
						]
					}
				]
			}
		]
	});
	testTree.addEvent('onToggle',function(node, state){
		alert('Node '+node.name+(state ? 'expanded' : 'collapsed'));
	});
	

##### resulting tree:

    root
	 |_
	   |-node1
	   |-node2
	      |-node2.1




	
Mif.Tree Method: scrollTo {#Mif.Tree:scrollTo}
----------------------------------------------

Scrolls the node into view.

### Syntax: 
	
	myTree.scrollTo(someNode);

### Arguments:

1. node - (*Mif.Tree.Node*) node which will scrolled into view.

### Note: 
	This function used in Mif.Tree.Drag and Mif.Tree.Transform.
	


Mif.Tree Method: expandTo {#Mif.Tree:expandTo}
----------------------------------------------

Make node visible, expanding all parent nodes.

### Syntax: 
	
	myTree.expandTo(node);

### Arguments:

1. node - (*Mif.Tree.Node*) node which will be visible.

### Return:

This tree