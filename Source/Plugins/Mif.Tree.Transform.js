/*
Mif.Tree.Transform
*/
Mif.Tree.Node.implement({
	
	inject: function(node, where, domNode){//domNode - internal property
		var parent=this.parentNode;
		var previous=this.getPrevious();
		var type=domNode ? 'copy' : 'move';
		switch(where){
			case 'after':
			case 'before':
				if( node['get'+(where=='after' ? 'Next' : 'Previous')]()==this ) return false;
				if(this.parentNode) this.parentNode.children.erase(this);
				this.parentNode=node.parentNode;
				this.parentNode.children.inject(this, node, where);
				break;
			case 'inside':
				if( node.getLast()==this ) return false;
				if(this.parentNode) this.parentNode.children.erase(this);
				node.children.push(this);
				this.parentNode=node;
				node.$draw=true;
				node.state.open=true;
				break;
		}		
		this.tree.fireEvent('structureChange', [this, node, where, type]);
		Mif.Tree.Draw.updateDOM(this, domNode);
		[node, this, parent, previous, this.getPrevious()].each(function(node){
			Mif.Tree.Draw.update(node);
		});
		this.tree.select(this);
		this.tree.$getIndex();
		this.tree.scrollTo(this);
		return this;
	},
	
	copy: function(node, where){
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
			tree: this.tree
		});
		return nodeCopy.inject(node, where, Mif.Tree.Draw.node(nodeCopy));
	},
	
	remove: function(){
		this.tree.fireEvent('remove', [this]);
		var parent=this.parentNode, previous=this.getPrevious();
		if(parent) parent.children.erase(this);
		this.tree.selected=false;
		this.getDOM('node').destroy();
		Mif.Tree.Draw.update(parent);
		Mif.Tree.Draw.update(previous);
		this.tree.mouse.node=false;
		this.tree.updateHover();
		this.tree.$getIndex();
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
		var type=$type(node);
		if(type!='mif:tree:node'){
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

Array.implement({
	
	inject: function(added, current, where){//inject added after or before current;
		var pos=this.indexOf(current)+(where=='before' ? 0 : 1);
		for(var i=this.length-1;i>=pos;i--){
			this[i+1]=this[i];
		}
		this[pos]=added;
		return this;
	}
	
});