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
			$('source').innerHTML = Mif.Drag.current.name;
		},
		onDrag: function(){
			//inject book inside book not allowed;
			if(Mif.Drag.target && Mif.Drag.target.type == 'book' && Mif.Drag.current.type == 'book' && Mif.Drag.where == 'inside'){
				Mif.Drag.where = 'notAllowed';
			};
			$('destination').innerHTML = Mif.Drag.target ? Mif.Drag.target.name : '';
			$('where').innerHTML = Mif.Drag.where;
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
	}).makeDraggable({
		onDrag: function(){
			$('destination').innerHTML = Mif.Drag.target ? Mif.Drag.target.name : '';
			$('where').innerHTML = this.where;
		},
		onStart: function(){
			$('source').innerHTML = Mif.Drag.current.name;
		},
		onComplete: function(){
			$('destination').innerHTML = '';
			$('where').innerHTML = '';
			$('source').innerHTML = '';
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