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
	.addEvent('toggle',function(node, state){
		$('log').adopt(new Element('li').set('html', node.name+' '+(state ? 'expanded' : 'collapsed')));
	});
});