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

Mif.Tree.Load = {
		
	children: function(children, parent, tree){
	    var i, l;
	    var subChildrens = [];
		for(i = children.length; i--; ){
			var child = children[i];
			var node = new Mif.Tree.Node({
				tree: tree,
				parentNode: parent||undefined
			}, child);
			if( tree.forest || parent != undefined){
				parent.children.unshift(node);
			}else{
				tree.root = node;
			}
			var subChildren = child.children;
			if(subChildren && subChildren.length){
			    subChildrens.push({children: subChildren, parent: node});
			}
		}
		for(i = 0, l = subChildrens.length; i < l; i++) {
		    var sub = subChildrens[i];
		    arguments.callee(sub.children, sub.parent, tree);
		}
		if(parent) parent.state.loaded = true;
		tree.fireEvent('loadChildren', parent);
	}
	
};

Mif.Tree.implement({

	load: function(options){
		var tree = this;
		this.loadOptions = this.loadOptions||Function.from({});
		function success(json){
			var parent = null;
			if(tree.forest){
				tree.root = new Mif.Tree.Node({
					tree: tree,
					parentNode: null
				}, {});
				parent = tree.root;
			}
			Mif.Tree.Load.children(json, parent, tree);
			Mif.Tree.Draw[tree.forest ? 'forestRoot' : 'root'](tree);
			tree.$getIndex();
			tree.fireEvent('load');
			return tree;
		}
		options = Object.append(Object.append({
			isSuccess: Function.from(true),
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
		this.addType('loader');
		var self = this;
		function success(json){
			Mif.Tree.Load.children(json, self, self.tree);
			delete self.$loading;
			self.state.loaded = true;
			self.removeType('loader');
			Mif.Tree.Draw.update(self);
			self.fireEvent('load');
			self.tree.fireEvent('loadNode', self);
			return self;
		}
		options=Object.append(Object.append(Object.append({
			isSuccess: Function.from(true),
			secure: true,
			onSuccess: success,
			method: 'get'
		}, this.tree.loadOptions(this)), this.loadOptions), options);
		if(options.json) return success(options.json);
		new Request.JSON(options).send();
		return this;
	}
	
});
