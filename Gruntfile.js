'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: {
        src: ['dist/**/*']
      }
    },
    jshint: {
      // define the files to lint
      files: ['src/**/*.js']
    },
    csslint: {
      options: {
        'adjoining-classes': false,
        'box-sizing': false
      },
      // define the files to lint
      files: ['src/**/*.css']
    },
    concat: {
      js: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name%>-<%= pkg.version%>.js'
      },
      css: {
        src: ['src/**/*.css'],
        dest: 'dist/<%= pkg.name%>-<%= pkg.version%>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version%> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version%>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version%> */'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version%>.min.css': ['<%= concat.css.dest %>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('default', ['clean', 'lint', 'build']);

};
