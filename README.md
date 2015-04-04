Hybrid Publishing Research [![Build Status](https://travis-ci.org/consortium/hybrid-publishing-research.svg?branch=master)](https://travis-ci.org/consortium/hybrid-publishing-research)
==========================

This repository is the document collection of the consortium.io. It's compiled in a redistributable way.
We're hosting this on [https://research.consortium.io](https://research.consortium.io). If you just wish to download the documents, then find the files in the folder dist/docs.

This is an experimental publishing format developed by the hybrid publishing consortium. Please keep in mind that this is work in progress and that we are continuously adding new features. Check our roadmap and our github issue tracker. If you reuse this code, then please commit and file a pull request so we can all benefit from your development.

For further information on our efforts to create open source software for public infrastructures within publishing, visit the consortium website [https://consortium.io/about](http://www.consortium.io/about).

Features
--------
    
    - Dynamic webService for viewing documents
    - Dynamic validation for
        - html5
        - javascript
        - css
        - dublin core 
    - Dynamic index generation

Requirements for local development or local viewing
---------------------------------------------

    - tested with Ubuntu, Mac OS
    - git
    - commandline knowhow
    - a text editor (i.e. sublimetext)
    - a browser
    - node.js (tested with node.js 0.10.37)
    - grunt (tested with grunt 0.4.5)
    - bower 

Installation
------------

This repository is equipped with a node.js setup, so that you can work with the documents locally on your computer. If you want to change or add documents, serve them in your local network or develop the display code, you need to apply the following installation instruction:

Install [npm](https://www.npmjs.com/) for your operating system. We suggest that you *not* use the (outdated) node version from your default apt repository on Debian/Ubuntu. We use [nodesource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) to install the latest version of npm and node.js. If you're using Mac OS, then download and install the NPM Install Package from [nodejs.org](https://nodejs.org/download/).

For cloning documents you need to install git. If you're using Ubuntu/Debian then type the follwing command:

    sudo apt-get install git

I you're using Mac OS than follow the installation instruction provided [here](https://git-scm.com/downloads).

After completing git installation, you need to clone the repository. We use the following command line but you can use a graphical git front-end as well:
    
    git clone https://github.com/consortium/hybrid-publishing-research.git

Once you have installed the documents and the viewing- and validation code in your local directory, you will need to install all required dependencies in order for the system to work. This is quite easy: all you need is to copy&paste the following commands in your terminal.

Open a terminal and change directory to hybrid-publishing-research:

    cd hybrid-publishing-research/

Install grunt globally (you need administrative access to install npm packages globally):

    sudo npm install -g grunt-cli

Install all other node dependencies non-globally via npm:

    npm install

All packages will automatically be installed in the folder /node_modules. With all the node packages installed, all you need now is to install all the front-end libraries that are used in the browser. In order to do this use grunt to load all libraries and generate all needed files. Type the following command:

      grunt 

If this works, use grunt to start a node instance to serve the files via http:

      grunt serve

Your browser will now open and you can visit the documents on [http://localhost:8080](http://localhost:8080)

To exit the webserver type ctrl-c in the terminal.

If you have any problems, don't hesitate to report an issue on github or send us an email.

Edit or add content
-------------------

This repository is equipped with a node.js setup, so that you can serve the documents in your local network. Integrated in node.js is a code validator, which checks your edited or newly added html documents for errors and inconsistencies. We are using [grunt](http://gruntjs.com/) and several plugins to trigger building, validation and delivering tasks.

You need to install this setup described above in the installation section. Once you have done this, create a new git branch with the following command:

    git checkout -b mybranch

Having done this edit the files with the your favourite text editor. You can copy the template folder as a starting point for your new document. Use:

    cp -r dist/docs/_template dist/docs/mynewdoc

Remember only one html document is allowed per folder. All other assets should be placed in sub folders of assets. Once you have written your new document (or edited an old one), then start a validation round to check if your new added content is valid. Type:

    grunt index

Every html document that is in the dist/docs folder (ommitting _template), will be checked by the validator in two steps.

Step one checks the html5 validity described by the [w3c](http://validator.w3.org/). This step will show you if your document has unvalid code according to the html5 standard. This will be signalled to you in red in the command line output. See following example:
    
    Validation started for.. dist/docs/mynewdoc/x-html-example.html
    Running "validation:files" (validation) task

    1=> "& did not start a character reference. (& probably should have been escaped as &amp;.)" Line no: 33
    2=> "Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools)." Line no: 47
    3=> "Saw < when expecting an attribute name. Probable cause: Missing > immediately before." Line no: 65
    4=> "A slash was not immediately followed by >." Line no: 65
    5=> "End tag had attributes." Line no: 65

If necessary you can override validation directives globally. Read the manual (relaxerror) for [grunt-html-validation](https://www.npmjs.com/package/grunt-html-validation) and edit the Gruntfile accordingly. We are using this to override errors on Dublin Core metadata.

The second step validates the content according to the Dublin Core meta data standard. The output could look like this:

    Checking x-html-example.html for required meta data: 
    >> title
    >> creator
    >> subject
    >> abstract
    >> missing entry: date
    >> type
    >> format
    >> language
    >> uRL
    >> rights
    >> No of errors: 1

After you have successfully debugged your newly added content, commit your branch to the repository and file a pull request. This way we can add the new document to the master branch and the consortium website. Please make sure to descriptive commit notes. The following commands might help you do this:
    
    git add dist/docs/mynewdoc*

    git commit -m 'Added a cool index on microbreweries - This is still a draft - looking 
    for people who want to help me collect'

    git push origin mybranch

Go to [https://github.com/consortium/hybrid-publishing-research](https://github.com/consortium/hybrid-publishing-research) and file a pull request.

If you need help using git commands see the git reference on [https://git-scm.herokuapp.com/](https://git-scm.herokuapp.com/) or contact us.

Testing
-------

We're testing html validity on all documents as a part of the publishing pipeline. Right now we are checking rather simply for meta data described by the [dublin core standard](http://purl.org/dc/elements/1.1/). Both test are part of the build process. The build process is tested on command line before index is generated and fails hard if the documents are not valid. In future we maybe add a switch. Additionally on every git commit we build the master branch on [travis-ci](https://travis-ci.org/consortium/hybrid-publishing-research).

On the roadmap is unit test on the code as well. This will also be part of the publishing pipeline. See additional documentation in dist/docs/documentation for more information or better help improving existing ones.

Grunt commands
-------

These are most commonly used commands:

    grunt (default)         -  executes building, validation and indexing
    grunt serve             -  start webservice

Other grunt task which you will normally not need:

    grunt index                 -  meta command build an index out of all resources
    grunt build                 -  meta command do all building tasks
    grunt validation            -  html validation
    grunt bower-install-simple  -  install bower dependencies
    grunt bower                 -  extract all files from bower_components and copy to /lib
    grunt bower_concat          -  concat js and css files
    grunt cssmin                -  css minification
    grunt js                    -  meta command do all "js" related tasks
    grunt jshint                -  hint js files
    grunt uglify                -  minify js
    grunt qunit                 -  do unit testing 
    grunt metaparser            -  create an index based on metadata
    grunt execute               -  executes createindex.js 
    grunt gitfetch              -  does git fetch
    grunt gitreset              -  resets git to latest commit origin/master 
    grunt upgrade               -  meta command upgrade all to latest commit (deleting local changes!)

File structure
-------------

This is a descriptive view of the file structure:

    .
    ├── bower_components                ==> frontend source libraries, managed by bower
    │   ├── angular                         source frontend library
    │   ├── hybridstrap                     source frontend library
    │   └── jquery                          source frontend library
    ├── bower.json                      ==> bower package file describing the dependencies
    ├── CONTRIBUTING.md                 ==> who did contribute
    ├── createindex.js                  ==> external script gets executed by grunt - creates an index
    ├── css                             ==> source css folder
    │   ├── bower.css                       dynamic concatenated frontend libraries 
    │   ├── main.css                        custom css code (edit this!)
    ├── dist                            ==> docroot for webserver
    │   ├── css                         ==> public css folder
    │   │   └── all.min.css                 dynamic main css files with ALL necessary directives 
    │   ├── docs                        ==> document repository 
    │   ├── gitinfo.json                    a dynamic json file describing git version will be loaded by index.html
    │   ├── index.html                      the index.html
    │   ├── index.json                      a dynamic json file descibing all available documents
    │   ├── js                              public js folder
    │   │   ├── all.min.js                  a dynamic concatenated js file with ALL code
    │   │   └── all.min.js.map              map file for all.min.js
    │   └── static                      ==> static content
    │       ├── EFRE-logo.png
    │       ├── EuropafoerdertNds_farbig.png
    │       ├── favicon.gif
    │       ├── hpc-logoxx.png
    │       └── logo_leuphana-2.png
    ├── extra                           ==> extra folder to distribute 
    │   └── researchviewer.conf             startup-script for ubuntu 
    ├── Gruntfile.js                        Gruntfile with all tasks
    ├── js                              ==> source js folder
    │   ├── bower.js                        dynamic concatenated frontend libraries
    │   └── consortium-viewer.js            custom js code (edit this!)
    ├── lib                             ==> dynamic folder for grunt bower managed by grunt
    ├── LICENSE                             the license
    ├── metadata.json                       dynamic json describing meta data - generated by grunt-metaparser
    ├── node_modules                    ==> node folder managed by npm
    ├── package.json                        npm package file describing npm dependencies
    ├── README.md                           this file
    ├── test                            ==> automatic tests N/a yet
    ├── validation-report.json              dynamic file generated by grunt-validator
    └── validation-status.json              dynamic file generated by grunt-validator

Roadmap
-------
    
    0.4 Integrate export module for various targets
    0.5 Integrate more sophisticated meta data and Dublin Core validation

To do
-----
    see github issues

Coding style
------------

    Indentation: 4 characters, no tabs use spaces.

Recommended style guides: [https://code.google.com/p/google-styleguide/](https://code.google.com/p/google-styleguide/)

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
    
        Copyright (c) the copyright owners

        angularjs bootstrap jquery bower grunt node underscore express mustache
        socket.io assemble grunt grunt-autoprefixer grunt-contrib-connect 
        grunt-contrib-cssmin grunt-contrib-jshint grunt-contrib-qunit grunt-contrib-uglify 
        grunt-contrib-watch grunt-fileindex grunt-html-sitemap grunt-bower-concat 
        grunt-html-validation grunt-bower grunt-sass grunt-zip node-sass
