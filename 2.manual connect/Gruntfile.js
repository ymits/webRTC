module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 9000,
                    base: "public"
                }
            }
        },
        watch: {
            publicFiles: {
                files: ['public/**/*.css', 'public/**/*.js', 'public/**/*.html'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: 'public/typescripts/**/*.ts',
                tasks: ['typescript']
            }
        },
        typescript: {
            base: {
                src: ['public/typescripts/**/*.ts'],
                dest: 'public/javascripts',
                options: {
                    module: 'amd',
                    target: 'es5',
                    basePath: 'public/typescripts',
                    sourceMap: true,
                    references: ['public/typescripts/typings/tsd.d.ts']
                }
            }
        },
        clean: ["public/javascripts"]
    });

    var pkg = grunt.file.readJSON('package.json');
    for (var taskName in pkg.devDependencies) {
        if (taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }
};

