/*
---
 
name: Mif.Tree.Drop
description: tree droppable
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: [Mif.Tree, Mif.Tree.Transform, More/Drag.Move]
provides: Mif.Tree.Drop
 
...
*/

Mif.Tree.Drop = new Class({
	
	Implements: [Events, Options],
	
	options:{
		group: 'tree',
		animate: true,
		open: 600,//time to open node
		scrollDelay: 10,
		scrollSpeed: 0.05,
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
			Mif.Drop.groups[group] = (Mif.Drop.groups[group] || []).include(this);
		}, this);
	},
	
	getElement: function(){
		return this.tree.wrapper;
	},
	
	onleave: function(){
		this.clean();
		$clear(this.scrolling);
		this.scrolling = null;
		Mif.Drag.target = false;
	},
	
	onenter: function(){
		this.onleave();
	},
	
	overflowScroll: function(){
		var wrapper = this.tree.wrapper;
		var top = Mif.Drag.coords.y - this.tree.container.getPosition().y;
		var bottom = wrapper.clientHeight - top;
		var sign = 0;
		var delta;
		if(top < this.tree.height){
			delta = top;
			sign = 1;
		}else if(bottom < this.tree.height){
			delta = bottom;
			sign = -1;
		};
		if(delta < 1) sign = 0;
		if(!sign){
			$clear(this.scrolling);
			this.scrolling = null;
			return;
		};
		this.delta = delta;
		if(!this.scrolling){
			var start = $time();
			var scrollTop = wrapper.scrollTop;
			this.scrolling = function(node){
				wrapper.scrollTop = wrapper.scrollTop - sign*this.options.scrollSpeed/this.delta * ($time() - start);
			}.periodical(this.options.scrollDelay, this, [sign]);
		}
	},

	ondrag: function(event){
		this.overflowScroll();
		if(!this.checkTarget()) return;
		this.clean();
		var where = Mif.Drag.where;
		var target = Mif.Drag.target;
		var ghostType = where;
		if(where == 'after' && target && (target.getNext()) || where == 'before' && target.getPrevious()){
			ghostType = 'between';
		}
		Mif.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + ghostType;
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
				Mif.Drag.target = this.tree.$index.getLast();
				this.index = this.tree.$index.length-1;
				if(this.index == -1){
					Mif.Drag.where = 'inside';
					Mif.Drag.target = this.tree.root || this.tree;
				}else{
					Mif.Drag.where = 'after';
				}
			}else{
				Mif.Drag.target = false;
				Mif.Drag.where = 'notAllowed';
			}
			return true;
		};
		if((Mif.Drag.current instanceof Mif.Tree.Node) && Mif.Drag.current.contains(target)){
			Mif.Drag.target = target;
			Mif.Drag.where = 'notAllowed';
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
		if(Mif.Drag.where == where && Mif.Drag.target == target) return false;
		Mif.Drag.where = where; 
		Mif.Drag.target = target;
		return true;
	},
	
	beforeDrop: function(){
		if(this.options.beforeDrop){
			this.options.beforeDrop.apply(this, [Mif.Drag.current, Mif.Drag.target, Mif.Drag.where]);
		}else{
			this.drop();
		}
	},
	
	drop: function(){
		var current = Mif.Drag.current, target = Mif.Drag.target, where = Mif.Drag.where;
		Mif.Drag.ghost.dispose();
		var action = this.action || (this.tree.key[this.options.modifier] ? 'copy' : 'move');
		if(Mif.Drag.where == 'inside' && target.tree && !target.isOpen()){
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

Mif.Tree.prototype.options.droppable = true;

Mif.Tree.implement({
	
	makeDroppable: function(options){
		new Mif.Tree.Drop(this, options);
		return this;
	}
	
});

