window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		initialize: function(){
			var storage=new Mif.Tree.CookieStorage(this);
			this.addEvent('load', function(){
				storage.restore();
			});
		},
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			}
		},
		dfltType:'folder',//default node type
		height: 18//node height
	});

	var json=[
		{
			"property": {
				"name": "root",
				"id": "root"
			},
			"children": [
				{
					"property": {
						"name": "node1",
						"id": "node1"
					}
				},
				{
					"property": {
						"name": "node2",
						"id": "node2"
					},
					"children":[
						{
							"property": {
								"name": "node2.1",
								"id": "node2.1"
							}
						},
						{
							"property": {
								"name": "node2.2",
								"id": "node2.2"
							},
							"children":[
								{
									"property": {
										"name": "node2.2.1",
										"id": "node2.2.1"
									}
								},
								{
									"property": {
										"name": "node2.2.2",
										"id": "node2.2.2"
									}
								}
							]
						}
					]
				},
				{
					"property": {
						"name": "node4",
						"id": "node4"
					},
					"children":	[
						{
							"property":{
								"name": "nodeX",
								"id": "nodeXXXX"
							}
						},
						{
							"property":{
								"name": "nodeY",
								"id": "nodeY"
							}
						}
					]
				},
				{
					"property": {
						"name": "node3",
						"id": "node3"
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