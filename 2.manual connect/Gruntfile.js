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
      publicFiles : {
        files : 'public/**/*',
        options : {
          livereload : true
        }
      },
      scripts : {
        files : 'typescripts/**/*.ts',
        tasks: ['typescript']
      }
    },
    typescript: {
      base: {
        src: ['typescripts/**/*.ts'],
        dest: 'public/javascripts',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          basePath: 'typescripts',
          sourceMap: true,
          references: ['typescripts/typings/tsd.d.ts']
        }
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

