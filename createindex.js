/* The MIT License (MIT)

Copyright (c) 2015 Hybrid Publishing Consortium
    Johannes Amorosa <amorosa@posteo.de>

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

-- creatindex.js

This script does several things and is part of the hybrid publishing consortium
research viewer suite.

Right now it does: 
    1. Merges metadata.json with validation-report.json,
    based on there keys and writes the output to index.json.
    Everything is hard coded and ugly this will be addressed :D
    
    2. gets some git information and creates a json file

    All these files are read by the angular script for the frontend.
    This file gets executed with grunt and won't work like this.
*/


var fs 			= require('fs')
var _ 			= require('underscore')
var getRepoInfo = require('git-repo-info');

var pathlist 	= process.argv.slice(2)
var metadataObj = require("./" + pathlist[0]);
var reportObj 	= require("./" + pathlist[1]);

var merge = function() {
    var destination = {},
        sources = [].slice.call( arguments, 0 );
    
    sources.forEach(function( source ) {
        var prop;
        for ( prop in source ) {
            if ( prop in destination && Array.isArray( destination[ prop ] ) ) {
                
                // Concat Arrays
                destination[ prop ] = destination[ prop ].concat( source[ prop ] );
                
            } else if ( prop in destination && typeof destination[ prop ] === "object" ) {
                
                // Merge Objects
                destination[ prop ] = merge( destination[ prop ], source[ prop ] );
                
            } else {
                
                // Set new values
                destination[ prop ] = source[ prop ];
                
            }
        }
    });
    return destination;
};


// Merge the different JSON files by key
var mergeData = merge(metadataObj,reportObj)
mergeData = _.compact(_.flatten(mergeData, true));
var printableJson = JSON.stringify(mergeData, null, 2);

// Write index.json file
fs.writeFile("dist/index.json", printableJson, function(err) {
      if (err) throw('File save error: '+ err);
      console.log('Index file saved');
});


// We need some git infos to display in the browser
var info = getRepoInfo();
var gitInfos =  '{"branch" : "' + info.branch + '", "sha" : "' + info.sha + '", "abbreviatedSha" :"' + info.abbreviatedSha + '", "tag" :"' + info.tag + '"}'

// Write gitinfo.json file
fs.writeFile("dist/gitinfo.json", gitInfos, function(err) {
      if (err) throw('File save error: '+ err);
      console.log('gitinfo file saved');
});