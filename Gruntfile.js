module.exports = function (grunt) {
    var config = {
            pkg: grunt.file.readJSON('package.json'),
            rig: {
                compile: {
                    options: {
                        banner: '/* Compiled : <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n'
                    },
                    files: {
                        'bin/clock.js': [
                            'lib/rigger/rigger.js'
                        ]
                    }
                }
            },
            jshint: {
                all: [
                    'Gruntfile.js',
                    'bin/clock.js',
                    'src/*.js',
                    'test/*.js'
                ]
            },
            nodeunit: {
                all: [
                    'test/*.js'
                ]
            },
            uglify: {
                all: {
                    options: {
                        beautify: false
                    },
                    files: {
                        'clock.js': ['bin/clock.js']
                    }
                }
            }
        };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['rig', 'jshint', 'nodeunit', 'uglify']);
};