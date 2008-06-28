DOMTree = new Mif.Tree({
	container: $('tree_container'),
	types: {
		folder:{
			cls: 'dom-object',
			loadable: true
		},
		array:{
			loadable: true,
			cls: 'dom-array'
		},
		string:{
			hoverClass: 'empty',
			selectClass: 'empty',
			loadable: true,
			cls: 'dom-string'
		},
		number:{
			hoverClass: 'empty',
			selectClass: 'empty',
			loadable: true,
			cls: 'dom-number'
		}
	},
	sortable: true,
	dfltType:'folder',
	height: 18,
	initialize: function(){
		this.initSortable();
		new Mif.Tree.KeyNav(this);
	}
})
.load({
	json: [{
		property: {
			name: 'window'
		},
		data:{
			dom: window
		}
	}]
});
DOMTree.loadOptions=function(node){
	var json=[];
	var dom=node.data.dom;
	$try(function(){
		var type=$type(dom);
		switch(type){
			case 'string':
			case 'number':
			json.push({
				property:{
					name: dom,
					loadable: false
				},
				type: type
			});
			break;
			case 'array':
			dom.each(function(el, i){
				json.push({
					property:{
						name: i
					},
					type: 'array',
					data:{
						dom: el
					}
				});
			});
			break;
			default:
			for(var p in dom){
				$try(function(){
					var child={
						property:{
							name: p
						},
						data:{
							dom: dom[p]
						}
					}
					if(typeof dom=='function') child.property.cls='dom-function';
					json.push(child);
				});
			}
		}
	});
	return {json: json};
}