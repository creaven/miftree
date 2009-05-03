/*
Mif.Tree.Node
*/
Mif.Tree.Node = new Class({

	Implements: [Events],
	
	initialize: function(structure, options) {
		$extend(this, structure);
		this.children=[];
		this.visibleChildren=[];
		this.type=options.type||this.tree.dfltType;
		this.property=options.property||{};
		this.data=options.data;
		this.state=$extend($unlink(this.tree.dfltState), options.state);
		this.$calculate();
		this.UID=Mif.Tree.Node.UID++;
		Mif.Tree.Nodes[this.UID]=this;
		var id=this.property.id;
		if(id!=null) Mif.ids[id]=this;
		this.tree.fireEvent('nodeCreate', [this]);
		this._property=['id', 'name', 'cls', 'openIcon', 'closeIcon', 'openIconUrl', 'closeIconUrl', 'hidden'];
	},
	
	$calculate: function(){
		$extend(this, $unlink(this.tree.defaults));
		this.type=$splat(this.type);
		this.type.each(function(type){
			var props=this.tree.types[type];
			if(props) $extend(this, props);
		}, this);
		$extend(this, this.property);
		return this;
	},
	
	getDOM: function(what){
		var node=$(this.tree.DOMidPrefix+this.UID);
		if(what=='node') return node;
		var wrapper=node.getFirst();
		if(what=='wrapper') return wrapper;
		if(what=='children') return wrapper.getNext();
		return wrapper.getElement('.mif-tree-'+what);
	},
	
	getGadjetType: function(){
		return (this.loadable && !this.isLoaded()) ? 'plus' : (this.hasChildren(true) ? (this.isOpen() ? 'minus' : 'plus') : 'none');
	},
	
	toggle: function(state) {
		if(this.state.open==state || this.$loading || this.$toggling) return this;
		var parent=this.getParent();
		function toggle(type){
			this.state.open = !this.state.open;
			if(type=='drawed'){
				this.drawToggle();
			}else{
				parent._toggle=(parent._toggle||[])[this.state.open ? 'include' : 'erase'](this)
			}
			this.fireEvent('toggle', [this.state.open]);
			this.tree.fireEvent('toggle', [this, this.state.open]);
			return this;
		}
		if(parent && !parent.$draw){
			return toggle.apply(this, []);
		}
		if(this.loadable && !this.state.loaded) {
            if(!this.load_event){
                this.load_event=true;
                this.addEvent('load',function(){
                    this.toggle();
                }.bind(this));
            }
            return this.load();
        }
		if(!this.hasChildren()) return this;
		return toggle.apply(this, ['drawed']);
	},
	
	drawToggle: function(){
		Mif.Tree.Draw.update(this);
		this.tree.hoverState.gadjet=false;
		this.tree.hover();
		this.tree.$getIndex();
	},
	
	recursive: function(fn, args){
		args=$splat(args);
		if(fn.apply(this, args)!==false){
			this.children.each(function(node){
				if(node.recursive(fn, args)===false){
					return false;
				}
			});
		}
		return this;
	},
	
	isOpen: function(){
		return this.state.open;
	},
	
	isLoaded: function(){
		return this.state.loaded;
	},
	
	isLast: function(visible){
		if(this.parentNode==null || this.parentNode[visible ? 'visibleChildren' : 'children'].getLast()==this) return true;
		return false;
	},
	
	isFirst: function(visible){
		if(this.parentNode==null || this.parentNode[visible ? 'visibleChildren' : 'children'][0]==this) return true;
		return false;
	},
	
	isRoot: function(){
		return this.parentNode==null ? true : false;
	},
	
	getChildren: function(visible){
		return this[visible ? 'visibleChildren' : 'children'];
	},
	
	hasChildren: function(visible){
		return this[visible ? 'visibleChildren' : 'children'].length ? true : false;
	},
	
	index: function(visible){
		if( this.isRoot() ) return 0;
		return this.parentNode[visible ? 'visibleChildren' : 'children'].indexOf(this);
	},
	
	getNext: function(visible){
		if(this.isLast(visible)) return null;
		return this.parentNode[visible ? 'visibleChildren' : 'children'][this.index(visible)+1];
	},
	
	getPrevious: function(visible){
		if( this.isFirst(visible) ) return null;
		return this.parentNode[visible ? 'visibleChildren' : 'children'][this.index(visible)-1];
	},
	
	getFirst: function(visible){
		if(!this.hasChildren(visible)) return null;
		return this[visible ? 'visibleChildren' : 'children'][0];
	},
	
	getLast: function(visible){
		if(!this.hasChildren(visible)) return null;
		return this[visible ? 'visibleChildren' : 'children'].getLast(visible);		
	},
	
	getParent: function(){
		return this.parentNode;
	},
	
	getNextVisible: function(){
		var current=this;
		if(current.isRoot()){
			if(!current.isOpen() || !current.hasChildren(true)) return false;
			return current.getFirst(true);
		}else{
			if(current.isOpen() && current.getFirst(true)){
				return current.getFirst(true);
			}else{
				var parent=current;
				do{
					current=parent.getNext(true);
					if(current) return current;
				}while( parent=parent.parentNode );
				return false;
			}
		}
	},
	
	getPreviousVisible: function(){
		var current=this;
		if( current.isFirst(true) && ( !current.parentNode || (current.tree.forest && current.parentNode.isRoot()) ) ){
			return false;
		}else{
			if( current.getPrevious(true) ){
				current=current.getPrevious(true);
				while( current.isOpen() && current.getLast(true) ){
					current=current.getLast(true);
				}
				return current;
			}else{
				return current.parentNode;
			}
		}
	},
	
	getVisiblePosition: function(){
		return this.tree.$index.indexOf(this);
	},
		
	contains: function(node){
		do{
			if(node==this) return true;
			node=node.parentNode;
		}while(node);
		return false;
	},

	addType: function(type){
		return this.processType(type, 'add');
	},

	removeType: function(type){
		return this.processType(type, 'remove');
	},
	
	setType: function(type){
		return this.processType(type, 'set');
	},
	
	processType: function(type, action){
		switch(action){
			case 'add': this.type.include(type); break;
			case 'remove': this.type.erase(type); break;
			case 'set': this.type=type; break;
		}
		var current={};
		this._property.each(function(p){
			current[p]=this[p];
		}, this);
		this.$calculate();
		this._property.each(function(p){
			this.updateProperty(p, current[p], this[p]);
		}, this);
		return this;
	},
	
	set: function(obj){
		this.tree.fireEvent('beforeSet', [this, obj]);
		var property=obj.property||obj||{};
		for(var p in property){
			var nv=property[p];
			var cv=this[p];
			this.updateProperty(p, cv, nv);
			this[p]=this.property[p]=nv;
		}
		this.tree.fireEvent('set', [this, obj]);
		return this;
	},
	
	updateProperty: function(p, cv, nv){
		if(nv==cv) return this;
		if(p=='id'){
			delete Mif.ids[cv];
			if(nv) Mif.ids[nv]=this;
			return this;
		}
		if(!Mif.Tree.Draw.isUpdatable(this)) return this;
		switch(p){
			case 'name':
				this.getDOM('name').set('html', nv);
				return this;
			case 'cls':
				this.getDOM('wrapper').removeClass(cv).addClass(nv);
				return this;
			case 'openIcon':
			case 'closeIcon':
				this.getDOM('icon').removeClass(cv).addClass(nv);
				return this;
			case 'openIconUrl':
			case 'closeIconUrl':
				var icon=this.getDOM('icon');
				icon.setStyle('background-image', 'none');
				if(nv) icon.setStyle('background-image', 'url('+nv+')');
				return this;
			case 'hidden':
				this.getDOM('node').setStyle('display', nv ? 'none' : 'block');
				var previous=this.getPreviousVisible();
				var next=this.getNextVisible();
				var parent=this.getParent();
				this[p]=this.property[p]=nv;
				if(this.parentNode){
					if(nv){
						this.parentNode.visibleChildren.erase(this);
					}else{
						var previous=this;
						var children=this.parentNode.children;
						var visibleChildren=this.parentNode.visibleChildren;
						while(1){
							var index=children.indexOf(previous);
							if(index==0){
								if(previous==this){
									visibleChildren.unshift(this);
								}else{
									visibleChildren.inject(this, previous, 'after');
								}
								break;
							}else{
								previous=children[index-1];
								if(!previous.hidden){
									visibleChildren.inject(this, previous, 'after');
									break;
								}
							}
						}
					}
				}
				[previous, next, parent].each(function(node){
					Mif.Tree.Draw.update(node);
				});
				this.tree.$getIndex();
				return this;
		}
	},
	
	updateOpenState: function(){
		if(this.state.open){
			this.state.open=false;
			this.toggle();
		}
	}
	
});

Mif.Tree.Node.UID=0;
Mif.Tree.Nodes={};