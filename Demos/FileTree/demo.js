Mif.Tree.Node.implement({
		
	getPath: function(){
		var path=[];
		var node=this;
		while(node){
			path.push(node.name);
			node=node.getParent();
		}
		return path.reverse().join('/');
	}

});

var tree = new Mif.Tree({
	container: $('tree_container'),
	initialize: function(){
		this.initSortable();
		new Mif.Tree.KeyNav(this);
		this.addEvent('nodeCreate', function(node){
			node.set({
				property:{
					id:	node.getPath()
				}
			});
		});
		var storage=new Mif.Tree.CookieStorage(this);
		this.addEvent('load', function(){
			storage.restore();
		}).addEvent('loadChildren', function(parent){
			storage.restore();
		});
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