module.exports = function(grunt) {
  var proxyHost = grunt.option('proxy_host') || "localhost";
  grunt.initConfig({
    watch : {
      publicFiles : {
        files : ['public/**/*.css', 'public/**/*.js', 'public/**/*.html'],
        options : {
          livereload : true
        }
      },
      scripts : {
        files : 'public/typescripts/**/*.ts',
        tasks: ['typescript']
      }
    },
    typescript: {
      base: {
        src: ['public/typescripts/**/*.ts'],
        dest: 'public/javascripts',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          basePath: 'public/typescripts',
          sourceMap: true,
          references: ['public/typescripts/typings/tsd.d.ts']
        }
      }
    },
    clean: ["public/javascripts"]
  });
  
  var pkg = grunt.file.readJSON('package.json');
  var taskName;
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }
};

