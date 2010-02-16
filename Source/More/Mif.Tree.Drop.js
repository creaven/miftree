/*
---
 
name: Mif.Tree.Drop
description: tree droppable
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: [Mif.Tree, Mif.Tree.Transform, more:/Drag.Move]
provides: Mif.Tree.Drop
 
...
*/

Mif.Tree.Drop = new Class({
	
	Implements: [new Events, new Options],
	
	options:{
		group: 'tree',
		animate: true,
		open: 600,//time to open node
		scrollDelay: 100,
		scrollSpeed: 100,
		modifier: 'control',//copy
		allowContainerDrop: true
	},

	initialize: function(tree, options){
		tree.droppable = this;
		this.setOptions(options);
		$extend(this, {
			tree: tree,
			action: this.options.action,
			groups: []
		});
		$extend(tree.defaults, {
			dropDenied: []
		});
		this.addToGroups(this.options.group);
		function root(){
			tree.root.dropDenied.combine(['before', 'after']);
		};
		if(!tree.root){
			tree.addEvent('drawRoot', root);
		}else{
			root();
		};
		this.pointer = new Element('div').addClass('mif-tree-pointer').inject(tree.wrapper).set('html', '<div class="left"></div><div class="right"></div>');
	},
	
	addToGroups: function(groups){
		groups = $splat(groups);
		this.groups.combine(groups);
		groups.each(function(group){
			Mif.Tree.Drop.groups[group] = (Mif.Tree.Drop.groups[group] || []).include(this);
		}, this);
	},
	
	getElement: function(){
		return this.tree.wrapper;
	},
	
	onleave: function(){
		this.clean();
		$clear(this.scrolling);
		this.scrolling = null;
		Mif.Tree.Drag.target = false;
	},
	
	onenter: function(){
		this.onleave()
	},
	
	autoScroll: function(){
		var y = this.y;
		if(y == -1) return;
		var wrapper = this.tree.wrapper;
		var top = y-wrapper.scrollTop;
		var bottom = wrapper.offsetHeight-top;
		var sign = 0;
		if(top < this.tree.height){
			var delta = top;
			sign = 1;
		}else if(bottom < this.tree.height){
			var delta = bottom;
			sign = -1;
		}
		if(sign && !this.scrolling){
			this.scrolling = function(node){
				if(y != this.y){
					y = this.y;
					delta = (sign == 1 ? (y - wrapper.scrollTop) : (wrapper.offsetHeight - y + wrapper.scrollTop)) || 1;
				}
				wrapper.scrollTop = wrapper.scrollTop - sign*this.options.scrollSpeed/delta;
			}.periodical(this.options.scrollDelay, this, [sign])
		}
		if(!sign){
			$clear(this.scrolling);
			this.scrolling = null;
		}
	},

	ondrag: function(event){
		this.autoScroll();
		if(!this.checkTarget()) return;
		this.clean();
		var where = Mif.Tree.Drag.where;
		var target = Mif.Tree.Drag.target;
		var ghostType = where;
		if(where == 'after' && target && (target.getNext()) || where == 'before' && target.getPrevious()){
			ghostType = 'between';
		}
		Mif.Tree.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + ghostType;
		if(where == 'notAllowed'){
			return;
		}
		if(where == 'inside'){
			if(target.tree && !target.isOpen() && !this.openTimer && (target.loadable || target.hasChildren()) ){
				this.wrapper = target.getDOM('wrapper').setStyle('cursor', 'progress');
				this.openTimer = function(){
					target.toggle();
					this.clean();
				}.delay(this.options.open,this);
			}
		}else{
			var wrapper = this.tree.wrapper;
			var top = this.index*this.tree.height;
			if(where == 'after') top += this.tree.height;
			this.pointer.setStyles({
				display: 'block',
				left: wrapper.scrollLeft,
				top: top,
				width: wrapper.clientWidth
			});
		}
	},

	clean: function(){
		this.pointer.style.display = 'none';
		if(this.openTimer){
			$clear(this.openTimer);
			this.openTimer = false;
			this.wrapper.style.cursor = 'inherit';
			this.wrapper = false;
		}
	},
	
	checkTarget: function(){
		this.y = this.tree.mouse.coords.y;
		var target = this.tree.mouse.node;
		if(!target){
			if(this.options.allowContainerDrop && (this.tree.forest || !this.tree.root)){
				Mif.Tree.Drag.target = this.tree.$index.getLast();
				this.index = this.tree.$index.length-1;
				if(this.index == -1){
					Mif.Tree.Drag.where = 'inside';
					Mif.Tree.Drag.target = this.tree.root || this.tree;
				}else{
					Mif.Tree.Drag.where = 'after';
				}
			}else{
				Mif.Tree.Drag.target = false;
				Mif.Tree.Drag.where = 'notAllowed';
			}
			return true;
		};
		if((Mif.Tree.Drag.current instanceof Mif.Tree.Node) && Mif.Tree.Drag.current.contains(target)){
			Mif.Tree.Drag.target = target;
			Mif.Tree.Drag.where = 'notAllowed';
			return true;
		};
		this.index = Math.floor(this.y/this.tree.height);
		var delta = this.y - this.index*this.tree.height;
		var deny = target.dropDenied;
		if(this.tree.sortable){
			deny.include('before').include('after');
		};
		var where;
		if(!deny.contains('inside') && delta > (this.tree.height/4) && delta < (3/4*this.tree.height)){
			where = 'inside';
		}else{
			if(delta < this.tree.height/2){
				if(deny.contains('before')){
					if(deny.contains('inside')){
						where = deny.contains('after') ? 'notAllowed' : 'after';
					}else{
						where = 'inside';
					}
				}else{
					where = 'before';
				}
			}else{
				if(deny.contains('after')){
					if(deny.contains('inside')){
						where = deny.contains('before') ? 'notAllowed' : 'before';
					}else{
						where = 'inside';
					}
				}else{
					where = 'after';
				}
			}
		};
		if(Mif.Tree.Drag.where == where && Mif.Tree.Drag.target == target) return false;
		Mif.Tree.Drag.where = where; 
		Mif.Tree.Drag.target = target;
		return true;
	},
	
	beforeDrop: function(){
		if(this.options.beforeDrop){
			this.options.beforeDrop.apply(this, [Mif.Tree.Drag.current, Mif.Tree.Drag.target, Mif.Tree.Drag.where]);
		}else{
			this.drop();
		}
	},
	
	drop: function(){
		var current = Mif.Tree.Drag.current, target = Mif.Tree.Drag.target, where = Mif.Tree.Drag.where;
		Mif.Tree.Drag.ghost.dispose();
		var action = this.action || (this.tree.key[this.options.modifier] ? 'copy' : 'move');
		if(Mif.Tree.Drag.where == 'inside' && target.tree && !target.isOpen()){
			if(target.tree) target.toggle();
			if(target.$loading){
				var onLoad = function(){
					this.tree[action](current, target, where);
					this.tree.select(current).scrollTo(current);
					this.fireEvent('drop', [current, target, where]);
					target.removeEvent('load',onLoad);
				};
				target.addEvent('load',onLoad);
				return;
			};
		};
		if(!(current instanceof Mif.Tree.Node )){
			current = current.toNode(this.tree);
		}
		this.tree[action](current, target, where);
		this.tree.select(current).scrollTo(current);
		this.fireEvent('drop', [current, target, where]);
	},
	
	onstop: function(){
		this.clean();
		$clear(this.scrolling);
	}
});

Mif.Tree.Drop.groups={};

Mif.Tree.implement({
	
	makeDroppable: function(options){
		new Mif.Tree.Drop(this, options);
		return this;
	}
	
});

