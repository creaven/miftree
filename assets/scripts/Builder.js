/*
Script: Builder.js
	Automatically includes MooTools files right from the project folder.

License:
	MIT-style license.

Note:
	If you use this script in your own page, you must be out of your mind.
*/

var Build = new Class({

	url: '../list',

	initialize: function(url){
		this.url = url || this.url;
		this.local();
		this.getList();
		this.loadScripts();
		return this;
	},
	
	local: function(){
		Browser.Request = function(){
			return $try(function(){
				return new ActiveXObject('MSXML2.XMLHTTP');
			}, function(){
				return new XMLHttpRequest();
			});
		};
		Request.implement({
			isSuccess: function() {
				return (!this.status || (this.status >= 200) && (this.status < 300));
			}
		});
	},
	
	getList: function(){
		new Request({
			url: this.url,
			method: 'get',
			async: false,
			onComplete: function(result){
				this.list = result.split('\n');
			}.bind(this)
		}).send();
	},
	
	loadScripts: function(){
		document.writeln('\t<script type="text/javascript" src="../image.js"></script>');
		this.list.each(function(src){
			document.writeln('\t<script type="text/javascript" src="' + src + '"></script>');
		});
	}

});

new Build();