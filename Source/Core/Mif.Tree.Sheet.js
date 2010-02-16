
Mif.Tree.Sheet = new Stylesheet();

for(var i = 1; i < 30; i++){
	Mif.Tree.Sheet.addRule('.mif-tree-children '.repeat(i) + '.mif-tree-node-wrapper', {
		'padding-left': 18*i
	});
}
