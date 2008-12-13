window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.KeyNav(this);
			new Mif.Tree.Drag(this, {
				beforeDrop: function(current, target, where){
					if(confirm('drop node?')){
						this.drop();
					}else{
						this.emptydrop();
					}
				}
			});
		},
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			},
			loader:{
				openIcon: 'mif-tree-loader-open-icon',
				closeIcon: 'mif-tree-loader-close-icon',
				dropDenied: ['inside','after']
			},
			disabled:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon',
				dragDisabled: true,
				cls: 'disabled'
			},
			book:{
				openIcon: 'mif-tree-book-icon',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			bin:{
				openIcon: 'mif-tree-bin-open-icon',
				closeIcon: 'mif-tree-bin-close-icon'
			}
		},
		dfltType:'folder',
		height: 18,
		onCopy: function(from, to, where, copy){
			if(from.getParent()==copy.getParent()){
				copy.set({
					property: {
						name: 'copy '+from.name
					}
				});
			}
		}
	});

	//tree.initSortable();
	tree.load({
		url: '../assets/files/forest.json'
	});
	
});