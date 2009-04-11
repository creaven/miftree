/*
Mif.Tree.Checkbox
*/
Mif.Tree.implement({

	initCheckbox: function(type){
		this.checkboxType=type||'simple';
		this.dfltState.checked='unchecked';
		this.defaults.hasCheckbox=true;
		this.wrapper.addEvent('click',this.checkboxClick.bind(this));
		if(this.checkboxType=='simple') return;
		this.addEvent('loadChildren', function(node){
			if(!node || node.state.checked=='unchecked') return;
			node.recursive(function(){
				this.state.checked='checked';
			});
		});
	},
	
	checkboxClick: function(event){
		if(this.mouse.target!='checkbox') {return;}
		this.mouse.node['switch']();
	},
	
	getChecked: function(includePartially){
		var checked=[];
		this.root.recursive(function(){
			var condition = includePartially ? this.state.checked!=='unchecked' : this.state.checked=='checked';
			if(this.hasCheckbox && condition) checked.push(this);
		});
		return checked;
	}

});

Mif.Tree.Node.implement({

	'switch' : function(state){
		if(this.state.checked==state||!this.hasCheckbox) return;
		var type=this.tree.checkboxType;
		var checked=(this.state.checked=='checked') ? 'unchecked' : 'checked';
		this.tree.fireEvent(checked=='checked' ? 'check' : 'unCheck', this);
		this.tree.fireEvent('checkChange', [this, (checked=='checked' ? true : false)]);
		var setState=function(node, state){
			if(!node.hasCheckbox) return;
			var oldState=node.state.checked;
			node.state.checked=state;
			if((!node.parentNode&&node.tree.$draw) || (node.parentNode && node.parentNode.$draw)){
				node.getDOM('checkbox').removeClass('mif-tree-node-'+oldState).addClass('mif-tree-node-'+state);
			}
		};
		if(type=='simple'){
			setState(this, checked);
			return false;
		};
		this.recursive(function(){
			setState(this, checked);
		});
		function setParentCheckbox(node){
			if(!node.hasCheckbox) return;
			if(!node.parentNode || (node.tree.forest && !node.parentNode.parentNode)) return;
			var parent=node.parentNode;
			var state='';
			var children=parent.children;
			for(var i=children.length; i--; i>0){
				var child=children[i];
				if(!child.hasCheckbox) continue;
				var childState=child.state.checked;
				if(childState=='partially'){
					state='partially';
					break;
				}else if(childState=='checked'){
					if(state=='unchecked'){
						state='partially';
						break;
					}
					state='checked';
				}else{
					if(state=='checked'){
						state='partially';
						break;
					}else{
						state='unchecked';
					}
				}
			}
			if(parent.state.checked==state){return;};
			setState(parent, state);
			setParentCheckbox(parent);
		};
		setParentCheckbox(this);
	}

});
