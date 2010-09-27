/*
---
 
name: Mif.Tree
description: Mif.Tree base Class
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: [Mif/Mif, Mif/Mif.Util, Core/Class, Mif.Tree.Sheet, More/Fx.Scroll]
provides: Mif.Tree
 
...
*/

Mif.Tree = new Class({
	
	version: '1.3dev',

	Implements: [Events, Options],
		
	options:{
		forest: false,
		animateScroll: true,
		height: 18,
		expandTo: true,
		defaults: {
			name: '',
			cls: '',
			openIcon: 'mif-tree-icon-expanded',
			closeIcon: 'mif-tree-icon-collapsed',
			loadable: false,
			hidden: false,
			open: false
		},
		className: ''
	},
	
	initialize: function(options){
		this.setOptions(options);
		$extend(this, {
			forest: this.options.forest,
			animateScroll: this.options.animateScroll,
			height: this.options.height,
			key: {},
			expanded: [],
			$index: []
		});
		Mif.store(this);
		this.updateOpenState();
		if(this.options.expandTo) this.initExpandTo();
		this.wrapper = new Element('div').addClass('mif-tree-wrapper').addClass(this.options.className).addClass('mif-tree-' + this.UID);
		if(this.options.container) this.inject(this.options.container);
		this.events();
		this.initScroll();
		this.initSelection();
		this.initHover();
		this.addEvent('drawChildren', function(parent){
			var nodes = parent._toggle||[];
			for(var i = 0, l = nodes.length; i < l; i++){
				nodes[i].drawToggle();
			}
			parent._toggle = [];
		});
		this.setId(this.options.id);
		if(this.KeyNav) new this.KeyNav(this);
		if (MooTools.version >= '1.2.2' && this.options.initialize) this.options.initialize.call(this);
	},
	
	setId: function(id){
		this.id = id;
		Mif.id(this, this.id);
		return this;
	},
	
	inject: function(element, how){
		this.wrapper.inject(element, how);
		return this;
	},
	
	bound: function(){
		Array.each(arguments, function(name){
			this.bound[name] = this[name].bind(this);
		}, this);
	},
	
	events: function(){
		this.bound('mouse', 'mouseleave', 'mousedown', 'mouseup', 'preventDefault', 'toggleClick', 'toggleDblclick', 'focus', 'blurOnClick', 'keyDown', 'keyUp');
		
		this.wrapper.addEvents({
			mousemove: this.bound.mouse,
			mouseover: this.bound.mouse,
			mouseout: this.bound.mouse,
			mouseleave: this.bound.mouseleave,
			mousedown: this.bound.mousedown,
			mouseup: this.bound.mouseup,
			click: this.bound.toggleClick,
			dblclick: this.bound.toggleDblclick,
			selectstart: this.bound.preventDefault
		});
		
		this.wrapper.addEvent('click', this.bound.focus);
		document.addEvent('click', this.bound.blurOnClick);
		
		document.addEvents({
			keydown: this.bound.keyDown,
			keyup: this.bound.keyUp
		});
    },
    
	blurOnClick: function(event){
		var target = event.target;
		while(target){
			if(target == this.wrapper) return;
			target = target.parentNode;
		}
		this.blur();
	},
    
	focus: function(){
		if(Mif.Focus && Mif.Focus == this) return this;
		if(Mif.Focus) Mif.Focus.blur();
		Mif.Focus = this;
		this.focused = true;
		this.wrapper.addClass('mif-tree-focused');
		return this.fireEvent('focus');
	},
    
	blur: function(){
		Mif.Focus = null;
		if(!this.focused) return this;
		this.focused = false;
		this.wrapper.removeClass('mif-tree-focused');
		return this.fireEvent('blur');
	},
	
	$getIndex: function(){//return array of visible nodes.
		this.$index = [];
		var node = this.forest ? this.root.getFirst() : this.root;
		var previous = node;
		while(node){
			if(!(previous.hidden && previous.contains(node))){
				if(!node.hidden) this.$index.push(node);
				previous = node;
			}
			node = node._getNextVisible();
		}
		return this;
	},
	
	preventDefault: function(event){
		event.preventDefault();
	},
	
	mousedown: function(event){
		if(event.rightClick) return;
		event.preventDefault();
		window.focus();
		this.mouse.active = document.id(event.target).addClass('active');
		this.fireEvent('mousedown');
	},
	
	mouseup: function(event){
		if(this.mouse.active) this.mouse.active.removeClass('active');
		this.mouse.active = null;
		return this;
	},	
	
	mouseleave: function(){
		this.mouse.coords = {x: null, y: null};
		this.mouse.target = false;
		this.mouse.node = false;
		if(this.hover) this.hover();
	},
	
	mouse: function(event){
		this.mouse.coords = this.getCoords(event);
		var target = this.getTarget(event);
		this.mouse.target = target.target;
		this.mouse.node	= target.node;
	},
	
	getTarget: function(event){
		var target = event.target;
		var node;
		while(!(/mif-tree/).test(target.className)){
			target = target.parentNode;
		};
		var re = (/mif-tree-(toggle|icon|name|checkbox|node)/);
		var test = target.className.match(re);
		if(!test){
			return {
				node: null,
				target: 'node'
			};
		}
		for(var i = 6; i > 0; i--){
			if(test[i]){
				var type = test[i];
				break;
			}
		}
		target = document.id(target);
		return {
			node: Mif.uid(target.getAncestor('.mif-tree-node').getAttribute('uid')),
			target: type
		};
	},
	
	getCoords: function(event){
		var wrapper = this.wrapper;
		var position = wrapper.getPosition();
		var x = event.page.x - position.x;
		var y = event.page.y - position.y;
		if((y - wrapper.scrollTop > wrapper.clientHeight) || (x - wrapper.scrollLeft > wrapper.clientWidth)){//scroll line
			y = -1;
		};
		return {x: x, y: y};
	},
	
	keyDown: function(event){
		this.key = event;
		this.key.property = 'down';
		if(this.focused) this.fireEvent('keydown', [event]);
	},
	
	keyUp: function(event){
		this.key = {};
		this.key.property = 'up';
		if(this.focused) this.fireEvent('keyup', [event]);
	},
	
	toggleDblclick: function(event){
		var target = this.mouse.target;
		if(!(target == 'name'||target == 'icon'||target == 'node') || !this.mouse.node) return;
		this.mouse.node.toggle();
	},
	
	toggleClick: function(event){
		if(this.mouse.target != 'toggle') return;
		this.mouse.node.toggle();
	},
	
	initScroll: function(){
		this.scroll = new Fx.Scroll(this.wrapper, {link: 'cancel'});
	},
	
	scrollTo: function(node, animate){
		var top = 0;
		var element = node.getDOM('node');
		while(element != this.wrapper){
			top += element.offsetTop;
			element = element.offsetParent;
		}
		var height = node.getDOM('node').offsetHeight;
		var up = (top < this.wrapper.scrollTop);
		var down = (top > (this.wrapper.scrollTop + this.wrapper.clientHeight - height));
		if(!up && !down) {
			this.scroll.fireEvent('complete');
			return;
		}
		var pos = top - (down ? this.wrapper.clientHeight - height : 0);
		if(this.animateScroll && animate != false){
			this.scroll.start(this.wrapper.scrollLeft, pos);
		}else{
			this.scroll.set(this.wrapper.scrollLeft, pos);
			this.scroll.fireEvent('complete');
		}
	},
	
	updateOpenState: function(){
		this.addEvents({
			'drawChildren': function(parent){
				var children = parent.children;
				for(var i = 0, l = children.length; i < l; i++){
					children[i].updateOpenState();
				}
			},
			'drawRoot': function(){
				this.root.updateOpenState();
			}
		});
	},
	
	expandTo: function(node){
		if (!node) return this;
		var path = [];
		while( !node.isRoot() && !(this.forest && node.getParent().isRoot()) ){
			node = node.getParent();
			if(!node) break;
			path.unshift(node);
		};
		path.each(function(el){
			el.toggle(true);
		});
		return this;
	},
	
	initExpandTo: function(){
		this.addEvent('loadChildren', function(parent){
			if(!parent) return;
			var children = parent.children;
			for( var i = children.length; i--; ){
				var child = children[i];
				if(child.expandTo) this.expanded.push(child);
			}
		});
		function expand(){
			this.expanded.each(function(node){
				this.expandTo(node);
			}, this);
			this.expanded = [];
		};
		this.addEvents({
			'load': expand.bind(this),
			'loadNode': expand.bind(this)
		});
	}
	
});

Array.implement({
	
	inject: function(added, current, where){//inject added after or before current;
		var pos = this.indexOf(current) + (where == 'before' ? 0 : 1);
		for(var i = this.length-1; i >= pos; i--){
			this[i + 1] = this[i];
		}
		this[pos] = added;
		return this;
	}
	
});

String.implement({
	
	repeat: function(times){
		return new Array(times + 1).join(this);
	}
	
});
