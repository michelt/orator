module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-clean")
  grunt.loadNpmTasks("grunt-contrib-copy")
  grunt.loadNpmTasks("grunt-contrib-coffee")
  grunt.loadNpmTasks("grunt-contrib-watch")

  grunt.initConfig({
    clean: {
      build: "public"
    },
    copy: {
      assets: {
        files: {
          "public/": "client/assets/**"
        }
      }
    },
    coffee: {
      compile: {
        files: {
          "public/*.js": "client/coffee/**"
        }
      }
    },
    watch: {
      coffee: {
        files: "client/coffee/**",
        tasks: "coffee:compile"
      }
    }
  })

  grunt.registerTask("build", "clean:build copy:assets coffee:compile")
  grunt.registerTask("build-watch", "build watch")
  grunt.registerTask("default", "build")

}
