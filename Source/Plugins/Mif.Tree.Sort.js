/*
Mif.Tree.Sort
*/
Mif.Tree.implement({
	
	initSortable: function(sortFunction){
		this.sortable=true;
		this.sortFunction=sortFunction||function(node1, node2){
			if(node1.name>node2.name){
				return 1;
			}else if(node1.name<node2.name){
				return -1;
			}else{
				return 0;
			}
		}
		this.addEvent('loadChildren', function(parent){
			if(parent) parent.sort();
		});
		this.addEvent('structureChange', function(from, to, where, type){
			from.sort();
		});
		return this;
	}
	
});


Mif.Tree.Node.implement({

	sort: function(sortFunction){
		this.children.sort(sortFunction||this.tree.sortFunction);
		return this;
	}
	
});
