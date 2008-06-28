window.addEvent('domready',function(){
	var tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.KeyNav(this);
			this.initRows();
			new Mif.Tree.Drag(this,{
				startPlace: ['node', 'icon', 'name']
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
				DDnotAllowed: ['inside','after']
			},
			disabled:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon',
				DDdisabled: true,
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
			if(from.parent==copy.parent){
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

	tree.loadOptions=function(node){
		// if node name 'empty' load from url 'empty.json'
		if(node.name=='empty'){
			return {
				url: '../assets/files/empty.json'
			}
		}
		return {
			url: '../assets/files/mediumTree.json'
		};
	}
	tree.wrapper.addEvent('keydown',function(event){
		if(event.key!='enter') return;
		if(!tree.selected) return;
		tree.selected.remove();
	});
});