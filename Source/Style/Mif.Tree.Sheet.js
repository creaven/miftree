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
		'font-family': '"Lucida Grande", Helvetica, Arial, sans-serif',
		'font-size': '12px',
		'white-space': 'nowrap',
		'cursor': 'default',
		'color': '#000',
		'background': '#fff'
	},
	
	'.mif-tree-wrapper:focus': {
		'outline': '0'
	},
	
	'.mif-tree-wrapper span': {
		'padding': '2px auto',
		'cursor': 'inherit',
		'display': 'inline-block',
		'height': '100%',
		'vertical-align': 'top',
		'overflow': 'hidden'
	},
	
	'.mif-tree-wrapper .mif-tree-node': {
		'height': '18px',
		'line-height': Browser.Engine.webkit ? '20px' : '18px'
	},
	
	'.mif-tree-children .mif-tree-node-wrapper': {
		'padding-left': '18px'
	},

	'.mif-tree-node': {
		'position': 'relative'
	},

	'.mif-tree-wrapper .mif-tree-name': {
		'cursor': 'default',
		'margin-left': '4px'
	},
	
	/*toggles*/
	'.mif-tree-toggle': {
		'width': '18px',
		'margin-right': '4px',
		'z-index': '1',
		'overflow': 'hidden',
		'background-repeat': 'no-repeat',
		'background-position': 'center center',
		'cursor': 'default'
	},

	'.mif-tree-toggle-none': {
		'background': 'none'
	},

	'.mif-tree-toggle-expanded': {
		'background-image': 'toggle-expanded.png'.toMifImg()
	},

	'.mif-tree-toggle-collapsed': {
		'background-image': 'toggle-collapsed.png'.toMifImg()
	},
	
	'.mif-tree-hover-toggle .mif-tree-toggle-expanded.active': {
		'background-image': 'toggle-expanded-pressed.png'.toMifImg()
	},
	
	'.mif-tree-hover-toggle .mif-tree-toggle-collapsed.active': {
		'background-image': 'toggle-collapsed-pressed.png'.toMifImg()
	},
	
	'.mif-tree-node-selected .mif-tree-toggle-expanded': {
		'background-image': 'toggle-expanded-selected.png'.toMifImg()
	},
	
	'.mif-tree-node-selected .mif-tree-toggle-collapsed': {
		'background-image': 'toggle-collapsed-selected.png'.toMifImg()
	},
	
	'.mif-tree-hover-toggle.mif-tree-node-selected .mif-tree-toggle-expanded.active': {
		'background-image': 'toggle-expanded-selected-pressed.png'.toMifImg()
	},
	
	'.mif-tree-hover-toggle.mif-tree-node-selected .mif-tree-toggle-collapsed.active': {
		'background-image': 'toggle-collapsed-selected-pressed.png'.toMifImg()
	},
	
	'.mif-tree-icon': {
		'width': '18px',
		'background-position': '0 50%',
		'background-repeat': 'no-repeat',
		'cursor': 'inherit'
	},

	'.mif-tree-icon-expanded': {
		'background-image': 'icon-expanded.png'.toMifImg()
	},

	'.mif-tree-icon-collapsed': {
		'background-image': 'icon-collapsed.png'.toMifImg()
	},
	
	'.mif-tree-hover-node': {
		'background': '#D5E7FF'
	},
	
	'.mif-tree-node-selected' :{
		'background-color': '#5C97FB',
		'color': '#fff'
	},
	
	'.mif-tree-loader-open-icon, .mif-tree-loader-close-icon': {
		'background-image': 'loader.gif'.toMifImg()
	}

});

(function(){
	for(var i = 1; i < 30; i++){
		var rule = '.mif-tree-children '.repeat(i) + ' .mif-tree-node-wrapper';
		Mif.sheet.addRule(rule, 'padding-left: ' + 22*i + 'px');
	}
})();
