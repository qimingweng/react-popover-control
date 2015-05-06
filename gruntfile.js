module.exports = function(grunt) {
  // Config
  grunt.initConfig({
    sass: {
      build: {
        files: {
          "build/style.css": "sass/main.scss"
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8888
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    browserify: {
      js: {
        src: 'js/app.js',
        dest: 'build/bundle.js',
        options: {
          transform: ['babelify'],
          watch: true,
          browserifyOptions: {
            debug: true
          }
        }
      }
    }
  });

  // Register tasks
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');

  // Tasks
  grunt.registerTask('build', [
  //   // preparation stage
  //   'clean', // empty the "/build" directory
  //   'copy', // copy the contents of "/src" into "/build"
    
  //   // css stage
    'sass', // compile the css

  //   // js stage
  //   // {possibly} 'reactify', here
    'browserify', // compile the js
  ]);

  // Dev builds the project, then hosts it and watches it
  // grunt.registerTask('dev', ['build', 'connect', 'watch']);
  grunt.registerTask('dev', ['build', 'connect', 'watch']);
}