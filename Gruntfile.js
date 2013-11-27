module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    mocha: {
      all: {
        options: {
          mocha: {
            grep: grunt.option('grep')
          },
          log: true,
          reporter: 'Spec',
          run: true,
          bail: true
        },
        src: ['test/index.html'],
        nonull: true
      }
    }
  });

  // Grunt contrib tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // 3rd party modules
  grunt.loadNpmTasks('grunt-mocha');

  // Tests
  grunt.registerTask('test', ['jshint', 'mocha']);

  grunt.registerTask('default', ['test']);

};
