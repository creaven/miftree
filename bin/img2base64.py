#!/opt/local/bin/python2.5

import os, re, base64, sys

class makeImage:
	
	def __init__(self, dir):
		self.dir = dir;
		self.get_dirs();
		self.make_images();
		
	def get_dirs(self):
		self.dirs = [];
		for filename in os.listdir(self.dir):
			path = os.path.join(self.dir, filename)
			if os.path.isdir(path):
				self.dirs.append(path)
				
	def make_images(self):
		for dir in self.dirs:
			self.make_image(dir)
			
	def make_image(self, dir):
		data = {}
		for filename in os.listdir(dir):
			if not re.search('\.(gif|png|jpg)$', filename):
				continue
			file = os.path.join(dir, filename)
			data[filename] = base64.b64encode(open(file).read())
		name = os.path.split(dir)[1]
		result = """/*
---

name: %s
description: Mif images
license: MIT-Style License (http://mifjs.net/license.txt)
copyright: Anton Samoylov (http://mifjs.net)
authors: Anton Samoylov (http://mifjs.net)
requires: []
provides: %s

...
*/
""" %  (name, name)
		result += '/*\nContent-Type: multipart/related; boundary="SEPARATOR"\n\n*/\n'
		result += "if(!window.MifImg) MifImg = {};\n$extend(MifImg, {\n"
		for filename in data:
			header = """
		--SEPARATOR
		Content-Type:image/%s
		Content-Location:%s
		Content-Transfer-Encoding:base64
		*/
		""" % (filename[-3:], filename)
			result += "\n\t'" + filename + "': /*\n" + header + "\n'" + data[filename] + "',\n"
		result = result[0:-2] + "\n"
		result += "\n});\n"
		#result += "\n/*\n--SEPARATOR--\n*/\n"
		jsfile = dir + '.js'
		open(jsfile, 'w').write(result)

makeImage(os.path.join(os.path.dirname(__file__), '../Source/Image'));