window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		container: $('tree_container'),
		grid: true,
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
		this.root.recursive(function(){
			this.toggle();
		});
		this.select(this.root);
	});
	
	
	$('add_node').addEvent('click', function(){
		var current=SimpleTree.selected;
		SimpleTree.add({
			property: {
				name: $('node_name').value
			}
		}, current, $('where').getElement(':selected').innerHTML);
		return false;
	});
	
});