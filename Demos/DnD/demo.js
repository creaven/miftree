window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.KeyNav(this);
			new Mif.Tree.Drag(this, {
				droppables: [
					new Mif.Tree.Drag.Element('drop_container',{
						onDrop: function(node){
							$('drop').adopt(new Element('li',{html: node.name}));
						}
					})
				],
				onDrop: function(current, target, where){
					//console.log(current, target, where);
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
		forest: true,
		container: $('tree_container2'),
		initialize: function(){
			new Mif.Tree.KeyNav(this);
			new Mif.Tree.Drag(this);
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