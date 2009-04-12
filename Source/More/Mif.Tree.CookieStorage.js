/*
Mif.Tree.CookieStorage
*/

Mif.Tree.CookieStorage = new Class({

	Implements: [Options],
	
	options:{
		store: function(node){
			return node.property.id;
		},
		retrieve: function(value){
			return Mif.id(value);
		},
		event: 'toggle',
		action: 'toggle'
	},

	initialize: function(tree, options){
		this.setOptions(options);
		this.tree=tree;
		this.cookie=new Cookie('mif.tree:'+this.options.event+tree.UID);
		this.nodes=[];
		this.initSave();
	},
	
	write: function(){
		this.cookie.write(JSON.encode(this.nodes));
	},
	
	read: function(){
		return JSON.decode(this.cookie.read())||[];
	},
	
	restore: function(data){
		this.restored=data||this.restored||this.read();
		var restored=[];
		for(var i=0, l=this.restored.length; i<l; i++){
			var stored=this.restored[i];
			var node=this.options.retrieve(stored);
			if(node){
				node[this.options.action](true);
				this.restored.erase(stored);
				l--;
			}
		}
	},
	
	initSave: function(){
		this.tree.addEvent(this.options.event, function(node, state){
			var value=this.options.store(node);
			if(state){
				this.nodes.include(value);
			}else{
				this.nodes.erase(value);
			}
			this.write();
		}.bind(this));
	}

});
