/*mootools patch*/

if(Browser.Engine.presto950){

	Element.implement({

		getPosition: function(relative){
			rect=this.getBoundingClientRect();
			var position={x: rect.left-this.scrollLeft, y:rect.top-this.scrollTop};
			var relativePosition = (relative && (relative = $(relative))) ? relative.getPosition() : {x: 0, y: 0};
			return {x: position.x - relativePosition.x, y: position.y - relativePosition.y};
		}
		
	});

}
