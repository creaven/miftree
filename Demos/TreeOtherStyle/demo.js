window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		container: $('tree_container'),
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			}
		},
		dfltType:'folder',
		animate: {
			toggle: false
		},
		height:20
	})
	.load({
		url: '../assets/files/simpleTree.json'
	})
	.addEvent('onLoad', function(){
		this.root.recursive(function(){
			this.toggle(null, false);
		});
		this.select(this.root);
	});
});