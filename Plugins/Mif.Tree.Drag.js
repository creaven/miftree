/*
Mif.Tree.Drag
*/
Mif.Tree.Drag = new Class({
	
	Implements: [new Events, new Options],
	
	options:{
		snap: 4,
		animate: true,
		open: 600,//time to open node
		scrollDelay: 100,
		scrollSpeed: 100,
		modifier: 'control',//copy
		startPlace: ['icon', 'name']
	},

	initialize: function(tree, options){
		tree.drag=this;
		this.setOptions(options);
		$extend(this,{
			tree: tree,
			dragged: false,
			snap: this.options.snap
		});
		$extend(tree.defaults, {
			dropDenied: [],
			dragDisabled: false
		});
		tree.addEvent('drawRoot',function(){
			tree.root.dropDenied.include('before').include('after');
		});
		this.pointer=new Element('div').addClass('mif-tree-pointer').injectInside(tree.wrapper);
		this.dragTargetSelect();
		this.attachMouseEvents();
		this.attachEvents();
	},
	
	dragTargetSelect: function(){
		function addDragTarget(){
			this.current.getDOM('name').addClass('mif-tree-drag-current')
		}
		function removeDragTarget(){
			this.current.getDOM('name').removeClass('mif-tree-drag-current');
		}
		this.addEvent('start',addDragTarget.bind(this));
		this.addEvent('beforeComplete',removeDragTarget.bind(this));
	},

	attachMouseEvents: function(){
		this.tree.wrapper.addEvents({
			mousedown: this.mousedown.bindWithEvent(this),
			mouseup: this.mouseup.bind(this),
			mousemove: this.mousemove.bindWithEvent(this),
			keydown: this.keydown.bindWithEvent(this),
			mouseleave: this.mouseleave.bind(this)
		});
		document.addEvent('mouseup',this.externalUp.bind(this));
		this.pointer.addEvents({
			'mouseup' : this.mouseup.bind(this),
			'mousemove' : this.mousemove.bindWithEvent(this) 
		});
	},

	mousedown: function(event){
		if(this.current || this.$completing) return;
		var target=this.tree.mouse.target;
		if(!target) return;
		this.current=$splat(this.options.startPlace).contains(target) ? this.tree.mouse.node : false;
		if(!this.current) return;
		if(this.current.DDdisabled){
			this.current=false;
		}
		if(this.current){
			this.startX = event.client.x;
			this.startY = event.client.y;
		}
	},
	
	mousemove: function(event){
		if(!this.current || this.$completing ||
			(!this.dragged && Math.sqrt(Math.pow(event.client.x-this.startX,2)+Math.pow(event.client.y-this.startY,2))<this.snap)
		) return false;
		if(!this.dragged){
			this.start(event);
		}else{
			this.check(event);
			this.autoScroll(event);
		}
	},

	mouseup: function(){
		if(this.$completing) return;
		if (this.dragged) {
			this.clean();
			$clear(this.scrolling);
			this.$completing=true;
			this.fireEvent('beforeComplete');
			this.drop();
		}else if(this.current){
			this.current=false;
		}
		
	},
	
	externalUp: function(){
		if(this.dragged){
			this.fireEvent('cancel');
		}
	},
	
	mouseleave: function(){
		if(this.dragged) {
			this.where='notAllowed';
			this.fireEvent('drag');
		}
	},
	
	keydown: function(event){
		if(event.key=='esc'){
			this.fireEvent('cancel');
		}
	},
	
	autoScroll: function(event){
		var y=this.y;
		if(y==-1) return;
		var wrapper=this.tree.wrapper;
		var top=y-wrapper.scrollTop;
		var bottom=wrapper.offsetHeight-top;
		var sign=0;
		if(top<this.tree.height){
			var delta=top;
			sign=1;
		}else if(bottom<this.tree.height){
			var delta=bottom;
			sign=-1;
		}
		if(sign && !this.scrolling){
			this.scrolling=function(node){
				if(y!=this.y){
					y=this.y;
					delta = (sign==1 ? (y-wrapper.scrollTop) : (wrapper.offsetHeight-y+wrapper.scrollTop))||1;
				}
				wrapper.scrollTop=wrapper.scrollTop-sign*this.options.scrollSpeed/delta;
			}.periodical(this.options.scrollDelay, this, [sign])
		}
		if(!sign){
			$clear(this.scrolling);
			this.scrolling=null;
		}
	},
	
	attachEvents: function(){
		this.addEvent('drag', this.drag.bind(this));
		this.addEvent('complete', this.complete.bind(this));
		this.addEvent('cancel', this.cancel.bind(this));
	},
	
	start: function(event){
		this.tree.unselect();
		this.addGhost(event);
		this.dragged=true;
		this.fireEvent('start');
	},
	
	cancel: function(){
		this.where='notAllowed';
		this.mouseup();
	},
	
	complete: function(){
		this.target=false;
		this.current=false;
		this.where=false;
		this.dragged=false;
		this.$completing=false;
		this.ghost.dispose();
	},

	drag: function(){
		this.clean();
		var where=this.where;
		var target=this.target;
		var ghostType=where;
		if(where=='after'&&(target.getNext())||where=='before'&&(target.getPrevious())){
			ghostType='between';
		}
		this.ghost.firstChild.className='mif-tree-ghost-icon mif-tree-ghost-'+ghostType;
		if(where == 'notAllowed'){
			this.tree.unselect();
			return;
		}
		this.tree.select(target);
		if(where == 'inside'){
			if(!target.isOpen() && !this.openTimer && (target.loadable||target.hasChildren()) ){
				this.wrapper=target.getDOM('wrapper');
				this.wrapper.style.cursor='progress';
				this.openTimer=function(){
					target.toggle();
					this.clean();
				}.delay(this.options.open,this);
			}
		}else{
			var wrapper=this.tree.wrapper;
			var top=this.index*this.tree.height;
			if(where=='after') top+=this.tree.height;
			this.pointer.setStyles({
				display: 'block',
				left: wrapper.scrollLeft,
				top: top,
				width: wrapper.clientWidth
			});
		}
	},

	clean: function(){
		this.pointer.style.width=0;
		if(this.openTimer){
			$clear(this.openTimer);
			this.openTimer=false;
			this.wrapper.style.cursor='inherit';
			this.wrapper=false;
		}
	},
	
	addGhost: function(event){
		var wrapper=this.current.getDOM('wrapper');
		var ghost=new Element('span').addClass('mif-tree-ghost');
		ghost.adopt(Mif.Tree.Draw.node(this.current).getFirst());
		ghost.injectInside(document.body)
			.addClass('mif-tree-ghost-notAllowed')
			.setStyles({
				position:'absolute',
				left:event.page.x+20,
				top:event.page.y+20
			})
			.makeDraggable().start(event);
		new Element('span').set('html',Mif.Tree.Draw.zeroSpace).injectTop(ghost);
		ghost.getLast().getFirst().className='';
		this.ghost=ghost;
	},
	
	check: function(event){
		this.y=this.tree.mouse.coords.y;
		var target=this.tree.mouse.node;
		this.target=target;
		if(!target){
			this.target=false;
			this.where='notAllowed';
			this.fireEvent('drag');
			return;
		}
		if(this.current.contains(target)){
			this.where='notAllowed';
			this.fireEvent('drag');
			return;
		}
		this.index=Math.floor(this.y/this.tree.height)
		var delta=this.y-this.index*this.tree.height;
		var deny=this.target.dropDenied;
		if(this.tree.sortable){
			deny.include('before').include('after');
		}
		var where;
		if(!deny.contains('inside') && delta>(this.tree.height/4) && delta<(3/4*this.tree.height)){
			where='inside';
		}else{
			if(delta<this.tree.height/2){
				if(deny.contains('before')){
					if(deny.contains('inside')){
						where=deny.contains('after') ? 'notAllowed' : 'after';
					}else{
						where='inside';
					}
				}else{
					where='before';
				}
			}else{
				if(deny.contains('after')){
					if(deny.contains('inside')){
						where=deny.contains('before') ? 'notAllowed' : 'before';
					}else{
						where='inside';
					}
				}else{
					where='after';
				}
			}
		}
		if(this.where==where && this.target==target) return;
		this.where=where; this.target=target;
		this.fireEvent('drag');
	},
	
	drop: function(){
		var current=this.current, target=this.target, where=this.where;
		if(this.where=='notAllowed'){
			var scroll=this.tree.scroll;
			scroll.addEvent('complete',function(){
				scroll.removeEvent('complete', arguments.callee);
				if(this.options.animate){
					var wrapper=current.getDOM('wrapper');
					var position=wrapper.getPosition();
					this.ghost.set('morph',{
						duration: 'short',
						onComplete: function(){
							this.fireEvent('complete', [current, target, where]);
						}.bind(this)
					});
					this.ghost.morph({left: position.x, top: position.y});
					return;
				};
				this.fireEvent('complete', [current, target, where]);
				return;
			}.bind(this));
			this.tree.select(this.current);
			this.tree.scrollTo(this.current);
			return;
		}
		var action=this.tree.key[this.options.modifier] ? 'copy' : 'move';
		if(this.where=='inside' && !target.isOpen()){
			target.toggle();
			if(target.$loading){
				var self=this;
				var onLoad=function(){
					self.tree[action](current, target, where);
					self.fireEvent('complete');
					target.removeEvent('load',onLoad);
				}
				target.addEvent('load',onLoad);
				return;
			}
		}
		this.tree[action](current, target, where);
		this.fireEvent('complete', [current, target, where]);
	}
});
