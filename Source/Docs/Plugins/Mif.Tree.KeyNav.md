Tree.KeyNav {#Tree.KeyNav}
==========================

Implement key navigation. Walk with ['up','down','left','right'] keys.

### Example:

	var treeWithKeyNav = new Tree({
							initialize: function(){
								new Tree.KeyNav(this);
							},
							//...other options
						});