Mif.Tree.Load {#Mif.Tree.Load}
==============================
Mif.Tree.Load object contains functions used for load nodes.


(private) Function: Mif.Tree.Load.children {#Mif.Tree.Load:Mif.Tree.Load.children}
----------------------------------------------------------------------------------
	
Load children from json object. JSON object structure:

	[	
		{
			"property": (property object),
			"type": (type),
			"data": (user data object),
			"children": [
				(nodes)
			]
		},
		...
		{
			"property": (property object),
			"type": (type),
			"data": (user data object),
			"children": [
				(nodes)
			]
		}
	]
	
### Syntax:

	Mif.Tree.Load.children(children, parent, tree);

### Arguments:

1. children  - (*object*) json children object.
2. parent - (*Mif.Tree.Node*) children parent node.
3. tree - (*Mif.Tree*) tree control.

### Example:

	json=[
		{property:{name:'node1'}},
		{
			property:{name:'node2'},
			children:[
				{property:{name:'node2.1'}}
			]
		}
	]
	Mif.Tree.Load(json, someNode, myMif.Tree);



	
Mif.Tree {#Mif.Tree::Load}
=========================

### Events:
* load         - Function to execute when tree loaded.
* loadChildren - Function to execute when children json loaded.
	
Mif.Tree Method: load {#Mif.Tree:load}}
---------------------------------------

load tree from json and load json if it's neccesary.

### Syntax:

	myTree.load(options);
	
### Arguments:

1. options - (*object*) Request.JSON options or json.

### Returns:

* (*Mif.Tree*) MyTree

### Example:
	
	myTree=new Mif.Tree({
		initialize: function(){
			new Mif.Tree.Drag(this);
			...
		}
		...
	});
	myTree.load('root.json');

### Note:
You can set default options in loadOptions function in Mif.Tree options.

Mif.Tree.Node {#Mif.Tree.Node::Load}
====================================
	
Mif.Tree.Node Method: load {#Mif.Tree.Node:load}
------------------------------------------------

load tree from json and load json if it's neccesary.

### Syntax:

	someNode.load(options);
	
### Arguments:

1. options - (*object*) Request.JSON options or json.

### Returns:

* (*Mif.Tree.Node*) someNode

### Events:

* load  - Function to execute when node loaded.

### Example:
	
	myTree=new Mif.Tree({
		initialize: function(){
			new Mif.Tree.Drag(this);
			...
		},
		loadOptions: function(){
			if(node.name=='empty') return {url: 'empty.json'};
			if(node.data.group='file') return {url: 'getFiles.php',data: {name: node.name}};
		}
		...
	});
	someNode.load();

### Note:
You can set default options in loadOptions function in Mif.Tree options.
