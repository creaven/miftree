Mif.Tree.KeyNav {#Mif.Tree.KeyNav}
==========================

Implement key navigation. Walk with ['up','down','left','right'] keys.

### Example:

	var treeWithKeyNav = new Mif.Tree({
							initialize: function(){
								new Mif.Tree.KeyNav(this);
							},
							//...other options
						});