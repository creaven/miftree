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
		height: 18
	})
	.load({
		url: '../assets/files/simpleTree.json'
	})
	.addEvent('load', function(){
		this.root.recursive(function(){
			this.toggle();
		});
	})
	.addEvent('select',function(node){
		$('log').adopt(new Element('li').set('html', node.name+' selected'));
	})
	.addEvent('unSelect', function(node){
		$('log').adopt(new Element('li').set('html', node.name+' unselected'));
	});
});