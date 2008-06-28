Mif.Tree.implement({

	getTarget: function(event){
		var target=event.target;
		var cls=target.className;
		while(!/mif-tree/.test(target.className)){
			target=target.parentNode;
		}
		var test=target.className.match(/mif-tree-(gadjet)-[^n]|mif-tree-(name)/);
		if(!test){
			return {
				node: false,
				target: 'node'
			}
		}
		for(var i=3;i>0;i--){
			if(test[i]){
				var type=test[i];
				break;
			}
		}
		if(type=='name' && cls!='tag'){
			return {
				node: false,
				target: 'node'
			}
		}
		return {
			node: this.$[target.getAttribute('uid')],
			target: type
		}
	}

});


Mif.Tree.Node.prototype.getNextVisible_=Mif.Tree.Node.prototype.getNextVisible;
Mif.Tree.Node.prototype.getPreviousVisible_=Mif.Tree.Node.prototype.getPreviousVisible;

Mif.Tree.Node.implement({

	hide: function(){
		this.state.hidden=true;
		this.getDOM('node').style.display='none';
	},
	
	show: function(){
		this.state.hidden=false;
		this.getDOM('node').style.display='block';
	},
	
	isHide: function(){
		return this.state.hidden;
	},
	
	getNextVisible: function(){
		var node=this;
		do{
			node=node.getNextVisible_();
			if(!node) return false;
		}while(node.isHide())
		return node;
	},
	
	getPreviousVisible: function(){
		var node=this;
		do{
			node=node.getPreviousVisible_();
			if(!node) return false;
		}while(node.isHide())
		return node;
	}

});


Mif.Tree.KeyNav.implement({

	goForward: function(current){
		var forward=current;
		do{
			forward=forward.getNextVisible();
			if(!forward) return;
		}while(forward.type=='close');
		if( forward ) this.tree.select(forward)
	},
	
	goBack: function(current){
		var back=current;
		do{
			back=back.getPreviousVisible();
			if(!back) return;
		}while(back.type=='close');
		if (back) this.tree.select(back);
	}

});


DOMTree = new Mif.Tree({
	container: $('tree_container'),
	forest: true,
	types: {
		open:{
			cls: 'tag-open',
			loadable: true
		},
		close:{
			loadable: false,
			cls: 'tag-close'
		}
	},
	dfltType:'open',
	height: 18,
	initialize: function(){
		new Mif.Tree.KeyNav(this);
	},
	onToggle: function(node, state){
		var next=node.getNext();
		if(!next) return;
		next[state ? 'show' : 'hide']();
	},
	onDrawChildren: function(parent){
		parent.children.each(function(child){
			if(child.type!='close') return;
			child.hide();
		});
	},
	onSelect: function(node){
		if(node.type=='close'){
			node.tree.select(node.getPrevious());
		}
		this.wrapper.focus();
	}
})
.load({
	json: [{
		property: {
			name: '&lt;<span class="tag">html</span>&gt;'
		},
		data:{
			el: $(document.documentElement)
		}
	},
	{
		property: {
			name: '&lt;/<span class="tag">html</span>&gt;'
		},
		type: 'close'
	}]
});
DOMTree.loadOptions=function(node){
	var json=[];
	var el=node.data.el;
	el.getChildren().each(function(child){
		var attrs='';
		$A(child.attributes).each(function(attr){
			attrs+=" "+attr.nodeName+'="<span class="attr-value">'+attr.nodeValue+'</span>"';
		});
		var hasChildren=child.getChildren().length>0;
		if(!hasChildren){
			var text=child.firstChild ? child.firstChild.nodeValue : '';
			var name= '&lt;<span class="tag">'+child.get('tag')+'</span>'+attrs+'&gt;<span class="value">'+text+ '</span>&lt;/<span class="tag">'+child.get('tag')+'</span>&gt;';
			var loadable=false;
		}else{
			var name= '&lt;<span class="tag">'+child.get('tag')+'</span>'+attrs+'&gt;';
			loadable=true;
		}
		json.push({
			property:{
				name: name,
				loadable: loadable
			},
			data:{
				el: child
			}
		});
		json.push(
			{
			property:{
				name: '&lt;/<span class="tag">'+child.get('tag')+'</span>&gt;'
			},
			type: 'close'
		}
		);
	});
	return {json: json};
}

if(Browser.Engine.trident){
	(new Element('div', {styles:{color: 'red', fontSize: '20px', paddingLeft: '20px'}}).set('html', 'LOL IE')).injectBefore($('tree_container'));
}