

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
		this.restored=this.restored||this.read();
		var restored=[];
		this.restored.each(function(stored){
			var node=this.options.retrieve(stored);
			if(node){
				node.toggle(true);
				restored.push(stored);
			}
		}, this);
		restored.each(function(stored){
			this.restored.erase(stored);
		}, this);
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