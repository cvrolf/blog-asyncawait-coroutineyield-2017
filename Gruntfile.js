/* global module:false, require:false */

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        /**
         * JS ESLint
         *      @doc https://github.com/sindresorhus/grunt-eslint
         *      @doc https://github.com/babel/babel-eslint
         *      @doc I use several .eslintrc.json files. A global es6-version for /* [nodejs] and an es5-version for /public/assets/js [browser]
         */
        eslint: {
            nodejs: [
                'Gruntfile.js',
                '*.js'
            ]
        },

        /**
         * Watch
         *      @doc https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            nodejs: {
                files: [
                    '*.js',
                ],
                tasks: ['eslint:nodejs']
            }
        }

    });

    // Load specific Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');

    // Register the default tasks.
    grunt.registerTask('default', [
        'eslint','watch'
    ]);
};
