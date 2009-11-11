/*mootools patch*/

if(document.documentElement.getBoundingClientRect){//ie, opear9.5+, ff3+
	
	Element.implement({

		getOffsets: function(){
			var bound = this.getBoundingClientRect(),
				html = $(this.getDocument().documentElement),
				htmlScroll = html.getScroll(),
				elemScrolls = this.getScrolls(),
				elemScroll = this.getScroll(),
				isFixed = (this.getComputedStyle('position') == 'fixed');

			return {
				x: bound.left.toInt() + elemScrolls.x - elemScroll.x + ((isFixed) ? 0 : htmlScroll.x) - html.clientLeft,
				y: bound.top.toInt()  + elemScrolls.y - elemScroll.y + ((isFixed) ? 0 : htmlScroll.y) - html.clientTop
			};
		}
	
	});

}
