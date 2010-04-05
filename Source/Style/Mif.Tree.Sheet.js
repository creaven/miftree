/*
---
 
name: Mif.Tree.Sheet
description: Mif.Tree styles
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: [Mif/Mif, Mif.Tree.Image]
provides: Mif.Tree.Sheet
 
...
*/

Mif.sheet.addRules({
	
	'.mif-tree-wrapper': {
		'position': 'relative',
		'width': '100%',
		'height': '100%',
		'margin': '0',
		'padding': '0',
		'overflow': 'auto',
		'font-family': 'Lucida Grande, Helvetica, Arial, sans-serif',
		'font-size': '12px',
		'line-height': '18px',
		'white-space': 'nowrap',
		'cursor': 'default',
		'color': '#000'
	},
	
	'.mif-tree-wrapper:focus': {
		'outline': '0'
	},
	
	'.mif-tree-wrapper span': {
		'padding': '2px auto',
		'cursor': 'inherit'
	},
	
	'.mif-tree-children .mif-tree-node-wrapper': {
		'padding-left': '18px'
	},

	'.mif-tree-node': {
		'position': 'relative'
	},

	'.mif-tree-name': {
		'cursor': 'default',
		'overflow': 'hidden',
		'margin-left': '4px'
	},
	
	'.mif-tree-hover-node': {
		'background': '#DBE8FC'
	},
	
	/*@toggles*/
	'.mif-tree-gadjet': {
		'padding-right': '16px',
		'z-index': '1',
		'overflow': 'hidden',
		'background-repeat': 'no-repeat',
		'background-position': 'center center',
		'cursor': 'default'
	},

	'.mif-tree-gadjet-none': {
		'background': 'none'
	},

	'.mif-tree-gadjet-minus': {
		'background-image': 'toggle-collapse.png'.toMifImg()
	},

	'.mif-tree-gadjet-plus': {
		'background-image': 'toggle-expand.png'.toMifImg()
	}

});

(function(){
	for(var i = 1; i < 30; i++){
		var rule = '.mif-tree-children '.repeat(i) + ' .mif-tree-node-wrapper';
		Mif.sheet.addRule(rule, 'padding-left: ' + 18*i + 'px');
	}
})();
