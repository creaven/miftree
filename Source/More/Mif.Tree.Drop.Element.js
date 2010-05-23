/*
---
 
name: Mif.Tree.Drop.Element
description: dom element droppable
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: Mif.Tree.Drop
provides: Mif.Tree.Drop.Element
 
...
*/

Mif.Tree.Drop.Element=new Class({

	Implements: [Options, Events],

	initialize: function(element, options){
		
		this.element=$(element);
		
		this.setOptions(options);
		
	},
	
	getElement: function(){
		return this.element;
	},
	
	onleave: function(){
		Mif.Drag.where='notAllowed';
		Mif.Drag.ghost.firstChild.className='mif-tree-ghost-icon mif-tree-ghost-'+Mif.Drag.where;
	},
	
	onenter: function(){
		Mif.Drag.where='inside';
		Mif.Drag.ghost.firstChild.className='mif-tree-ghost-icon mif-tree-ghost-'+Mif.Drag.where;
	},
	
	beforeDrop: function(){
		if(this.options.beforeDrop){
			this.options.beforeDrop.apply(this, [this.current, this.trarget, Mif.Drag.where]);
		}else{
			this.drop();
		}
	},
	
	drop: function(){
		Mif.Drag.ghost.dispose();
		this.fireEvent('drop', Mif.Drag.current);
	}
	
});
