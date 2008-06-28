window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			}
		},
		dfltType:'folder',//default node type
		height: 18,//node height
		onRename: function(node, newName, oldName){
			alert(oldName+' renamed to '+newName);
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
						"name": "node3"
					}
				},
				{
					"property": {
						"name": "node4"
					}
				}
			]
		}
	];
	
	// load tree from json.
	tree.load({
		json: json
	});
	
	$('rename').addEvent('click', function(){
		var node=tree.selected;
	    if(!node) return;
	    node.rename();
	});
	
});