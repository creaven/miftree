window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.KeyNav(this);
			new Mif.Tree.Drag(this, {
				onDrag: function(){
					//inject book inside book not allowed;
					if(this.target && this.target.type=='book' && this.current.type=='book' && this.where=='inside'){
						this.where='notAllowed';
					}
					$('destination').innerHTML=this.target ? this.target.name : '';
					$('where').innerHTML=this.where;
				},
				onStart: function(){
					$('source').innerHTML=this.current.name;
				},
				onComplete: function(){
					$('destination').innerHTML='';
					$('where').innerHTML='';
					$('source').innerHTML='';
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
			url: '../assets/files/bigTree.json'
		};
	}
	/*tree.addEvent('load', function(){
		tree.root.recursive(function(){
			console.log(this.name);
			if(this.name=='empty') {
				arguments.callee.stopRecursion=true;
				return false;
			}
			if(arguments.callee.stopRecursion){
				return false;
			}
		});
	});*/
});