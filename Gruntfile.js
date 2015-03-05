/* global module:false */
module.exports = function(grunt) {

    var port = grunt.option('port') || 8000;
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
                ' * Copyright (C) 2015 Hybrid Publishing Consortium\n' +
                ' */'
        },

        qunit: {
            files: [ 'test/*.html' ]
        },
        
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            myTarget: {
                files: {
                    'js/all.min.js': ['js/bower.js','js/consortium-viewer.js']
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
                    console: false,
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
                    base: '.',
                    livereload: true,
                    open: true
                }
            }
        },
        
        html_sitemap: {
            options: {
                searchPath: 'docs/',
                template: 'template.html'
            },
            files: {
                'index.html': ['docs/**/*.html']
            }
        },

        fileindex: {
            list: {
                options: {
                    format: 'json_flat',
                    pretty: true
                },
                files: [
                    {dest: 'list.json', src: ['docs/**/*.html']}
                ]
            },
        
        },
        
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [ 'Gruntfile.js', 'js/consortium-viewer.js' ],
                tasks: 'js'
            },
            fileindex: {
                files: [ 'docs/**/*.html' ],
                tasks: 'fileindex'
            },
            html_sitemap: {
                files: [ 'docs/**/*.html' ],
                options: {
                    searchPath: 'docs/',
                    template: 'template.html'
                }
            },
            html: {
                files: [ 'index.html']
            }
        },

        validation: {
            options: {
                //reset: grunt.option('reset') || false,
                //stoponerror: false,
            },
            files: {
                src: ['docs/**/*.html', '!docs/_template*/*.html']
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
    grunt.loadNpmTasks( 'grunt-html-sitemap');
    grunt.loadNpmTasks( 'grunt-fileindex' );
    grunt.loadNpmTasks( 'grunt-bower' );
    grunt.loadNpmTasks( 'grunt-html-validation' );
    grunt.loadNpmTasks( 'grunt-bower-concat' );

    // Default task
    grunt.registerTask( 'default', [ 'js' ] );
    // JS task
    grunt.registerTask( 'js', [ 'bower', 'bower_concat', 'jshint', 'uglify', 'qunit' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'fileindex', 'html_sitemap', 'bower_concat', 'connect', 'watch'] );
    grunt.registerTask( 'index', [ 'fileindex', 'html_sitemap' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint', 'qunit', 'validation' ] );

};
