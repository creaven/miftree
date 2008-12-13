/*mootools patch*/

if(document.documentElement.getBoundingClientRect){//ie, opear9.5+, ff3+

	Element.implement({

		getPosition: function(relative){
			rect=this.getBoundingClientRect();
			var clientTop = document.html.clientTop || document.body.clientTop || 0, clientLeft = document.html.clientLeft || document.body.clientLeft || 0
			var position={x: rect.left-this.scrollLeft-clientLeft, y:rect.top-this.scrollTop-clientTop};
			var relativePosition = (relative && (relative = $(relative))) ? relative.getPosition() : {x: 0, y: 0};
			return {x: position.x - relativePosition.x, y: position.y - relativePosition.y};
		}
		
	});

}