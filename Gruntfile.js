var path = require("path");
var pkg = require("./package.json");

module.exports = function (grunt) {
    // Path to the client src
    var srcPath = path.resolve(__dirname, "src");
    var buildPath = path.resolve(__dirname, "build");

    // Load grunt modules
    grunt.loadNpmTasks('grunt-hr-builder');
    grunt.loadNpmTasks('grunt-http-server');

    // Init GRUNT configuraton
    grunt.initConfig({
        "pkg": pkg,
        "hr": {
            "app": {
                "source": path.resolve(__dirname, "node_modules/happyrhino"),

                // Base directory for the application
                "base": srcPath,

                // Application name
                "name": "Example",

                // Mode debug
                "debug": true,

                // Main entry point for application
                "main": "main",

                // Build output directory
                "build": buildPath,

                // Static files map
                "static": {},

                // Stylesheet entry point
                "style": path.resolve(srcPath, "resources/stylesheets/main.less")
            }
        },
        "http-server": {
            'dev': {
                root: buildPath,
                port: process.env.PORT || 5000,
                host: "127.0.0.1",
                showDir : true,
                autoIndex: true,
                defaultExt: "html",
                runInBackground: false
            }
    }
    });

    // Build
    grunt.registerTask('build', [
        'hr:app'
    ]);

    // Start server
    grunt.registerTask('start', [
        'http-server:dev'
    ]);

    grunt.registerTask('default', [
        'build',
        'start'
    ]);
};
