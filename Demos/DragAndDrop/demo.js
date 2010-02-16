window.addEvent('domready',function(){
	
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
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
	}).makeDraggable({
		onStart: function(){
			$('source').innerHTML = Mif.Tree.Drag.current.name;
		},
		onDrag: function(){
			//inject book inside book not allowed;
			if(Mif.Tree.Drag.target && Mif.Tree.Drag.target.type == 'book' && Mif.Tree.Drag.current.type == 'book' && Mif.Tree.Drag.where == 'inside'){
				Mif.Tree.Drag.where = 'notAllowed';
			};
			$('destination').innerHTML = Mif.Tree.Drag.target ? Mif.Tree.Drag.target.name : '';
			$('where').innerHTML = Mif.Tree.Drag.where;
		},
		onComplete: function(){
			$('destination').innerHTML = '';
			$('where').innerHTML = '';
			$('source').innerHTML = '';
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
	
	tree2 = new Mif.Tree({
		container: $('tree_container2'),
		initialize: function(){
			new Mif.Tree.KeyNav(this);
			/*new Mif.Tree.Drag(this, {
				onDrag: function(){
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
			});*/
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
				dragDisbled: true,
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

	var json=[	
		{
			"property": {
				"name": "root"
			},
			"children": [
				{
					"property": {
						"name": "node1"
					}
				},
				{
					"property": {
						"name": "node2"
					},
					"children":[
						{
							"property": {
								"name": "node2.1"
							}
						},
						{
							"property": {
								"name": "node2.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node4"
					}
				},
				{
					"property": {
						"name": "node3"
					}
				}
			]
		}
	];
	tree2.load({
		json: json
	});
	
});