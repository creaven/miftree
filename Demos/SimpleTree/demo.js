window.addEvent('domready',function(){
	tree = new Mif.Tree({
		initialize: function(){
			new Mif.Tree.Drag(this);
		},
		container: $('tree_container'),// tree container
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			}
		},
		dfltType:'folder',//default node type
		height: 19//node height
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
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				},
				{
					"property": {
						"name": "node5"
					}
				},
				{
					"property": {
						"name": "node6"
					},
					"children":[
						{
							"property": {
								"name": "node6.1"
							}
						},
						{
							"property": {
								"name": "node6.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node7"
					}
				}
			]
		}
	];
	
	// load tree from json.
	tree.load({
		json: json
	});
	
	tree.root.toggle();
	
	var bg=new Element('div', {'class': 'mif-tree-node-bg'}).inject(tree.wrapper, 'top');
	
	var left=new Element('div', {'class': 'mif-tree-node-bg-left'});
	var right=new Element('div', {'class': 'mif-tree-node-bg-right'});
	
	bg.adopt(left, right);
	
	
	var bg_selected=new Element('div', {'class': 'mif-tree-node-bg-selected'}).inject(bg, 'after');
	
	var left=new Element('div', {'class': 'mif-tree-node-bg-left-selected'});
	var right=new Element('div', {'class': 'mif-tree-node-bg-right-selected'});
	
	bg_selected.adopt(left, right);
	
	
	var bg_draged=new Element('div', {'class': 'mif-tree-node-bg-draged'}).inject(bg, 'after');
	
	var left=new Element('div', {'class': 'mif-tree-node-bg-left-draged'});
	var right=new Element('div', {'class': 'mif-tree-node-bg-right-draged'});
	
	bg_draged.adopt(left, right);
	
	
	
	
	
	
	tree.addEvent('hover', function(node, target, state){
		if(  !( tree.hoverState.icon || tree.hoverState.name )  ){
			bg.setStyle('top', -100);
		}else{
			bg.setStyles({
				top: node.getVisiblePosition()*tree.height,
				left: node.getDOM('icon').getLeft()-tree.container.getLeft()+tree.wrapper.scrollLeft,
				width: node.getDOM('name').getLeft()+node.getDOM('name').offsetWidth-node.getDOM('icon').getLeft()
			});
		}
	});
	
	tree.addEvent('select', function(node){
		bg_selected.setStyles({
			top: node.getVisiblePosition()*tree.height,
			left: node.getDOM('icon').getLeft()-tree.container.getLeft()+tree.wrapper.scrollLeft,
			width: node.getDOM('name').getLeft()+node.getDOM('name').offsetWidth-node.getDOM('icon').getLeft()
		});
	});
	
	tree.addEvent('toggle', function(node){
		var selected=tree.getSelected();
		if(!selected) return;
		if(selected.getVisiblePosition()!=-1){
			node=selected;
			bg_selected.setStyles({
				top: node.getVisiblePosition()*tree.height,
				left: node.getDOM('icon').getLeft()-tree.container.getLeft()+tree.wrapper.scrollLeft,
				width: node.getDOM('name').getLeft()+node.getDOM('name').offsetWidth-node.getDOM('icon').getLeft()
			});
		}else{
			bg_selected.setStyle('top', -100);
		}
		
	});
	
});