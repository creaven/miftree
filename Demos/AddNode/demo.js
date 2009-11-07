window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		container: $('tree_container'),
		onNodeCreate: function(node){
			node.set({id: node.name});
		},
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			}
		},
		dfltType:'folder',
		height:20
	})
	.load({
		url: '../assets/files/simpleTree.json'
	})
	.addEvent('load', function(){
		this.root.toggle();
		this.select(this.root);
		Mif.id('node2.1').inject(Mif.id('node4'));
	});
	
	
	$('add_node').addEvent('click', function(){
		var current=SimpleTree.getSelected();
		if(!current) return;
		SimpleTree.add({
			property: {
				name: $('node_name').value
			}
		}, current, $('where').getElement(':selected').innerHTML);
		return false;
	});
	
});