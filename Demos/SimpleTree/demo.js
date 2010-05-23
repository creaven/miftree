window.addEvent('domready',function(){
	
	tree = new Mif.Tree().inject('tree');
	//tree = new Mif.Tree({container: 'tree'});
	
	var json = [
		{"name": "root", "children": [
			{"name": "node1"},
			{"name": "node2", "children": [
				{"name": "node2.1", "open": true},
				{"name": "node2.2"}
			]},
			{"name": "node3"}
		]}
	];
	
	tree.load({json: json});
	
});
