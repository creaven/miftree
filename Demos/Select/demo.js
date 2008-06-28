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
		height: 18
	})
	.load({
		url: '../assets/files/simpleTree.json'
	})
	.addEvent('onLoad', function(){
		this.root.recursive(function(){
			this.toggle(null, false);
		});
	})
	.addEvent('onSelect',function(node){
		$('log').adopt(new Element('li').set('html', node.name+' selected'));
	})
	.addEvent('onUnSelect', function(node){
		$('log').adopt(new Element('li').set('html', node.name+' unselected'));
	});
});