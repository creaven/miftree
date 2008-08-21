window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			},
			green:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon',// css class close icon
				cls: 'green'
			}
		},
		dfltType:'folder',//default node type
		height: 18//node height
	});

	var json=[
		{
			"property": {
				"name": "root added green type"
			},
			"children": [
				{
					"property": {
						"name": "node1 removed folder type. No more types"
					}
				},
				{
					"property": {
						"name": "node2"
					},
					"state": {
						"open": true
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
	
	tree.addEvent('load', function(){
		this.root.addType('green');
		this.root.getFirst().removeType('folder');
	});
	// load tree from json.
	tree.load({
		json: json
	});
	
	
	
});