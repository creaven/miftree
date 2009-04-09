

Mif.Tree.CookieStorage = new Class({

	Implements: [Options],
	
	options:{
		store: function(node){
			return node.property.id;
		},
		retrieve: function(value){
			return Mif.id(value);
		}
	},

	initialize: function(tree, options){
		this.setOptions(options);
		this.tree=tree;
		this.cookie=new Cookie('mif.tree'+tree.UID);
		this.nodes=[];
		this.initSave();
	},
	
	write: function(){
		this.cookie.write(JSON.encode(this.nodes));
	},
	
	read: function(){
		return JSON.decode(this.cookie.read())||[];
	},
	
	restore: function(){
		var nodes=this.read().map(this.options.retrieve).each(function(node){
			node.toggle(true);
		});
	},
	
	initSave: function(){
		this.tree.addEvent('toggle', function(node, isOpen){
			
			var value=this.options.store(node);
			if(isOpen){
				this.nodes.include(value);
			}else{
				this.nodes.erase(value);
			}
			this.write();
		}.bind(this));
	}


});