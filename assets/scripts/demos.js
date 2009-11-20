Request.implement({

	processScripts: function(text){
		if (this.options.evalResponse && (/(ecma|java)script/).test(this.getHeader('Content-type'))) return $exec(text);
		return text.stripScripts(this.options.evalScripts);
	}

});

var Demos = {
	
	start: function() {
		if (location.protocol == 'file:') Demos.local();
		Demos.getList();
		var hash=document.location.hash;
		if(hash){
			var demo=hash.replace('#','');
			this.demo=demo;
			Demos.load(demo)
		}
	},
	
	categories: function(json) {
		var menu = $('menu-wrapper'), list = new Hash(json);
		list.getKeys().each(function(group) {
			var demos = new Hash(list[group]);
			
			var category = new Element('h2', {'text': group}).inject(menu);
			var ul = new Element('ul', {'class': 'folder'}).inject(category, 'after');
			
			demos.each(function(value, key) {
				new Element('li').adopt(new Element('h3').adopt(new Element('a', {
					'href': '#',
					'text': value.title,
					'events': {
						'click': function(e) { 
							e.preventDefault();
							document.location.hash=key;
							Demos.load(key);
						}
					}
				}))).inject(ul);
			});
		});
	},
	
	load: function(folder) {
		window.demo_path = folder + '/';
		var wrapper = $('demos-wrapper');
		var demo = new Request.HTML({
			url: folder + '/index.html',
			onSuccess: function(tree) {
				wrapper.empty().adopt(Demos.parse(tree, folder));
				var assets = $(document.head).getElements('#demo-css, #demo-js');
				if (assets) assets.dispose();
				new Element('link', {'id': 'demo-css', 'type': 'text/css', 'rel': 'stylesheet', 'href': folder + '/demo.css'}).inject(document.head);
				new Element('script', {'id': 'demo-js', 'type': 'text/javascript', 'src': folder + '/demo.js'}).inject(document.head);
				Demos.setInformer(folder);
			}
		}).GET();
	},
	
	parse: function(tree, folder) {
		var temp = new Element('div').adopt(tree), dir = folder;
		var fixes = temp.getElements('a[href!="#"], img');

		fixes.each(function(fix) {
			var type = (fix.get('src')) ? 'src' : 'href';
			
			if (Browser.Engine.trident && type == 'src') {
				var split = window.location.pathname.split('/').slice(0, -1).join('/') + '/';
				dir = fix.get(type).replace(split, split + folder +  '/');
				fix.set(type, dir);
			}
			else fix.set(type, dir + '/' + fix.get(type));
		});
		
		return temp;
	},
	
	getList: function() {
		var request = new Request.JSON({url: 'demos.json', onComplete: Demos.categories}).GET();
	},

	local: function() {
		Request.implement({
			getXHR: function(){
				return (window.ActiveXObject) ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
			},
			isSuccess: function() {
				return (!this.status || (this.status >= 200) && (this.status < 300));
			}
		});
	},
	
	setInformer: function(folder){
		
		var info=new Element('div', {'class': 'info'}).injectTop($('demos-wrapper'));
		
		var informer={};
		['html', 'js', 'css'].each( function(type){
			informer[type]=new Element('pre', {'class': 'informer '+type,styles:{display:'none'}}).injectAfter(info);
		});
		
		new Request({
			url: folder+'/index.html',
			onComplete: function(text){
				var body='';
				text.replace(/<body[^>]*>([\s\S]*?)<\/body>/gi, function(){
					body += arguments[1] + '\n';
					return '';
				});
				informer.html.innerHTML=body.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				
			}
		}).get();
		new Request({
			url: folder+'/demo.css',
			onComplete: function(text){
				informer.css.innerHTML=text;
			}
		}).get();
		
		new Request({
			url: folder+'/demo.js',
			onComplete: function(text){
				informer.js.innerHTML=text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
			}
		}).get();
		['html', 'js', 'css'].each( function(type){
			new Element('a', {href: '#'+type, text: type}).addEvent('click', function(event){
				event.preventDefault();
				for(var item in informer){
					if(item!=type){
						informer[item].style.display='none';
					}else{
						if(informer[type].style.display=='none'){
							informer[type].style.display='block';
						}else{
							informer[type].style.display='none';
						}
					}
					
				};
			}).injectInside(info);
		});
	}
};

window.addEvent('load', Demos.start);