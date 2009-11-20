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

Mif.Tree.Node.implement({
    refreshChildren: function() {
		if(this.contains(this.tree.selected)){
			this.tree.unselect();
		}
		this.tree.mouse.node=null;
		this.tree.updateHover();
        this.state.loaded=false;
        this.state.open=false;
        this.state.loadable=true;
        this.children=[];
        this.$draw=false;
        this.tree.$getIndex();
        this.getDOM('children').innerHTML='';
        Mif.Tree.Draw.update(this);
        return this;
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
		/*var storage=new Mif.Tree.CookieStorage(this);
		this.addEvent('load', function(){
			storage.restore();
		}).addEvent('loadChildren', function(parent){
			storage.restore();
		});*/
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
	dfltType:'folder',
	onRename: function(node, newName, oldName){
        node.data.abs_path = node.data.abs_path.replace(oldName,newName);
        var parent = node.getParent();
    	parent.refreshChildren().toggle(true);
	}
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

document.addEvent('keydown', function(event){
	if(event.key!='r') return;
	var node=tree.selected;
    if(!node) return;
    node.rename();
});