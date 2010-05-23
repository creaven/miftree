/*
---
 
name: Mif.Tree.Load
description: load tree from json
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: Mif.Tree
provides: Mif.Tree.Load
 
...
*/

Mif.Tree.implement({
		
	readJSON: function(children, parent){
		for( var i = children.length; i--; ){
			var child = children[i];
			var subChildren = child.children;
			var node = new this.Node({
				tree: this,
				parentNode: parent
			}, child);
			if( this.forest || parent != undefined){
				parent.children.unshift(node);
			}else{
				this.root = node;
			}
			if(subChildren && subChildren.length){
				this.readJSON(subChildren, node);
			}
		}
		if(parent) parent.property.loaded = true;
		//this.fireEvent('loadChildren', parent);
	}
	
});

Mif.Tree.implement({

	load: function(options){
		var tree = this;
		this.loadOptions = this.loadOptions || $lambda({});
		function success(json){
			var parent = null;
			if(tree.forest){
				tree.root = new tree.Node({
					tree: tree,
					parentNode: null
				}, {});
				parent = tree.root;
			}
			tree.readJSON(json, parent);
			tree['draw' + (tree.forest ? 'ForestRoot' : 'Root')]();
			tree.$getIndex();
			tree.fireEvent('load');
			return tree;
		}
		options = $extend($extend({
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: success,
			method: 'get'
		}, this.loadOptions()), options);
		if(options.json) return success(options.json);
		new Request.JSON(options).send();
		return this;
	}
	
});

Mif.Tree.Node.implement({
	
	load: function(options){
		this.$loading = true;
		options = options||{};
		//this.addType('loader');
		var self = this;
		function success(json){
			self.tree.readJSON(json, self);
			delete self.$loading;
			self.property.loaded = true;
			//self.removeType('loader');
			self.tree.update(self);
			self.fireEvent('load');
			self.tree.fireEvent('loadNode', self);
			return self;
		}
		options = $extend($extend($extend({
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: success,
			method: 'get'
		}, this.tree.loadOptions(this)), this.loadOptions), options);
		if(options.json) return success(options.json);
		new Request.JSON(options).send();
		return this;
	}
	
});
