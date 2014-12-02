module.exports = function(grunt) {
  var proxyHost = grunt.option('proxy_host') || "localhost";
  grunt.initConfig({
    connect : {
      server : {
        options : {
          livereload : true,
          port : 9000,
          base : "public"
        }
      }
    },
    watch : {
      options : {
        livereload : true
      },
      css : {
        files : 'public/stylesheets/**/*.css'
      },
      scripts : {
        files : 'public/javascripts/**/*.js'
      },
      html : {
        files : 'public/**/*.html'
      }
    }
  });
  
  var pkg = grunt.file.readJSON('package.json');
  var taskName;
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }
};

