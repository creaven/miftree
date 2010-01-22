Mif.Tree
========
The most famouse mootools tree for web applications.

![Screenshot](http://mifjs.net/assets/images/tree_checkbox_demo.jpg)

How to use
----------

[demo](http://mifjs.net/tree/Demos/index.html)
[docs](http://mifjs.net/tree/Docs/index.html)

	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
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

	// load tree from json.
	tree.load({
		json: json
	});
