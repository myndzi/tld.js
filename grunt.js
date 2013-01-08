"use strict";

/*global module:false*/
/*jshint node:true strict: true */

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-closure-compiler');

  // Project configuration.
  grunt.initConfig({
    lint:   {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch:  {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    min: {
      browser: {
        dest: 'dist/tld.min.js',
        src: 'dist/tld.js'
      }
    },
    concat: {
      json: {
        src: [ 'src/rules-intro.js', 'src/rules.json', 'src/rules-outro.js' ],
        dest: 'src/rules.js',
        options: {
          separator: ' '
        }
      }
    },
    'closure-compiler': {
      browser: {
        js: [ './browser/exports.js', './lib/rule.js', '/src/rules.js', './lib/tld.js' ],
        jsOutputFile: 'dist/tld.js',
        options: {
          compilation_level: 'WHITESPACE_ONLY',
          language_in: 'ECMASCRIPT5_STRICT',
          process_common_js_modules: null,
          common_js_entry_module: './browser'
        }
      }
    },
    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true
      },
      globals: {

      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('build', 'concat:json closure-compiler');

  // Custom Task to build files
  grunt.registerTask('update',
    'Update ruleset from publicsuffix.org dataset.',
    require(__dirname + '/lib/grunt/update.js')(grunt)
  );
};
