/*
Mif.Tree.KeyNav
*/
Mif.Tree.KeyNav=new Class({
	
	initialize: function(tree){
		this.tree=tree;
		tree.wrapper.setAttribute('tabIndex',1);
		tree.wrapper.addEvent('keydown',function(event){
			if(!['down','left','right','up'].contains(event.key)) return;
			if(!tree.selected){
				tree.select(tree.forest ? tree.root.getFirst() : tree.root);
			}else{
				var current=tree.selected;
				switch (event.key){
					case 'down': this.goForward(current);event.stop();break;  
					case 'up': this.goBack(current);event.stop();break;   
					case 'left': this.goLeft(current);event.stop();break;
					case 'right': this.goRight(current);event.stop();break;
				}
			}
			var height=tree.height;
			function autoScroll(){
				var wrapper=tree.wrapper;
				var i=tree.selected.getVisiblePosition();
				var top=i*height-wrapper.scrollTop;
				var bottom=top+height;
				if(top<height){
					wrapper.scrollTop-=height;
				}
				if(wrapper.offsetHeight-bottom<height){
					wrapper.scrollTop+=height;
				}
			}
			autoScroll();
		}.bind(this));
	},

	goForward: function(current){
		var forward=current.getNextVisible();
		if( forward ) this.tree.select(forward)
	},
	
	goBack: function(current){
		var back=current.getPreviousVisible();
		if (back) this.tree.select(back);
	},
	
	goLeft: function(current){
		if(current.isRoot()){
			if(current.isOpen()){
				current.toggle();
			}else{
				return false;
			}
		}else{
			if( current.hasChildren() && current.isOpen() ){
				current.toggle();
			}else{
				if(current.tree.forest && current.getParent().isRoot()) return false;
				return this.tree.select(current.getParent());
			}
		}
	},
	
	goRight: function(current){
		if(!current.hasChildren()&&!current.loadable){
			return false;
		}else if(!current.isOpen()){
			return current.toggle();
		}else{
			return this.tree.select(current.getFirst());
		}
	}
});
