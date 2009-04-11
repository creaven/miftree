window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		initialize: function(){
			this.initCheckbox('simple');
			var storage=new Mif.Tree.CookieStorage(this);
			var checkboxStorage=new Mif.Tree.CookieStorage(this, {event: 'switch', action: 'switch'});
			this.addEvent('load', function(){
				storage.restore();
				checkboxStorage.restore();
			}).addEvent('loadChildren', function(){
				storage.restore();
				checkboxStorage.restore();
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
	
	var children=[
		{
			"property": {
				"name": "cnode1",
				"id": "cnode1"
			}
		},
		{
			"property": {
				"name": "cnode2",
				"id": "cnode2"
			},
			"children":	[
				{
					"property":{
						"name": "cnodeX",
						"id": "cnodeXXXX"
					}
				},
				{
					"property":{
						"name": "cnodeY",
						"id": "cnodeY"
					},
					"children":[
						{
							"property":{
								"name": "cnodeZ",
								"id": "cnodeZ"
							}
						},
						{
							"property":{
								"name": "cnodeL",
								"id": "cnodeL"
							}
						}
					]
				}
			]
		},
		{
			"property":{
				"name": "cnode3",
				"id": "cnode3"
			}
		}
	];

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
						"name": "node3 loadable",
						"id": "node3",
						"loadable": true,
						"loadOptions": {json: children}
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