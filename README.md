** IN PROGRESS **

About
-----
This repository is the consortium.io document collection. Its complied in a redistributable way.
We're hosting this on docs.consortium.io. If you just want to download the papers use the
folder dist/docs

Features
--------
 	
 	- WebService
 	- Validation
 		- html5
 		- Javascript
 		- css
 	- Index generation
 	- Live Reload on file change

Requirements for local development or viewing
---------------------------------------------

	- Mac OS or Linux (tested on Ubuntu precise,trusty, Mac OS 10.9)
	- git
	- terminal knowledge
	- a text editor (i.e. sublimetext)
	- a browser
	- node.js (tested with 0.10.37)
	- grunt (tested with grunt 0.4.5)
    - bower 


Installation
------------
This repository comes with a nodejs setup to serve the documents locally. This is needed if you want to change or add documents, serve them in your local network or develop the display code.

Install Node [https://www.npmjs.com/](npm) for your operating system. On Debian/Ubuntu 
its probably best not to use the (outdated) node version from your default repository.
We use [https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories](nodesource).

For Mac OS download and install the latest NPM Install Package from [https://nodejs.org/download/](nodejs.org)

Install git for cloning the documents. On Ubuntu/Debian type:

    sudo apt-get install git

On Mac OS follow installation instruction provided on [http://git-scm.com/downloads](here)

After git installation yo need to clone the repository, we use the commandline but you could use a git frontend as well.
	
	git clone https://github.com/consortium/hybrid-publishing-research.git

Once the documents and the viewing and validation code is installed in your local directory we need to install all dependencies, so the system works. This is quite easy you just need to copy paste all the command in your terminal.

Open a terminal and change directory to hybrid-publishing-research:

	cd hybrid-publishing-research/

Install grunt globally (you need admin access to install npm packages globally)

	sudo npm install -g grunt-cli

Install all other node dependencies via npm:

	npm install

All packages will be installed in node_modules. Now node is installed - we still need to 
get all the frontend libraries that are used in the browser.  

Back in the hybrid-publishing-research folder use grunt to load all libraries and generate all needed files. Type:

	  grunt 

If everything went ok, use grunt to start a node instance to serve your files:

	  grunt serve

Your Browser will open and you can visit the sites on [http://localhost:8080](http://localhost:8080)

To stop the webserver type ctrl-C in the terminal.


If you have any issues, don't hesitate to file an issue on github or send us an email


Edit or add Content
-------------------

This repository comes with a node.js setup to serve the documents locally. 
This is not a necessary, but helps develop clean html with, the integrated 
validator.

Install the package. Once you have it installed the best way is to create
a new git branch with

	git checkout -b mybranch

After this feel free to edit the files with the your favourite text editor. You 
can use the template folder as a starter for your new dossier.

	cp -r dist/docs/_template dist/docs/mydossier

If everything is in place start a validation round to see if your new added
content holds up.

	grunt validation


	Validation started for.. dist/docs/mydossier/x-html-example.html
	>> Validation successful..
	Validation report generated: validation-report.json

If something turns red see the command line output to debug your dossier.

After successful debugging commit everything to our repository and file a pull request
so we can add the new dossier to the master branch and the consortium website. Please
use meaningful commit notes.
	
	git add dist/docs/mydossier*

	git commit -m 'Added a cool index on microbreweries - This is still a draft - looking 
	for people who want to help me collect'

	git push origin mybranch

Go to [https://github.com/consortium/hybrid-publishing-research](https://github.com/consortium/hybrid-publishing-research) and file a pull request.

Testing
-------

	N/A yet


Grunt commands
-------

	grunt  -  (default) executes building, validation and indexing
    grunt serve  -  start webservice


Commands normally not needed:

    grunt index  -  meta command build an index out of all resources
    grunt build  -  meta command do all building tasks
    grunt validation  -  html validation
    grunt bower-install-simple  -  install bower dependencies
    grunt bower  -  extract all files from bower_components and copy to /lib
    grunt bower_concat  -  concat js and css files
    grunt cssmin  -  css minification
    grunt js  -  meta command do all js related tasks
    grunt jshint  -  hint js files
    grunt uglify  -  minify js
    grunt qunit  -  do unit testing 
   	grunt metaparser  -  create an index based on metadata
   	grunt execute    
   	grunt gitfetch  -  does git fetch
   	grunt gitreset  -  resets git to latest commit origin/master 
   	grunt upgrade   -  meta command upgrade all to latest commit (deleting local changes!)



Todo
----
	see github issues

License
-------

	Dossiers:

		If not mentioned otherwise in the document the text is licensed
		under the Creative Commons CC-BY-DE 3.0 License.

		Copyright holder of text and images are by there authors and owners

	Viewer Logic:

		The MIT License (MIT)
	 	
	 	Copyright (c) 2015 Hybrid Publishing Consortium
 			Johannes Amorosa <amorosa@posteo.de>
 			Christina Kral
 			Loraine Furter
 			Simon Worthington

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.

	Software used:
 	
 		Angularjs Bootstrap jquery bower grunt node underscore express mustache socket.io assemble grunt grunt-autoprefixer grunt-contrib-connect grunt-contrib-cssmin grunt-contrib-jshint grunt-contrib-qunit grunt-contrib-uglify grunt-contrib-watch grunt-fileindex grunt-html-sitemap grunt-bower-concat grunt-html-validation grunt-bower grunt-sass grunt-zip node-sass
