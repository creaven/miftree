/*
---
 
name: Mif.Tree.Draw
description: convert javascript tree object to html
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: Mif.Tree
provides: Mif.Tree.Draw
 
...
*/

Mif.Tree.implement({

	getHTML: function(node, html){
		var prefix = 'mif-tree-';
		var checkbox;
		if(node.property.checked != undefined){
			if(!node.hasCheckbox) node.property.checked='nochecked';
			checkbox = '<span class="mif-tree-checkbox mif-tree-node-' + node.property.checked+'" uid="' + node.UID + '"></span>';
		}else{
			checkbox = '';
		}
		html = html || [];
		html.push(
		'<div class="mif-tree-node ',(node.isLast() ? 'mif-tree-node-last' : ''),'"'+(node.property.hidden ? ' style="display:none"' : '') + ' id="',prefix,node.UID,'">',
			'<span class="mif-tree-node-wrapper ',node.property.cls,(node.property.selected ? ' mif-tree-node-selected' : ''),'" uid="',node.UID,'">',
				'<span class="mif-tree-toggle mif-tree-toggle-',node.getToggleType(),'" uid="',node.UID,'"></span>',
				checkbox,
				'<span class="mif-tree-icon ',(node.property.closeIconUrl?'" style="background-image: url(' + node.property.closeIconUrl + ')" ': node.property.closeIcon+'"'),' uid="',node.UID,'"></span>',
				'<span class="mif-tree-name" uid="',node.UID,'">',node.property.name,'</span>',
			'</span>',
		'</div>',
		'<div class="mif-tree-children ',(node.isLast() ? 'mif-tree-children-last' : ''),'" style="display:none"></div>'
		);
		return html;
	},
	
	drawChildren: function(parent, container){
		parent.open = true;
		parent.$draw = true;
		var html = [];
		var children = parent.children;
		for(var i = 0, l = children.length; i < l; i++){
			this.getHTML(children[i], html);
		}
		container = container || parent.getDOM('children');
		container.set('html', html.join(''));
		parent.tree.fireEvent('drawChildren',[parent]);
	},
	
	drawRoot: function(){
		var domRoot = this.drawNode(this.root);
		//console.log(tree.wrapper, domRoot);
		//domRoot.inject(tree.wrapper, 'inside');
		this.wrapper.adopt(domRoot);
		this.$draw = true;
		this.fireEvent('drawRoot');
	},
	
	drawForestRoot: function(){
		var container = new Element('div').addClass('mif-tree-children-root').inject(this.wrapper);
		console.log(container);
		this.drawChildren(this.root, container);
	},
	
	drawNode: function(node){
		return new Element('div').set('html', this.getHTML(node).join('')).getChildren();
	},
	
	isUpdatable: function(node){
		if(
			(!node || !node.tree) ||
			(node.getParent() && !node.getParent().$draw) || 
			(node.isRoot() && (!node.tree.$draw || node.tree.forest)) 
		) return false;
		return true;
	},
	
	update: function(node){
		if(!this.isUpdatable(node)) return null;
		if(!node.hasChildren()) node.property.open=false;
		node.getDOM('toggle').className = 'mif-tree-toggle mif-tree-toggle-'+node.getToggleType();
		if (node.property.closeIconUrl) {
			node.getDOM('icon').setStyle('background-image', 'url(' + (node.isOpen() ? node.property.openIconUrl : node.property.closeIconUrl) + ')');
		} else {
			node.getDOM('icon').className = 'mif-tree-icon ' + node.property[node.isOpen() ? 'openIcon' : 'closeIcon'];
		}
		node.getDOM('node')[(node.isLastVisible() ? 'add' : 'remove') + 'Class']('mif-tree-node-last');
		if(node.$loading) return null;
		var children = node.getDOM('children');
		if(node.isOpen() && !node.property.hidden){
			if(!node.$draw) this.drawChildren(node);
			children.style.display = 'block';
		}else{
			children.style.display = 'none';
		}
		node.tree.fireEvent('updateNode', node);
		return node;
	},
	
	updateInject: function(node, elements){
		if(!this.isUpdatable(node)) return;
		elements = elements || [node.getDOM('node'), node.getDOM('children')];
		if(!elements[0]) elements = this.node(node);
		var previous = node.getPrevious();
		if(previous){
			new Elements([elements[1], elements[0]]).inject(previous.getDOM('children'), 'after');
			return;
		}
		var container;
		if(node.tree.forest && node.parentNode.isRoot()){
			container = node.tree.wrapper.getElement('.mif-tree-children-root');
		}else if(node.tree.root == node){
			container = node.tree.wrapper;
		}else{
			container = node.parentNode.getDOM('children');
		}
		new Elements([elements[1], elements[0]]).inject(container, 'top');
	}
	
});
