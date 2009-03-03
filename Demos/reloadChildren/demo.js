window.addEvent('domready',function(){

	Mif.Tree.Node.implement({
		reloadChildren: function() {
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

	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.KeyNav(this);
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
		height: 18
	});
	
	tree.addEvent('loadChildren', function(parent){
		if(!parent) return;
		if(!parent.$name){
			parent.$name=parent.name;
		}
		parent.set({
			property:{
				name: parent.$name+' ('+parent.children.length+')'
			}
		});
	});

	tree.load({
		json:[{
			property: {name: 'reload me', loadable: true}
		}]
	});

	tree.loadOptions=function(node){
		return {
			url: 'reloadChildren/get_json.php?'+$time()
		};
	}
	
	$('reload').addEvent('click', function(){
		var selected=tree.getSelected();
		if(!selected) return;
		selected.reloadChildren().toggle(true);
	});
	
});