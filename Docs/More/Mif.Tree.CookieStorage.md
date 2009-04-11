Class Mif.Tree.CookieStorage {#Mif.Tree.CookieStorage}
======================================================
Cookie storage save toggle/checkbox states.

Mif.Tree.CookieStorage Method: constructor {#Mif.Tree.CookieStorage:constructor}
--------------------------------------------------------------------------------

### Implements:
	Options
	
### Syntax:

	var storage = new Mif.Tree.CookieStorage(tree, options);

### Arguments:

1. tree     - (*mif:tree*) tree for witch save states
2. options  - (*object*) Mif.Tree.CookieStorage options.

### Options:

* store(node)     - (*function*) function used to save node. This function should return string. By default node.property.id
* retrieve(value) - (*function*) function used to get node saved using store function. By default Mif.id.
* event           - (*string*: defaults to 'toggle') event which fired when node state change (toggle/switch).
* action          - (*string*: defaults to 'toggle') method used to change node state (toggle/switch)


Mif.Tree.CookieStorage Method: restore {#Mif.Tree.Node:restore}
---------------------------------------------------------------

restore nodes states.

### Syntax:

	storage.restore();
	

### Example:
	
	tree.addEvent('load', function(){
		storage.restore();
	}.addEvent('loadChildren', function(){
		storage.restore();
	});
