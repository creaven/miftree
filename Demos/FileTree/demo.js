var tree = new Mif.Tree({
	container: $('tree_container'),
	initialize: function(){
		this.initSortable();
		new Mif.Tree.KeyNav(this);
	},
	types: {
		folder:{
			openIcon: 'mif-tree-open-icon',
			closeIcon: 'mif-tree-close-icon',
			loadable: true
		},
		file:{
			openIcon: 'mif-tree-file-open-icon',
			closeIcon: 'mif-tree-file-close-icon'
		},
		loader:{
			openIcon: 'mif-tree-loader-open-icon',
			closeIcon: 'mif-tree-loader-close-icon',
			DDnotAllowed: ['inside','after']
		}
	},
	dfltType:'folder'
});

tree.load({
	url: demo_path+'getRoot.php'
});

tree.loadOptions=function(node){
	return {
		url: demo_path+'getChildren.php',
		data: {'abs_path': node.data.abs_path}
	};
};