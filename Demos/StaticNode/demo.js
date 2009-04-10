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
	.load({
		url: '../assets/files/simpleTree.json'
	})
	.addEvent('load', function(){
		this.root.recursive(function(){
			this.toggle();
		});
		this.select(this.root);
	});
	
	
	$('rename').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    node.rename();
	});
	
	
	$('remove').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    node.remove();
	});	


	$('static').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    
	    node.set({property:{renameDenied: node.property.renameDenied?false:true, removeDenied: node.property.removeDenied?false:true}});
	});	
		
});