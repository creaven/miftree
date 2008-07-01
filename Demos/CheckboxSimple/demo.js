window.addEvent('domready',function(){
	var tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			this.initCheckbox('simple');
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
		height: 18,
		onChecked: function(node){
			$('log').adopt(new Element('li').set('html', node.name+' checked'));
		},
		onUnchecked: function(node){
			$('log').adopt(new Element('li').set('html', node.name+' unchecked'));
		}
	});

	//tree.initSortable();
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
						"name": "node2",
						"hasCheckbox": false
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
						"name": "node3",
						hasCheckbox: false
					}
				}
			]
		}
	];
	
	// load tree from json.
	tree.load({
		json: json
	});
});