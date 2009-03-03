window.addEvent('domready',function(){
	tree = new Mif.Tree({
		initialize: function(){
			new Mif.Tree.KeyNav(this);
		},
		container: $('tree_container'),// tree container
		forest: true,
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			}
		},
		dfltType:'folder',//default node type
		height: 18//node height
	});
	
	var jsonChildren=[
		{
			"property":{
				"name": "nodeA"
			}
		},
		{
			"property":{
				"name": "nodeB"
			},
			"children": [
				{
					"property":{
						"name": "nodeB.1"
					}
				},
				{
					"property":{
						"name": "nodeB.2",
						"expandTo": true //expandTo
					},
					"children":[
						{
							"property":{
								"name": "nodeB.2.1"
							}
						}
					]
				},
				{
					"property":{
						"name": "nodeB.3"
					}
				}
			]
		},
		{
			"property":{
				"name": "nodeC"
			}
		}
	];

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
								"name": "node2.2",
								"expandTo": true//expandTo
							},
							"children": [
								{
									"property":{
										"name": "node2.2.1"
									}
								},
								{
									"property":{
										"name": "node2.2.2"
									}
								},
								{
									"property":{
										"name": "node2.2.3",
										"loadOptions": {"json": jsonChildren},
										"loadable": true
									}
								}
							]
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
	
	// load tree from json.
	tree.load({
		json: json
	});
	
});