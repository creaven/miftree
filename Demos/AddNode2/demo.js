window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			}
		},
		dfltType:'folder',
		height:20
	})
	.addEvent('load', function(){
		var root=this.root;
		var newNode=new Mif.Tree.Node({
            parentNode: root,
            tree: tree
            }, {property:{name: 'node1'}});
        tree.add(newNode, root, 'inside');

        var newNode2=new Mif.Tree.Node({
            parentNode: newNode,
            tree: tree
            }, {property:{name: 'node1.1'}});
        tree.add(newNode2, newNode, 'inside');
	});
	tree.load({
		json: [{property:{name: 'root'}}]
	})
	
});