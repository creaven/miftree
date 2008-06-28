window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		initialize: function(){
			new  Mif.Tree.KeyNav(this);
		},
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
	.addEvent('onLoad', function(){
		this.root.recursive(function(){
			this.toggle();
		});
		this.select(this.root);
	});
});