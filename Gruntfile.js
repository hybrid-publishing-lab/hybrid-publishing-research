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
                compress: true
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
                    'dist/css/all-min.css': ['css/bower.css', 'css/main.css']
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
                    angular: true
                }
            },
            files: [ 'Gruntfile.js', 'js/consortium-viewer.js' ]
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: './dist',
                    livereload: true,
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
                files: [ 'dist/index.html']
            },
            css: {
                files: [ 'css/main.css' ],
                tasks: 'cssmin'
            }
        },

        validation: {
            options: {
                relaxerror: [
                    'Bad value X-UA-Compatible for attribute http-equiv on element meta.', 
                    'Bad value SCHEMA.DC for attribute rel on element link: The string schema.dc is not a registered keyword.']
                //reset: grunt.option('reset') || false,
                //stoponerror: false,
            },
            files: {
                src: ['dist/docs/**/*.html', '!dist/docs/_template*/*.html']
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
        
        metaparser: {
            'metadata.json': ['dist/docs/**/*.html', '!dist/docs/_template*/*.html']
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

    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-bower' );
    grunt.loadNpmTasks( 'grunt-html-validation' );
    grunt.loadNpmTasks( 'grunt-bower-concat' );
    grunt.loadNpmTasks( 'grunt-execute' );
    grunt.loadNpmTasks( 'grunt-metaparser' );

    // Default task
    grunt.registerTask( 'default', [ 'js' ] );
    // JS task
    grunt.registerTask( 'js', [ 'bower', 'bower_concat', 'jshint', 'uglify','cssmin', 'qunit' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'bower_concat', 'cssmin', 'connect', 'watch'] );
    grunt.registerTask( 'index', [ 'validation', 'metaparser', 'execute' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint', 'qunit', 'validation' ] );

};
