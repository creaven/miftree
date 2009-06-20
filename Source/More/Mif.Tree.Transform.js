/*
Mif.Tree.Transform
*/
Mif.Tree.Node.implement({
	
	inject: function(node, where, domNode){//domNode - internal property
		var parent=this.parentNode;
		var previousVisible=this.getPreviousVisible();
		var type=domNode ? 'copy' : 'move';
		switch(where){
			case 'after':
			case 'before':
				if( node['get'+(where=='after' ? 'Next' : 'Previous')]()==this ) return false;
				if(this.parentNode) {
					this.parentNode.children.erase(this);
				}
				this.parentNode=node.parentNode;
				this.parentNode.children.inject(this, node, where);
				break;
			case 'inside':
				if( node.getLast()==this ) return false;
				if(this.parentNode) {
					this.parentNode.children.erase(this);
				}
				node.children.push(this);
				this.parentNode=node;
				node.$draw=true;
				node.state.open=true;
				break;
		}		
		var tree=node.tree;
		if(this.tree!=node.tree){
			var oldTree=this.tree;
			var tree=node.tree;
			this.recursive(function(){
				this.tree=tree;
			});
		};
		tree.fireEvent('structureChange', [this, node, where, type]);
		tree.$getIndex();
		if(oldTree)	oldTree.$getIndex();
		Mif.Tree.Draw.updateDOM(this, domNode);
		[node, this, parent, previousVisible, this.getPreviousVisible()].each(function(node){
			Mif.Tree.Draw.update(node);
		});
		return this;
	},
	
	copy: function(node, where){
		if (this.property.copyDenied) return;
		function copy(structure){
			var node=structure.node;
			var tree=structure.tree;
			var options=$unlink({
				property: node.property,
				type: node.type,
				state: node.state,
				data: node.data
			});
			options.state.open=false;
			var nodeCopy = new Mif.Tree.Node({
				parentNode: structure.parentNode,
				children: [],
				tree: tree
			}, options);
			node.children.each(function(child){
				var childCopy=copy({
					node: child,
					parentNode: nodeCopy,
					tree: tree
				});
				nodeCopy.children.push(childCopy);
			});
			return nodeCopy;
		};
		
		var nodeCopy=copy({
			node: this,
			parentNode: null,
			tree: node.tree
		});
		return nodeCopy.inject(node, where, Mif.Tree.Draw.node(nodeCopy));
	},
	
	remove: function(){
		if (this.property.removeDenied) return;
		this.tree.fireEvent('remove', [this]);
		var parent=this.parentNode, previousVisible=this.getPreviousVisible();
		if(parent) {	
			parent.children.erase(this);
		}else if(!this.tree.forest){
			this.tree.root=null;
		}
		this.tree.selected=false;
		this.getDOM('node').destroy();
		this.tree.$getIndex();
		Mif.Tree.Draw.update(parent);
		Mif.Tree.Draw.update(previousVisible);
		this.recursive(function(){
			if(this.id) delete Mif.ids[this.id];
		});
		this.tree.mouse.node=false;
		this.tree.updateHover();
	}
	
});


Mif.Tree.implement({

	move: function(from, to, where){
		if ( from.inject(to, where) ){
			this.fireEvent('move', [from, to, where]);
		}
		return this;
	},
	
	copy: function(from, to, where){
		var copy = from.copy(to, where);
		if ( copy ){
			this.fireEvent('copy', [from, to, where, copy]);
		}
		return this;
	},
	
	remove: function(node){
		node.remove();
		return this;
	},
	
	add: function(node, current, where){
		if(node.constructor.constructor!=Class){
			node=new Mif.Tree.Node({
				parentNode: null,
				tree: this
			}, node);
		};
		node.inject(current, where, Mif.Tree.Draw.node(node));
		this.fireEvent('add', [node, current, where]);
		return this;
	}
	
});
