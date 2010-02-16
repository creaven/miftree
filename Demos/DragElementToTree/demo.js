window.addEvent('domready', function(){
	
	var Item = new Class({
		
		initialize: function(element){
			this.element = element;
		},
		
		toNode: function(tree){
			var name = this.element.getElement('span').innerHTML;
			var icon = this.element.getElement('img').getAttribute('src');
			var props ={
				property: {
					name: name,
					openIconUrl: icon,
					closeIconUrl: icon
				}
			};
			return new Mif.Tree.Node({
				parentNode: null,
				tree: tree
			}, props);
		},
		
		toElement: function(){
			return this.element;
		}
		
	});
	
	var DragElements = new Class({

		Implements: [new Events, new Options],

		Extends: Drag,

		options:{
			group: 'tree',
			droppables: [],
			snap: 4,
			query: 'div.item'
		},

		initialize: function(container, options){
			this.container = document.id(container);
			this.setOptions(options);
			$extend(this, {
				snap: this.options.snap,
				groups: [],
				droppables: [],
				action: this.options.action
			});

			this.addToGroups(this.options.group);

			this.setDroppables(this.options.droppables);

			this.current = Mif.Drag.current;
			this.target = Mif.Drag.target;
			this.where = Mif.Drag.where;

			this.element = [this.current, this.target, this.where];
			this.document = this.container.getDocument();

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
				document.addEvent('keydown', this.bound.keydown);
				this.setDroppables();
				this.droppables.each(function(item){
					item.getElement().addEvents({mouseleave: this.bound.leave, mouseenter: this.bound.enter});
				}, this);
				this.addGhost();
			}, true);
			this.addEvent('complete', function(){
				document.removeEvent('keydown', this.bound.keydown);
				this.droppables.each(function(item){
					item.getElement().removeEvent('mouseleave', this.bound.leave).removeEvent('mouseenter', this.bound.enter);
				}, this);
				var dropZone=Mif.Tree.Drag.dropZone;
				if(!dropZone || dropZone.where=='notAllowed'){
					Mif.Tree.Drag.startZone.onstop();
					Mif.Tree.Drag.startZone.emptydrop();
					return;
				}
				if(dropZone.onstop) dropZone.onstop();
				dropZone.beforeDrop();
			});
		},

		getElement: function(){
			return this.container;
		},

		addToGroups: function(groups){
			groups=$splat(groups);
			this.groups.combine(groups);
			groups.each(function(group){
				Mif.Tree.Drag.groups[group]=(Mif.Tree.Drag.groups[group]||[]).include(this);
			}, this);
		},

		setDroppables: function(droppables){
			this.droppables.combine($splat(droppables));
			this.groups.each(function(group){
				this.droppables.combine(Mif.Tree.Drag.groups[group]);
			}, this);
		},

		attach: function(){
			this.container.addEvent('mousedown', this.bound.start);
			return this;
		},

		detach: function(){
			this.container.removeEvent('mousedown', this.bound.start);
			return this;
		},

		leave: function(event){
			var dropZone=Mif.Tree.Drag.dropZone;
			if(dropZone){
				dropZone.where='notAllowed';
				Mif.Drag.ghost.firstChild.className='mif-tree-ghost-icon mif-tree-ghost-'+dropZone.where;
				if(dropZone.onleave) dropZone.onleave();
				Mif.Tree.Drag.dropZone=false;
			}

			var relatedZone=this.getZone(event.relatedTarget);
			if(relatedZone) this.enter(null, relatedZone);
		},

		onleave: function(){
			
		},

		enter: function(event, zone){
			if(event) zone=this.getZone(event.target);
			var dropZone=Mif.Tree.Drag.dropZone;
			if(dropZone && dropZone.onleave) dropZone.onleave();
			Mif.Tree.Drag.dropZone=zone;
			zone.current=Mif.Drag.current;
			if(zone.onenter) zone.onenter();
		},

		onenter: function(){
			this.onleave()
		},

		getZone: function(target){//private leave/enter
			if(!target) return false;
			var parent=$(target);
			do{
				for(var l=this.droppables.length;l--;){
					var zone=this.droppables[l];
					if( parent==zone.getElement() ) {
						return zone;
					}
				}
				parent=parent.getParent();
			}while(parent);
			return false;
		},

		keydown: function(event){
			if(event.key=='esc') {
				var zone=Mif.Tree.Drag.dropZone;
				if(zone) zone.where='notAllowed';
				this.stop(event);
			}
		},

		start: function(event){//mousedown
			if(this.options.preventDefault) event.preventDefault();
			this.fireEvent('beforeStart', this.element);
			//

			var target = document.id(event.target);
			while(target && !target.match(this.options.query)){
				target = target.getParent();
			}
			if(!target) return;
			this.source = target;
			this.current = new Item(target.clone());
			if(!this.current || this.current.dragDisabled) {
				return;
			}
			Mif.Drag.current = this.current;
			Mif.Tree.Drag.startZone = this;

			this.mouse = {
				start: event.page
			};
			this.document.addEvents({
				mousemove: this.bound.check,
				mouseup: this.bound.cancel
			});
			this.document.addEvent(this.selection, this.bound.eventStop);
		},

		drag: function(event){
			Mif.Drag.ghost.position({x:event.page.x+20,y:event.page.y+20});
			var dropZone=Mif.Tree.Drag.dropZone;
			if(!dropZone||!dropZone.ondrag) return;
			Mif.Tree.Drag.dropZone.ondrag(event);
		},

		ondrag: function(event){
			
		},

		addGhost: function(){
			var ghost=new Element('span').addClass('mif-tree-ghost');
			ghost.adopt(this.current.toElement())
			.inject(document.body).setStyle('position', 'absolute');
			new Element('span').set('html', Mif.Tree.Draw.zeroSpace).inject(ghost, 'top')
			.addClass('mif-tree-ghost-icon mif-tree-ghost-notAllowed');
			Mif.Drag.ghost=ghost;
		},
		
		emptydrop: function(){
			var position = this.source.getPosition();
			var fx = new Fx.Morph(Mif.Drag.ghost, {
				duration: 'short',
				onComplete: function(){
					Mif.Drag.ghost.dispose();
					this.fireEvent('emptydrop', this.element);
				}.bind(this)
			});
			fx.start({
				left: position.x, 
				top: position.y
			});
		},

		onstop: function(){
			
		}
		
	});
	
	new DragElements('list', {
		group: 'tree'
	});
	
	
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		initialize: function(){
			new Mif.Tree.Drag(this, {
				group: 'tree'
			});
		},
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			}
		},
		dfltType:'folder',//default node type
		height: 18//node height
	});

	var json=[
		{
			"property": {
				"name": "root"
			},
			"children": [
				{
					"property": {
						"name": "node1"
					}
				},
				{
					"property": {
						"name": "node2"
					},
					"state": {
						"open": true
					},
					"children":[
						{
							"property": {
								"name": "node2.1"
							}
						},
						{
							"property": {
								"name": "node2.2"
							}
						}
					]
				},
				{
					"property": {
						"name": "node4"
					}
				},
				{
					"property": {
						"name": "node3"
					}
				}
			]
		}
	];

	// load tree from json.
	tree.load({
		json: json
	});
	
});
