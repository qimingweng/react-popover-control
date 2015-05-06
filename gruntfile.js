module.exports = function(grunt) {
  grunt.initConfig({
    "babel": {
      dist: {
        files: {
          "lib/popover.js": "src/popover.js"
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-babel");
  grunt.registerTask("publish", ["babel"]);
};