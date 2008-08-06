/*
Mif.Tree.Row
*/
Mif.Tree.implement({

	initRows: function(){
		this.addRowWrapper();
		this.addEvent('drawRoot',function(){
			new Element('div',{'id':'mif-tree-row-'+this.root.UID, "class": 'mif-tree-row'}).injectInside(this.rowWrapper);
			new Element('div').addClass('mif-tree-row-container').injectInside(this.rowWrapper);
		}.bind(this));
		this.addEvent('drawChildren',function(node){
			Mif.Tree.Draw.rowChildren(node);
		});
		this.addEvent('toggle',function(node, state){
			node.getRowDOM('container').style.display=state ? 'block' : 'none';
		});
		this.addEvent('selectChange',function(node, state){
			node.getRowDOM('node')[(state ? 'add' : 'remove') + 'Class']('mif-tree-row-selected');
		});
		this.addEvent('hover', function(node, target, state){
			if(target!='node'||!node) return;
			var domNode=node.getRowDOM('node');
			var action=(state=='over' ? 'add' : 'remove') +'Class';
			domNode[action]('mif-tree-row-hover');
			if(node.state.selected) domNode[action]('mif-tree-row-hover-selected');
		}.bind(this));
		this.addEvent('structureChange', function(from, to, where, type){
			if(type=='copy'){
				var dom=Mif.Tree.Draw.row(from);
				var fromNode=dom.getFirst(), fromContainer = dom.getLast();
			}else{
				var fromNode=from.getRowDOM('node'), fromContainer=from.getRowDOM('container');
			}
			this.injectRowDOM(fromNode, fromContainer, to, where);
		});
		this.addEvent('remove', function(node){
			node.getRowDOM('node').destroy();
		});
		this.addEvent('updateNode',function(node){
			node.getRowDOM('container').style.display=node.isOpen() ? 'block' : 'none';
		});
	},
	
	injectRowDOM: function(fromNode, fromContainer, to, where){
		var toNode=to.getRowDOM('node'), toContainer=to.getRowDOM('container');
		switch(where){
			case 'inside':
				fromNode.injectInside(toContainer);
				fromContainer.injectInside(toContainer);
				break;
			case 'before':
				fromNode.injectBefore(toNode);
				fromContainer.injectBefore(toNode);
				break;
			case 'after':
				fromNode.injectAfter(toContainer);
				fromContainer.injectAfter(fromNode);
				break;
		}
		this.updateHover();
	},
	
	addRowWrapper: function(){
		var wrapper=this.wrapper;
		var rowWrapper=new Element('div').injectTop(this.container).addClass('mif-tree-row-wrapper');
		this.rowWrapper=rowWrapper;
		wrapper.addEvent('scroll', function(event){//sync scroll
			rowWrapper.scrollTop=wrapper.scrollTop;
		});
		if(Browser.Engine.presto){
			wrapper.addEvent('mousewheel',function(){
				(function(){rowWrapper.scrollTop=wrapper.scrollTop;}).delay(50);
			});
		}
	}

});

Mif.Tree.Draw.rowChildren=function(node){
	if(node.tree.forest && !node.getParent()){
		var container=node.tree.rowWrapper;
	}else{
		var container=node.getRowDOM('container');
	}
	var html=[];
	var children=node.children;
	for( var i=children.length; i--; i>=0 ){
		var child=children[i];
		html.unshift('<div id="mif-tree-row-',child.UID,'" class="mif-tree-row"></div><div class="mif-tree-row-container"></div>');
	}
	container.set('html',html);
};

Mif.Tree.Draw.row=function(node){
	return new Element('div').set('html', '<div id="mif-tree-row-',node.UID,'" class="mif-tree-row"></div><div class="mif-tree-row-container"></div>');
};



Mif.Tree.Node.implement({

	getRowDOM: function(what){
		var node=$('mif-tree-row-'+this.UID);
		if(what=='node') return node;
		if(what=='container') return node.getNext();
	}

});
