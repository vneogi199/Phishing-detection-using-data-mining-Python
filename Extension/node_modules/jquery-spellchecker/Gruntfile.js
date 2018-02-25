/*global module:false*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/js/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.js',
        nonull: true
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: "src/examples/**", dest: "dist/examples/"},
          {expand: true, src: "src/css/*", dest: "dist/css/"}
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*!\n' +
                ' * <%= pkg.name %> <%= pkg.version %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
                ' * <%= pkg.repository.url %>\n' +
                ' * License: <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                ' */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          "dist/css/jquery.spellchecker.min.css": ["src/css/jquery.spellchecker.css"]
        }
      }
    },
    compress: {
      zip: {
        options: {
          archive: "archive/jquery.spellchecker-<%= pkg.version %>.zip"
        },
        files: [
          { expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.name %>-<%= pkg.version %>' }
        ]
      }
    },
    jasmine : {
      dist: {
        src : [
          'src/js/libs/jquery/jquery-1.8.2.min.js',
          'src/js/jquery.spellchecker.js'
        ],
        options: {
          vendor: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/findandreplacedomtext/src/findAndReplaceDOMText.js'
          ],
          specs : 'tests/javascript/spec/**/*.js'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/js/jquery.spellchecker.js', 'tests/javascript/**/*.js'],
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        jquery: true,
        globals: {
          require: false,
          module: false,
          alert: false
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify', 'cssmin', 'copy', 'compress']);
};
