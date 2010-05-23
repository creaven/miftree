/*
---
 
name: Mif.Tree.Drag
description: implements drag and drop
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: [Mif.Tree, Mif.Tree.Transform, More/Drag.Move]
provides: Mif.Tree.Drag
 
...
*/

Mif.Tree.Drag = new Class({
	
	Implements: [Events, Options],
	
	Extends: Drag,
	
	options:{
		group: 'tree',
		droppables: [],
		snap: 4,
		animate: true,
		modifier: 'control',//copy
		startPlace: ['icon', 'name', 'node']
	},

	initialize: function(tree, options){
		tree.drag = this;
		this.setOptions(options);
		$extend(this, {
			tree: tree,
			snap: this.options.snap,
			groups: [],
			droppables: [],
			action: this.options.action
		});
		
		this.groups = $splat(this.options.group);
		
		$extend(tree.defaults, {
			dragDisabled: false
		});

		this.element = [Mif.Drag.current, Mif.Drag.target, Mif.Drag.where];
		this.document = tree.wrapper.getDocument();
		
		this.selection = (Browser.Engine.trident) ? 'selectstart' : 'mousedown';
		
		this.bound = {
			start: this.start.bind(this),
			check: this.check.bind(this),
			drag: this.drag.bind(this),
			stop: this.stop.bind(this),
			cancel: this.cancel.bind(this),
			eventStop: $lambda(false),
			leave: this.leave.bind(this),
			enter: this.enter.bind(this),
			keydown: this.keydown.bind(this)
		};
		this.attach();
		
		this.addEvent('start', function(){
			this.groupDroppables();
			Mif.Tree.Drag.dropZone = this.droppables.contains(this.tree.droppable) ? this.tree.droppable : null;
			document.addEvent('keydown', this.bound.keydown);
			this.droppables.each(function(item){
				item.getElement().addEvents({mouseleave: this.bound.leave, mouseenter: this.bound.enter});
			}, this);
			Mif.Drag.current.getDOM('name').addClass('mif-tree-drag-current');
			this.addGhost();
		}, true);
		this.addEvent('complete', function(){
			document.removeEvent('keydown', this.bound.keydown);
			this.droppables.each(function(item){
				item.getElement().removeEvent('mouseleave', this.bound.leave).removeEvent('mouseenter', this.bound.enter);
			}, this);
			Mif.Drag.current.getDOM('name').removeClass('mif-tree-drag-current');
			var dropZone = Mif.Tree.Drag.dropZone;
			if(!dropZone || Mif.Drag.where == 'notAllowed'){
				Mif.Tree.Drag.startZone.emptydrop();
				return;
			};
			if(dropZone.onstop) dropZone.onstop();
			dropZone.beforeDrop();
		});
	},
	
	groupDroppables: function(){
		this.groups.each(function(group){
			this.droppables.combine(Mif.Drop.groups[group]);
		}, this);
	},

	attach: function(){
		this.tree.wrapper.addEvent('mousedown', this.bound.start);
		return this;
	},

	detach: function(){
		this.tree.wrapper.removeEvent('mousedown', this.bound.start);
		return this;
	},
	
	dragTargetSelect: function(){
		function addDragTarget(){
			Mif.Drag.current.getDOM('name').addClass('mif-tree-drag-current');
		}
		function removeDragTarget(){
			Mif.Drag.current.getDOM('name').removeClass('mif-tree-drag-current');
		}
		this.addEvent('start',addDragTarget.bind(this));
		this.addEvent('beforeComplete',removeDragTarget.bind(this));
	},
	
	leave: function(event){
		var dropZone = Mif.Tree.Drag.dropZone;
		if(dropZone){
			dropZone.where = 'notAllowed';
			Mif.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + dropZone.where;
			if(dropZone.onleave) dropZone.onleave();
			Mif.Tree.Drag.dropZone = false;
		}
		
		var relatedZone = this.getZone(event.relatedTarget);
		if(relatedZone) this.enter(null, relatedZone);
	},
	
	enter: function(event, zone){
		if(event) zone = this.getZone(event.target);
		var dropZone = Mif.Tree.Drag.dropZone;
		if(dropZone && dropZone.onleave) dropZone.onleave();
		Mif.Tree.Drag.dropZone = zone;
		if(zone.onenter) zone.onenter();
	},
	
	getZone: function(target){//private leave/enter
		if(!target) return false;
		var parent = $(target);
		do{
			for(var l = this.droppables.length;l--;){
				var zone = this.droppables[l];
				if( parent == zone.getElement() ) {
					return zone;
				}
			}
			parent = parent.getParent();
		}while(parent);
		return false;
	},
	
	keydown: function(event){
		if(event.key == 'esc') {
			var zone = Mif.Tree.Drag.dropZone;
			if(zone) zone.where = 'notAllowed';
			this.stop(event);
		}
	},
	
	start: function(event){//mousedown
		if (this.options.preventDefault) event.preventDefault();
		this.fireEvent('beforeStart', this.element);
		//
		
		var target = this.tree.mouse.target;
		if(!target) return;
		Mif.Drag.current = $splat(this.options.startPlace).contains(target) ? this.tree.mouse.node : false;
		if(!Mif.Drag.current || Mif.Drag.current.dragDisabled) {
			return;
		}
		Mif.Drag.current = Mif.Drag.current;
		Mif.Tree.Drag.startZone = this;
		
		this.mouse = {start: event.page};
		this.document.addEvents({mousemove: this.bound.check, mouseup: this.bound.cancel});
		this.document.addEvent(this.selection, this.bound.eventStop);
	},
	
	drag: function(event){
		Mif.Drag.ghost.position({
			x: event.page.x + 20,
			y: event.page.y + 20
		});
		Mif.Drag.coords = event.page;
		var dropZone = Mif.Tree.Drag.dropZone;
		if(!dropZone||!dropZone.ondrag) return;
		Mif.Tree.Drag.dropZone.ondrag(event);
		this.fireEvent('drag');
	},
	
	addGhost: function(){
		var ghost = new Element('span').addClass('mif-tree-ghost');
		var el = this.tree.drawNode(Mif.Drag.current).getFirst()[0].removeClass('mif-tree-node-selected');
		ghost.adopt(el)
		.inject(document.body).setStyle('position', 'absolute');
		new Element('span').inject(ghost, 'top').addClass('mif-tree-ghost-notAllowed');
		ghost.getLast().getFirst().className = '';
		Mif.Drag.ghost = ghost;
	},
	
	emptydrop: function(){
		var current = Mif.Drag.current, target = Mif.Drag.target, where = Mif.Drag.where;
		var scroll = this.tree.scroll;
		var complete = function(){
			scroll.removeEvent('complete', complete);
			if(this.options.animate){
				var wrapper = current.getDOM('wrapper');
				var position = wrapper.getPosition();
				Mif.Drag.ghost.set('morph',{
					duration: 'short',
					onComplete: function(){
						//Mif.Drag.ghost.dispose();
						this.fireEvent('emptydrop', this.element);
					}.bind(this)
				});
				Mif.Drag.ghost.morph({left: position.x, top: position.y});
				return;
			};
			Mif.Drag.ghost.dispose();
			this.fireEvent('emptydrop', this.element);
			return;
		}.bind(this);
		scroll.addEvent('complete', complete);
		this.tree.select(Mif.Drag.current);
		this.tree.scrollTo(Mif.Drag.current);
	}
	
});

Mif.Tree.implement({
	
	makeDraggable: function(options){
		new Mif.Tree.Drag(this, options);
		if(this.options.droppable && Mif.Tree.Drop) new Mif.Tree.Drop(this, this.options.droppable); 
		return this;
	}
	
});
