var htmlTree = new Class({

	Extends: Mif.Tree,
	
	options: {
		className: 'html-tree'
	},
	
	getTarget: function(event){
		var target = event.target;
		var cls = target.className.trim();
		while(!(/mif-tree/).test(target.className)){
			target = target.parentNode;
		}
		var test = target.className.match(/mif-tree-(toggle)-[^n]|mif-tree-(name)/);
		if(!test){
			return {
				node: false,
				target: 'node'
			};
		}
		for(var i = 3; i > 0; i--){
			if(test[i]){
				var type = test[i];
				break;
			}
		}
		if(type == 'name' && cls != 'tag'){
			return {
				node: false,
				target: 'node'
			};
		}
		return {
			node: Mif.uid(target.getAttribute('uid')),
			target: type
		};
	}

});

Mif.sheet.addRules({
	'.html-tree .mif-tree-icon': {
		'display': 'none'
	},
	
	'.html-tree .mif-tree-name': {
		'margin': 0,
		'white-space': 'normal'
	},
	
	'.html-tree .mif-tree-toggle': {
		'margin': 0
	}/*,
	
	'.html-tree .mif-tree-node-selected': {
		'background': 'transparent'
	},
	
	'.html-tree .mif-tree-node-selected .mif-tree-name': {
		'background': '#6473DC'
	}*/
	
});

htmlTree.Node = htmlTree.prototype.Node = new Class({

	Extends: Mif.Tree.Node,
	
	hide: function(){
		this.property.hidden = true;
		this.getDOM('node').style.display = 'none';
	},
	
	show: function(){
		this.property.hidden = false;
		this.getDOM('node').style.display = 'block';
	},
	
	isHide: function(){
		return this.property.hidden;
	},
	
	getNextVisible: function(){
		var node = this;
		do{
			node = Mif.Tree.Node.prototype.getNextVisible.apply(node);
			if(!node) return false;
		}while(node.isHide())
		return node;
	},
	
	getPreviousVisible: function(){
		var node = this;
		do{
			node = Mif.Tree.Node.prototype.getPreviousVisible.apply(node);
			if(!node) return false;
		}while(node.isHide())
		return node;
	}

});


htmlTree.KeyNav = htmlTree.prototype.KeyNav = new Class({
	
	Extends: Mif.Tree.KeyNav,

	goForward: function(current){
		var forward = current;
		do{
			forward = forward.getNextVisible();
			if(!forward) return;
		}while(forward.property.cls == 'tag-close');
		if( forward ) this.tree.select(forward);
	},
	
	goBack: function(current){
		var back = current;
		do{
			back = back.getPreviousVisible();
			if(!back) return;
		}while(back.property.cls == 'tag-close');
		if (back) this.tree.select(back);
	}

});

window.addEvent('domready', function(){

	DOMTree = new htmlTree({
		container: document.id('tree_container'),
		forest: true,
		defaults: {
			cls: 'tag-open',
			loadable: true
		},
		height: 18,
		onToggle: function(node, state){
			var next = node.getNext();
			if(!next) return;
			next[state ? 'show' : 'hide']();
		},
		onDrawChildren: function(parent){
			parent.children.each(function(child){
				if(child.property.cls != 'tag-close') return;
				child.hide();
			});
		},
		onSelect: function(node){
			if(node.property.cls == 'tag-close'){
				node.tree.select(node.getPrevious());
			}
			this.wrapper.focus();
		}
	});

	var json = [{
		name: '&lt;<span class="tag">html</span>&gt;',
		el: $(document.documentElement)
	},
	{
		name: '&lt;/<span class="tag">html</span>&gt;',
		loadable: false,
		cls: 'tag-close'
	}];

	DOMTree.load({json: json});

	DOMTree.loadOptions = function(node){
		var json = [];
		var el = node.property.el;
		el.getChildren().each(function(child){
			var attrs = '';
			Array.each(child.attributes, function(attr){
				attrs += " " + attr.nodeName + '="<span class="attr-value">' + attr.nodeValue + '</span>"';
			});
			var name;
			if(!child.getChildren().length){
				var text = child.firstChild ? child.firstChild.nodeValue : '';
				name = '&lt;<span class="tag">' + child.get('tag') + '</span>' + attrs + '&gt;<span class="value">' + text +  '</span>&lt;/<span class="tag">' + child.get('tag') + '</span>&gt;';
				var loadable = false;
			}else{
				name = '&lt;<span class="tag">' + child.get('tag') + '</span>' + attrs + '&gt;';
				loadable = true;
			}
			json.push({
				name: name,
				loadable: loadable,
				el: child
			});
			json.push({
				name: '&lt;/<span class="tag">' + child.get('tag')+'</span>&gt;',
				loadable: false,
				cls: 'tag-close'
			});
		});
		return {json: json};
	};

	if(Browser.Engine.trident){
		(new Element('div', {styles:{color: 'red', fontSize: '20px', paddingLeft: '20px'}}).set('html', 'LOL IE')).injectBefore($('tree_container'));
	}

});
