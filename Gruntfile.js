/* global module:false */
module.exports = function(grunt) {

    var port = grunt.option('port') || 8080;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
                '/*!\n' +
                ' * consortium-viewer.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' * https://github.com/consortium/hybrid-publishing-research\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (c) 2015 Hybrid Publishing Consortium\n' +
                ' * Libraries used: \n' +
                ' * Copyright (c) 2010-2015 Google, Inc. http://angularjs.org\n' +
                ' * Copyright (c) 2011-2015 Twitter, Inc. http://getbootstrap.com\n' +
                ' * Copyright 2014 jQuery Foundation,  http://jquery.com/\n' +
                ' */'
        },

        qunit: {
            files: [ 'test/*.html' ]
        },
        
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n',
                compress: true,
                sourceMap: true,
                mangle: false
            },
            myTarget: {
                files: {
                    'dist/js/all.min.js': ['js/bower.js','js/consortium-viewer.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/all.min.css': ['css/bower.css', 'css/main.css']
                }
            }
        },
        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    head: false,
                    module: false,
                    console: true,
                    unescape: false,
                    define: false,
                    exports: false,
                    angular: true,
                    $: false,
                    _: false
                }
            },
            files: [ 'Gruntfile.js', 'js/consortium-viewer.js' ]
        },
        
        gitfetch: {
            task: {
              options: {
                all: true
              }
            }
        },

        gitreset: {
            task: {
                options: {
                    mode: 'hard',
                    commit: 'origin/master'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: './dist',
                    livereload: 35005,
                    open: true
                }
            }
        },
        
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [ 'Gruntfile.js', 'js/consortium-viewer.js' ],
                tasks: 'js'
            },
            html: {
                files: [ 'dist/index.html.src'],
                tasks: 'angularHtmlify'
            },
            css: {
                files: [ 'css/main.css' ],
                tasks: 'cssmin'
            },
            json: {
                files: [ 'dist/index.json' ]
            }
        },

        validation: {
            options: {
                relaxerror: [
                    'Bad value X-UA-Compatible for attribute http-equiv on element meta.', 
                    'Bad value SCHEMA.DC for attribute rel on element link: The string schema.dc is not a registered keyword.',
                    'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.',
                    'Article lacks heading. Consider using h2-h6 elements to add identifying headings to all articles.',
                    'This interface to HTML5 document checking is deprecated.'
                ],
                doctype: 'HTML5',
                reset: true,
                failHard: true
                //reset: grunt.option('reset') || false,
                //stoponerror: false,
            },
            files: {
                src: [ 'dist/docs/**/*.html', '!dist/docs/_**/*.html', '!**/assets/**']
            }
        },

        "bower-install-simple": {
            prod: {
                options: {
                    production: true
                }
            }
        },

        bower: {
            dev: {
                dest: 'lib/',
                js_dest: 'lib/js/',
                css_dest: 'lib/css/',
                fonts_dest: 'lib/font/',  
                options: {
                    expand: true
                }
            }
        },

        bower_concat: {
          all: {
            dest: 'js/bower.js',
            cssDest: 'css/bower.css',
            bowerOptions: {
              relative: false
            }
          }
        },
        
        execute: {
            options: {
                // execute node with additional arguments 
                //args: ['docs/**/*.html', '!docs/_template*/*.html']
                args:['metadata.json','validation-report.json']
            },
            target: {
                src: ['createindex.js']
            }
        },
        
        angularHtmlify: {
            dist: {
                files: {
                    'dist/index.html': 'dist/index.html.src'
                }
            }
        },

        metaparser: {
            'metadata.json': ['dist/docs/**/*.html', '!dist/docs/_template*/*.html', '!**/assets/**'],
            options: {
                required: [
                    // We omit "DC" and categories in metatags. Of course they have to exist in the document i.e. "DC.title" or "DC.identifier.URL"
                    // Beware this is case sensitive. 
                    'title', 
                    'creator',
                    'subject',
                    'abstract',
                    'date',
                    'type',
                    'format',
                    'language',
                    'uRL',
                    'rights',
                    'contributor',
                    'bibliographicCitation',
                    'publisher',
                    'identifier'
                ]
            }
        }

    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });


    // Dependencies
    grunt.loadNpmTasks( 'grunt-contrib-qunit' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-bower-install-simple' );
    grunt.loadNpmTasks( 'grunt-angular-htmlify' );

    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-bower' );
    grunt.loadNpmTasks( 'grunt-html-validation' );
    grunt.loadNpmTasks( 'grunt-bower-concat' );
    grunt.loadNpmTasks( 'grunt-execute' );
    grunt.loadNpmTasks( 'grunt-metaparser' );
    grunt.loadNpmTasks( 'grunt-git' );

    // Default task
    grunt.registerTask( 'default', [ 'build', 'index', 'angularHtmlify'] );
    
    // Building bricks
    grunt.registerTask( 'js', [ 'jshint', 'uglify', 'qunit' ] );
    grunt.registerTask( 'depbuild', [ 'bower-install-simple', 'bower', 'bower_concat', 'cssmin' ] );

    // git fetch and rebase
    grunt.registerTask( 'upgrade', [ 'gitfetch', 'gitreset', 'build', 'index' ] );
    
    
    // Build
    grunt.registerTask( 'build', [ 'depbuild', 'js' ] );

    // Indexing
    grunt.registerTask( 'index', [ 'validation', 'metaparser', 'execute' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint', 'qunit', 'validation' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'connect', 'watch'] );
};
