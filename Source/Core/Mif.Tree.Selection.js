/*
Mif.Tree.Selection
*/
Mif.Tree.implement({
	
	initSelection: function(){
		this.defaults.selectClass='';
		this.wrapper.addEvent('mousedown', this.attachSelect.bindWithEvent(this));
	},
	
	attachSelect: function(event){
		if(!['icon', 'name', 'node'].contains(this.mouse.target)) return;
		var node=this.mouse.node;
		if(!node) return;
		this.select(node);
	},
	
	select: function(node) {
		if(Browser.Engine.gecko) {
			this.wrapper.focus();
		}
		var current=this.selected;
		if (current==node) return;
		if (current) {
			current.select(false);
		}
		this.selected = node;
		node.select(true);
	},
	
	unselect: function(){
		var current=this.selected;
		if(!current) return;
		this.selected=false;
		current.select(false);
	},
	
	getSelected: function(){
		return this.selected;
	},
	
	isSelected: function(node){
		return node.isSelected();
	}
	
});

Mif.Tree.Node.implement({
		
	select: function(state) {
		this.state.selected = state;
		var wrapper=this.getDOM('wrapper');
		wrapper[(state ? 'add' : 'remove')+'Class'](this.selectClass||'mif-tree-node-selected');
		this.tree.fireEvent(state ? 'select' : 'unSelect', [this]);
		this.tree.fireEvent('selectChange', [this, state]);
	},
	
	isSelected: function(){
		return this.state.selected;
	}
	
});
