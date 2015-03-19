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
fs.writeFile("index.json", printableJson, function(err) {
      if (err) throw('File save error: '+ err);
      console.log('Index file saved');
});


// We need some git infos to display in the browser
var info = getRepoInfo();
var gitInfos =  '{"branch" : "' + info.branch + '", "sha" : "' + info.sha + '", "abbreviatedSha" :"' + info.abbreviatedSha + '", "tag" :"' + info.tag + '"}'

// Write gitinfo.json file
fs.writeFile("gitinfo.json", gitInfos, function(err) {
      if (err) throw('File save error: '+ err);
      console.log('gitinfo file saved');
});