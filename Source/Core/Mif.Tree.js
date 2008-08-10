/*
Mif.Tree
*/
if(!Mif) var Mif={};

Mif.Tree = new Class({

	Implements: [new Events, new Options],
		
	options:{
		types: {},
		forest: false,
		animateScroll: true,
		height: 18
	},
	
	initialize: function(options) {
		this.setOptions(options);
		$extend(this, {
			types: this.options.types,
			forest: this.options.forest,
			animateScroll: this.options.animateScroll,
			dfltType: this.options.dfltType,
			height: this.options.height,
			container: $(options.container),
			UID: 0,
			$: {},
			key: {}
		});
		this.defaults={
			name: '',
			cls: '',
			openIcon: 'mif-tree-empty-icon',
			closeIcon: 'mif-tree-empty-icon',
			loadable: false
		};
		this.dfltState={
			open: false
		};
		this.updateOpenState();
		Mif.Tree.UID++;
		this.DOMidPrefix='mif-tree-'+Mif.Tree.UID+'-';
		this.wrapper=new Element('div').addClass('mif-tree-wrapper').injectInside(this.container);
		this.initEvents();
		this.initScroll();
		this.initSelection();
		this.initHover();
	},
	
	initEvents: function(){
		this.wrapper.addEvents({
			mousemove: this.mouse.bindWithEvent(this),
			mouseover: this.mouse.bindWithEvent(this),
			mouseout: this.mouse.bindWithEvent(this),
			mouseleave: this.mouseLeave.bind(this),
			mousedown: $lambda(false),
			click: this.toggleClick.bindWithEvent(this),
			dblclick: this.toggleDblclick.bindWithEvent(this),
			keydown: this.keyDown.bindWithEvent(this),
			keyup: this.keyUp.bindWithEvent(this)
		});
		if(Browser.Engine.trident){
			this.wrapper.addEvent('selectstart', $lambda(false));
		}
	},
	
	$getIndex: function(){//return array of visible nodes.
		this.$index=[];
		var node=this.forest ? this.root.getFirst() : this.root;
		do{
			this.$index.push(node);
		}while(node=node.getNextVisible());
	},
	
	mouseLeave: function(){
		this.mouse.coords={x:null,y:null};
		this.mouse.target=false;
		this.mouse.node=false;
		if(this.hover) this.hover();
	},
	
	mouse: function(event){
		this.mouse.coords=this.getCoords(event);
		var target=this.getTarget(event);
		this.mouse.target=target.target;
		this.mouse.node	= target.node;
	},
	
	getTarget: function(event){
		var target=event.target, node;
		while(!/mif-tree/.test(target.className)){
			target=target.parentNode;
		}
		var test=target.className.match(/mif-tree-(gadjet)-[^n]|mif-tree-(icon)|mif-tree-(name)|mif-tree-(checkbox)/);
		if(!test){
			var y=this.mouse.coords.y;
			if(y==-1||!this.$index) {
				node=false;
			}else{
				node=this.$index[((y)/this.height).toInt()];
			}
			return {
				node: node,
				target: 'node'
			};
		}
		for(var i=5;i>0;i--){
			if(test[i]){
				var type=test[i];
				break;
			}
		}
		return {
			node: this.$[target.getAttribute('uid')],
			target: type
		};
	},
	
	getCoords: function(event){
		var position=this.wrapper.getPosition();
		var x=event.page.x-position.x;
		var y=event.page.y-position.y;
		var wrapper=this.wrapper;
		if((y-wrapper.scrollTop>wrapper.clientHeight)||(x-wrapper.scrollLeft>wrapper.clientWidth)){//scroll line
			y=-1;
		}
		return{
			x: x,
			y: y
		};
	},
	
	keyDown: function(event){
		this.key=event;
		this.key.state='down';
	},
	
	keyUp: function(event){
		this.key={};
		this.key.state='up';
	},
	
	toggleDblclick: function(event){
		var target=this.mouse.target;
		if(!(target=='name'||target=='icon')) return;
		this.mouse.node.toggle();
	},
	
	toggleClick: function(event){
		if(this.mouse.target!='gadjet') return;
		this.mouse.node.toggle();
	},
	
	initScroll: function(){
		this.scroll=new Fx.Scroll(this.wrapper);
	},
	
	scrollTo: function(node){
		var position=node.getVisiblePosition();
		var top=position*this.height;
		var up=top<this.wrapper.scrollTop;
		var down=top>(this.wrapper.scrollTop+this.wrapper.offsetHeight);
		if(position==-1 || ( !up && !down ) ) {
			this.scroll.fireEvent('complete');
			return false;
		}
		if(this.animateScroll){
			this.scroll.start(this.wrapper.scrollLeft, top-(down ? this.wrapper.offsetHeight-this.height : 0));
		}else{
			this.scroll.set(this.wrapper.scrollLeft, top-(down ? this.wrapper.offsetHeight-this.height : 0));
			this.scroll.fireEvent('complete');
		}
	},
	
	updateOpenState: function(){
		this.addEvents({
			'drawChildren': function(parent){
				var children=parent.children;
				for(var i=0, l=children.length; i<l; i++){
					children[i].updateOpenState();
				}
			},
			'drawRoot': function(){
				this.root.updateOpenState();
			}
		});
	}
	
});
Mif.Tree.UID=0;

Mif.Tree.version='1.1dev';
